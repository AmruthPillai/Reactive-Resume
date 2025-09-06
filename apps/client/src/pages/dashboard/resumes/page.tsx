import { t } from "@lingui/macro";
import { List, SquaresFour } from "@phosphor-icons/react";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { GridView } from "./_layouts/grid";
import { ListView } from "./_layouts/list";

enum Layout {
  Grid = "grid",
  List = "list",
}

const VALID_LAYOUT_VALUES = Object.values(Layout);

const LOCAL_STORAGE_LAYOUT_KEY = "layout";

export const ResumesPage = () => {
  const [layout, setLayout] = useState<Layout>(Layout.Grid);

  useEffect(() => {
    try {
      const storedLayout = localStorage.getItem(LOCAL_STORAGE_LAYOUT_KEY);
      if (storedLayout && VALID_LAYOUT_VALUES.includes(storedLayout as Layout)) {
        setLayout(storedLayout as Layout);
      }
    } catch {
      return;
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {t`Resumes`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <Tabs
        value={layout}
        className="space-y-4"
        onValueChange={(value) => {
          setLayout(value as Layout);
          try {
            localStorage.setItem(LOCAL_STORAGE_LAYOUT_KEY, value);
          } catch {
            return;
          }
        }}
      >
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {t`Resumes`}
          </motion.h1>

          <TabsList>
            <TabsTrigger value={Layout.Grid} className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <SquaresFour />
              <span className="ml-2 hidden sm:block">{t`Grid`}</span>
            </TabsTrigger>
            <TabsTrigger value={Layout.List} className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <List />
              <span className="ml-2 hidden sm:block">{t`List`}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea
          allowOverflow
          className="h-[calc(100vh-140px)] overflow-visible lg:h-[calc(100vh-88px)]"
        >
          <TabsContent value={Layout.Grid}>
            <GridView />
          </TabsContent>
          <TabsContent value={Layout.List}>
            <ListView />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </>
  );
};
