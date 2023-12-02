import { ScrollArea } from "@reactive-resume/ui";
import { Outlet } from "react-router-dom";

import { Header } from "./components/header";

export const PageLayout = () => (
  <ScrollArea orientation="vertical" className="h-screen">
    <Header />
    <Outlet />
  </ScrollArea>
);
