import { t } from "@lingui/macro";
import { Aperture, UploadSimple } from "@phosphor-icons/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  buttonVariants,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@reactive-resume/ui";
import { cn, getInitials } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { z } from "zod";

import { useUploadImage } from "@/client/services/storage";
import { useResumeStore } from "@/client/stores/resume";

import { PictureOptions } from "./options";

export const PictureSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, loading } = useUploadImage();

  const setValue = useResumeStore((state) => state.setValue);
  const name = useResumeStore((state) => state.resume.data.basics.name);
  const picture = useResumeStore((state) => state.resume.data.basics.picture);

  const isValidUrl = useMemo(() => z.string().url().safeParse(picture.url).success, [picture.url]);

  const onSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const response = await uploadImage(file);
      const url = response.data;

      setValue("basics.picture.url", url);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <Avatar className="h-14 w-14">
        {isValidUrl && <AvatarImage src={picture.url} />}
        <AvatarFallback className="text-lg font-bold">{getInitials(name)}</AvatarFallback>
      </Avatar>

      <div className="flex w-full flex-col gap-y-1.5">
        <Label htmlFor="basics.picture.url">{t`Picture`}</Label>
        <div className="flex items-center gap-x-2">
          <Input
            id="basics.picture.url"
            placeholder="https://..."
            value={picture.url}
            onChange={(event) => setValue("basics.picture.url", event.target.value)}
          />

          <AnimatePresence>
            {/* Show options button if picture exists */}
            {isValidUrl && (
              <Popover>
                <PopoverTrigger asChild>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
                  >
                    <Aperture />
                  </motion.button>
                </PopoverTrigger>
                <PopoverContent className="w-[360px]">
                  <PictureOptions />
                </PopoverContent>
              </Popover>
            )}

            {/* Show upload button if picture doesn't exist, else show remove button to delete picture */}
            {!isValidUrl && (
              <>
                <input hidden type="file" ref={inputRef} onChange={onSelectImage} />

                <motion.button
                  disabled={loading}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => inputRef.current?.click()}
                  className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
                >
                  <UploadSimple />
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
