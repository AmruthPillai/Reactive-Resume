import { t } from "@lingui/macro";
import {
  BuildingApartment,
  FadersHorizontal,
  GithubLogo,
  MagnifyingGlass,
  ReadCvLogo,
} from "@phosphor-icons/react";
import { Button, KeyboardShortcut, Separator } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import useKeyboardShortcut from "use-keyboard-shortcut";

import { Copyright } from "@/client/components/copyright";
import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useUser } from "@/client/services/user";
import { useAuthStore } from "@/client/stores/auth";

type Props = {
  className?: string;
};

const ActiveIndicator = ({ className }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn(
      "size-1.5 animate-pulse rounded-full bg-info shadow-[0_0_12px] shadow-info",
      className,
    )}
  />
);

type SidebarItem = {
  path: string;
  name: string;
  shortcut?: string;
  icon: React.ReactNode;
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({ path, name, shortcut, icon, onClick }: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;
  const { user } = useAuthStore();

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "h-auto justify-start px-4 py-3",
        isActive && "pointer-events-none bg-secondary/50 text-secondary-foreground",
      )}
      onClick={onClick}
    >
      <Link to={path}>
        <div className="mr-3">{icon}</div>
        <span>{name}</span>
        {!isActive && <KeyboardShortcut className="ml-auto">{shortcut}</KeyboardShortcut>}
        {isActive && <ActiveIndicator className="ml-auto" />}
      </Link>
    </Button>
  );
};

type SidebarProps = {
  setOpen?: (open: boolean) => void;
};

export const Sidebar = ({ setOpen }: SidebarProps) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useKeyboardShortcut(["shift", "p"], () => {
    // @ts-expect-error User possible undefined. We expect it isn't.
    void navigate("/publicprofile/" + user.username);
    setOpen?.(false);
  });

  useKeyboardShortcut(["shift", "r"], () => {
    void navigate("/dashboard/resumes");
    setOpen?.(false);
  });

  useKeyboardShortcut(["shift", "s"], () => {
    void navigate("/dashboard/settings");
    setOpen?.(false);
  });

  useKeyboardShortcut(["shift", "c"], () => {
    void navigate("/dashboard/companies");
    setOpen?.(false);
  });

  // Define all SideBar Items that are NOT needed to be seen when logged in here
  const commonSideBarItems: SidebarItem[] = [
    {
      path: "/dashboard/resumes",
      name: t`Resumes`,
      shortcut: "⇧R",
      icon: <ReadCvLogo size={20} />,
    },
    {
      path: "/dashboard/settings",
      name: t`Settings`,
      shortcut: "⇧S",
      icon: <FadersHorizontal size={20} />,
    },
    {
      path: "/dashboard/search",
      name: t`Search`,
      shortcut: "⇧F",
      icon: <MagnifyingGlass />,
    },
    {
      path: "/dashboard/companies",
      name: t`Companies`,
      shortcut: "⇧C",
      icon: <BuildingApartment />,
    },
  ];
  // Define all SideBar Items that ARE needed to be logged in to be seen here
  let userSideBarItems: SidebarItem[] = [];
  if (user !== undefined) {
    userSideBarItems = [
      {
        path: "/publicprofile/" + user.username,
        name: t`Profile Page`,
        shortcut: "⇧P",
        icon: <UserAvatar />,
      },
      ...commonSideBarItems,
    ];
  }

  return (
    <div className="flex h-full flex-col gap-y-4">
      <div className="ml-12 flex justify-center lg:ml-0">
        <Button asChild size="icon" variant="ghost" className="size-10 p-0">
          <Link to="/">
            <Icon size={24} className="mx-auto hidden lg:block" />
          </Link>
        </Button>
      </div>
      <Separator className="opacity-50" />
      <div className="grid gap-y-2">
        {(user === undefined ? commonSideBarItems : userSideBarItems).map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}
      </div>
      <div className="flex-1" />
      <Separator className="opacity-50" />
      <Button
        className="w-full justify-start px-3"
        variant="ghost"
        onClick={() => {
          const win = window.open(
            "https://github.com/The-Elite-Task-Force/EZ-CV/discussions",
            "_blank",
          );
          win?.focus();
        }}
      >
        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
        {<GithubLogo size={20} />} Bugs, Feedback and Discussions
      </Button>
      <Separator className="opacity-50" />
      <UserOptions>
        <Button size="lg" variant="ghost" className="w-full justify-start px-3">
          <UserAvatar size={24} className="mr-3" />
          <span>{user?.name}</span>
        </Button>
      </UserOptions>
      <Copyright className="ml-2" />
    </div>
  );
};
