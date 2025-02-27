import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { CompanyCard } from "@/client/pages/dashboard/companies/_layouts/grid/_components/company-card";
import { CreateCompanyCard } from "@/client/pages/dashboard/companies/_layouts/grid/_components/create-card";
import { BaseCard } from "@/client/pages/dashboard/resumes/_layouts/grid/_components/base-card";
import { useCompanies } from "@/client/services/company/company";

export const CompanyGridView = () => {
  const { companies, loading } = useCompanies();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <CreateCompanyCard />
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

      {companies && (
        <AnimatePresence>
          {companies
            .sort((a, b) => sortByDate(a, b, "updatedAt"))
            .map((company, index) => (
              <motion.div
                key={company.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <CompanyCard company={company} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
