import { t } from "@lingui/macro";
import { Avatar, AvatarFallback, AvatarImage, Tooltip } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import { useMemo } from "react";

import { useContributors } from "@/client/services/resume/contributors";

export const ContributorsSection = () => {
  const { github, crowdin, loading } = useContributors();

  const contributors = useMemo(() => {
    if (github && crowdin) return [...github, ...crowdin];
    return [];
  }, [github, crowdin]);

  return (
    <section id="contributors" className="container relative space-y-12 py-24 sm:py-32">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold">{t`By the community, for the community.`}</h1>
        <p className="mx-auto max-w-3xl leading-loose">
          {t`Reactive Resume thrives thanks to its vibrant community. This project owes its progress to numerous individuals who've dedicated their time and skills. Below, we celebrate the coders who've enhanced its features on GitHub and the linguists whose translations on Crowdin have made it accessible to a broader audience.`}
        </p>
      </div>

      {loading && (
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
          {Array.from({ length: 40 })
            .fill(0)
            .map((_, index) => (
              <motion.div
                key={index}
                viewport={{ once: true }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1, transition: { delay: index * 0.05 } }}
              >
                <Avatar>
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </motion.div>
            ))}
        </div>
      )}

      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
        {contributors.map((contributor, index) => (
          <motion.div
            key={index}
            viewport={{ once: true }}
            initial={{ opacity: 0, scale: 0 }}
            className={cn(index >= 30 && "hidden lg:block")}
            whileInView={{ opacity: 1, scale: 1, transition: { delay: index * 0.025 } }}
          >
            <a href={contributor.url} target="_blank" rel="noreferrer">
              <Tooltip content={contributor.name}>
                <Avatar>
                  <AvatarImage src={contributor.avatar} alt={contributor.name} />
                  <AvatarFallback>{contributor.name}</AvatarFallback>
                </Avatar>
              </Tooltip>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
