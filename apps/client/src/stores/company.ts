import type { CompanyDto } from "@reactive-resume/dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CompaniesState = {
  companies: CompanyDto[] | null;
};

type CompaniesActions = {
  setCompanies: (companies: CompanyDto[] | null) => void;
};

export const useCompanyStore = create<CompaniesState & CompaniesActions>()(
  persist(
    (set) => ({
      companies: null,
      setCompanies: (companies) => {
        set({ companies });
      },
    }),
    { name: "companies" },
  ),
);
