import { t } from "@lingui/macro";
import { List, SquaresFour } from "@phosphor-icons/react";
import { Input, ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { GridView } from "./_layouts/grid";
import { ListView } from "./_layouts/list";

type Layout = "grid" | "list";

export const JobsPage = () => {
  const [layout, setLayout] = useState<Layout>("grid");

  return (
    <>
      <Helmet>
        <title>
          {t`List Jobs`} - {t`Talent Hub`}
        </title>
      </Helmet>

      <Tabs
        value={layout}
        className="space-y-4"
        onValueChange={(value) => {
          setLayout(value as Layout);
        }}
      >
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {t`List Jobs`}
          </motion.h1>

          <TabsList>
            <TabsTrigger value="grid" className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <SquaresFour />
              <span className="ml-2 hidden sm:block">{t`Grid`}</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <List />
              <span className="ml-2 hidden sm:block">{t`List`}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <Input placeholder={t`Search for job`} className="w-3/5 rounded-xl" />

        <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
          <TabsContent value="grid">
            <GridView />
          </TabsContent>
          <TabsContent value="list">
            <ListView />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </>
  );
};
