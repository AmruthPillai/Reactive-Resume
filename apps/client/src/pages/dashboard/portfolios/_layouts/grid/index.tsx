import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolios } from "@/client/services/portfolio";
import { BaseCard } from "./_components/base-card";
import { CreatePortfolioCard } from "./_components/create-card";
import { PortfolioCard } from "./_components/portfolio-card";

export const GridView = () => {
  const { portfolios, loading } = usePortfolios();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <CreatePortfolioCard />
      </motion.div>

      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseCard />
          </div>
        ))}

      {portfolios && (
        <AnimatePresence>
          {portfolios
            .sort((a, b) => sortByDate(a, b, "updatedAt"))
            .map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 1) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <PortfolioCard portfolio={portfolio} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
