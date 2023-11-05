import { List, SquaresFour } from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { GridView } from "./_layouts/grid";
import { ListView } from "./_layouts/list";

type Layout = "grid" | "list";

export const ResumesPage = () => {
  const [layout, setLayout] = useState<Layout>("grid");

  return (
    <>
      <Helmet>
        <title>Resumes - Reactive Resume</title>
      </Helmet>

      <Tabs value={layout} onValueChange={(value) => setLayout(value as Layout)}>
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            Resumes
          </motion.h1>

          <TabsList>
            <TabsTrigger value="grid" className="h-8 w-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <SquaresFour />
              <span className="ml-2 hidden sm:block">Grid</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="h-8 w-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <List />
              <span className="ml-2 hidden sm:block">List</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-12 md:mt-8">
          <TabsContent value="grid">
            <GridView />
          </TabsContent>
          <TabsContent value="list">
            <ListView />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};
