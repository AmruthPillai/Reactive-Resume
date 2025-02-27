import { AwardsDialog } from "../pages/builder/sidebars/left/dialogs/awards";
import { CertificationsDialog } from "../pages/builder/sidebars/left/dialogs/certifications";
import { CustomSectionDialog } from "../pages/builder/sidebars/left/dialogs/custom-section";
import { EducationDialog } from "../pages/builder/sidebars/left/dialogs/education";
import { ExperienceDialog } from "../pages/builder/sidebars/left/dialogs/experience";
import { InterestsDialog } from "../pages/builder/sidebars/left/dialogs/interests";
import { LanguagesDialog } from "../pages/builder/sidebars/left/dialogs/languages";
import { ProfilesDialog } from "../pages/builder/sidebars/left/dialogs/profiles";
import { ProjectsDialog } from "../pages/builder/sidebars/left/dialogs/projects";
import { PublicationsDialog } from "../pages/builder/sidebars/left/dialogs/publications";
import { ReferencesDialog } from "../pages/builder/sidebars/left/dialogs/references";
import { SkillsDialog } from "../pages/builder/sidebars/left/dialogs/skills";
import { VolunteerDialog } from "../pages/builder/sidebars/left/dialogs/volunteer";
import { ImportDialog } from "../pages/dashboard/resumes/_dialogs/import";
import { LockDialog } from "../pages/dashboard/resumes/_dialogs/lock";
import { ResumeDialog } from "../pages/dashboard/resumes/_dialogs/resume";
import { TwoFactorDialog } from "../pages/dashboard/settings/_dialogs/two-factor";
import { useResumeStore } from "../stores/resume";
import { CompanyDialog } from "@/client/pages/dashboard/companies/_dialogs/company";

type Props = {
  children: React.ReactNode;
};

export const DialogProvider = ({ children }: Props) => {
  const isResumeLoaded = useResumeStore((state) => Object.keys(state.resume).length > 0);

  return (
    <>
      {children}

      <div id="dialog-root">
        <ResumeDialog />
        <CompanyDialog />
        <LockDialog />
        <ImportDialog />
        <TwoFactorDialog />

        {isResumeLoaded && (
          <>
            <ProfilesDialog />
            <ExperienceDialog />
            <EducationDialog />
            <AwardsDialog />
            <CertificationsDialog />
            <InterestsDialog />
            <LanguagesDialog />
            <ProjectsDialog />
            <PublicationsDialog />
            <VolunteerDialog />
            <SkillsDialog />
            <ReferencesDialog />
            <CustomSectionDialog />
          </>
        )}
      </div>
    </>
  );
};
