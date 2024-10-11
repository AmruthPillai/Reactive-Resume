import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { defaultProfile, profileSchema } from "@reactive-resume/schema";
import {
  Avatar,
  AvatarImage,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import { z } from "zod";
import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = profileSchema;

type FormValues = z.infer<typeof formSchema>;

export const ProfilesDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultProfile,
    resolver: zodResolver(formSchema),
  });

  const [iconSrc, setIconSrc] = useDebounceValue("", 400);
  const [searchText, setSearchText] = useDebounceValue("", 300);
  const [iconList, setIconList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchIcons() {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json",
        );
        const socialMediaKeywords = [
          "facebook",
          "x",
          "instagram",
          "linkedin",
          "youtube",
          "snapchat",
          "tiktok",
          "pinterest",
          "whatsapp",
          "discord",
          "reddit",
          "tumblr",
          "telegram",
          "twitch",
          "weibo",
          "flickr",
          "vimeo",
          "tiktok",
          "quora",
          "foursquare",
          "mixcloud",
          "behance",
          "dribbble",
          "soundcloud",
        ];

        const socialMediaIcons = response.data.icons
          .filter((icon: any) => socialMediaKeywords.includes(icon.title.toLowerCase()))
          .map((icon: any) => icon.title);

        setIconList(socialMediaIcons);
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    }
    fetchIcons();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filteredData = iconList.filter((icon: string) =>
        icon.toLowerCase().startsWith(searchText.toLowerCase()),
      );
      setSuggestions(filteredData);
    } else {
      setSuggestions(iconList);
    }
  }, [searchText]);

  const handleIconChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setIconSrc("");
      setSearchText("");
    } else {
      setSearchText(event.target.value);
      setIconSrc(`https://cdn.simpleicons.org/${event.target.value}`);
    }
  }, []);

  const handleSuggestionClick = (icon: string) => {
    setIconSrc(`https://cdn.simpleicons.org/${icon}`);
    form.setValue("icon", icon);
    setSearchText("$");
  };

  return (
    <SectionDialog<FormValues> id="profiles" form={form} defaultValues={defaultProfile}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="network"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Network`}</FormLabel>
              <FormControl>
                {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                <Input {...field} placeholder="LinkedIn" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Username`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="john.doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Website`}</FormLabel>
              <FormControl>
                <URLInput {...field} placeholder="https://linkedin.com/in/johndoe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="icon"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel htmlFor="iconSlug">{t`Icon`}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-x-2">
                  <Avatar className="size-8 bg-white">
                    {iconSrc && <AvatarImage className="p-1.5" src={iconSrc} />}
                  </Avatar>
                  <Input
                    {...field}
                    id="iconSlug"
                    placeholder="linkedin"
                    onChange={(event) => {
                      field.onChange(event);
                      handleIconChange(event);
                    }}
                  />
                </div>
              </FormControl>
              <div className="pl-10">
                {suggestions.length > 0 && (
                  <ul className="border py-2 px-2 border-gray-300 max-h-40 overflow-y-scroll ">
                    {suggestions.map((icon) => (
                      <li
                        className="p-1 cursor-pointer hover:bg-gray-200"
                        key={icon}
                        onClick={() => handleSuggestionClick(icon)}
                      >
                        {icon}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <FormMessage />
              <FormDescription className="ml-10">
                <Trans>
                  Powered by{" "}
                  <a
                    href="https://simpleicons.org/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-medium"
                  >
                    Simple Icons
                  </a>
                </Trans>
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
