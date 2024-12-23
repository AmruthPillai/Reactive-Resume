import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { usePortfolios } from "@/client/services/portfolio";

import { BaseListItem } from "./_components/base-item";
import { CreatePortfolioListItem } from "./_components/create-item";
import { PortfolioListItem } from "./_components/portfolio-item";

export const ListView = () => {
  const { portfolios, loading } = usePortfolios();

  return (
    <div className="grid gap-y-2">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
        <CreatePortfolioListItem />
      </motion.div>

      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseListItem className="bg-secondary/40" />
          </div>
        ))}

      {portfolios && (
        <AnimatePresence>
          {portfolios
            .sort((a, b) => sortByDate(a, b, "updatedAt"))
            .map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: (index + 1) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <PortfolioListItem portfolio={portfolio} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
