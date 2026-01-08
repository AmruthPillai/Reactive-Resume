import { t } from "@lingui/macro";
import { ListIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { Button, ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router";

import { useFolder } from "@/client/services/folder";

import { BaseCard } from "./_layouts/grid/_components/base-card";
import FolderResumesGridView from "./_layouts/grid/_components/folder-resumes";
import FolderResumesListView from "./_layouts/list/_components/folder-resumes";

type Layout = "grid" | "list";
export const FolderDetailsPage = () => {
  const [layout, setLayout] = useState<Layout>("grid");
  const { id } = useParams<{ id: string }>();

  const { folder, loading } = useFolder(id ?? "");

  if (loading) {
    return (
      <div className="flex items-center justify-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseCard />
          </div>
        ))}
      </div>
    );
  }

  if (!folder) {
    return (
      <>
        <Helmet>
          <title>{t`Folder Not Found`}</title>
        </Helmet>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-4 bg-background p-6 shadow-sm"
        >
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">{t`Folder not found`}</h1>
            <p className="text-muted-foreground text-sm">
              {t`The folder you're looking for doesn't exist or has been removed.`}
            </p>
          </div>

          <Button asChild className="inline-block pt-2">
            <Link to="/dashboard/folders">{t`Go to folders`}</Link>
          </Button>
        </motion.div>
      </>
    );
  }

  const name = folder.name;

  return (
    <>
      <Helmet>
        <title>
          {t`Folder`} - {name}
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
            {t`Folder:`} {name}
          </motion.h1>

          <TabsList>
            <TabsTrigger value="grid" className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <SquaresFourIcon />
              <span className="ml-2 hidden sm:block">{t`Grid`}</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <ListIcon />
              <span className="ml-2 hidden sm:block">{t`List`}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea
          allowOverflow
          className="h-[calc(100vh-140px)] overflow-visible lg:h-[calc(100vh-88px)]"
        >
          <TabsContent value="grid">
            <FolderResumesGridView folder={folder} />
          </TabsContent>
          <TabsContent value="list">
            <FolderResumesListView folder={folder} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </>
  );
};
