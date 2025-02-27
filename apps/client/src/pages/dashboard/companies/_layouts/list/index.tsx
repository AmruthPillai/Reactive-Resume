import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { CompanyListItem } from "@/client/pages/dashboard/companies/_layouts/list/_components/company-item";
import { CreateCompanyListItem } from "@/client/pages/dashboard/companies/_layouts/list/_components/create-item";
import { BaseListItem } from "@/client/pages/dashboard/resumes/_layouts/list/_components/base-item";
import { useCompanies } from "@/client/services/company/company";

export const CompanyListView = () => {
  const { companies, loading } = useCompanies();

  return (
    <div className="grid gap-y-2">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
        <CreateCompanyListItem />
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

      {companies && (
        <AnimatePresence>
          {companies
            .sort((a, b) => sortByDate(a, b, "updatedAt"))
            .map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <CompanyListItem company={company} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
