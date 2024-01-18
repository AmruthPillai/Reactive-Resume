import { AwardsDialog } from "../pages/builder/_components/dialogs/awards";
import { CertificationsDialog } from "../pages/builder/_components/dialogs/certifications";
import { CustomSectionDialog } from "../pages/builder/_components/dialogs/custom-section";
import { EducationDialog } from "../pages/builder/_components/dialogs/education";
import { ExperienceDialog } from "../pages/builder/_components/dialogs/experience";
import { InterestsDialog } from "../pages/builder/_components/dialogs/interests";
import { LanguagesDialog } from "../pages/builder/_components/dialogs/languages";
import { ProfilesDialog } from "../pages/builder/_components/dialogs/profiles";
import { ProjectsDialog } from "../pages/builder/_components/dialogs/projects";
import { PublicationsDialog } from "../pages/builder/_components/dialogs/publications";
import { ReferencesDialog } from "../pages/builder/_components/dialogs/references";
import { SkillsDialog } from "../pages/builder/_components/dialogs/skills";
import { VolunteerDialog } from "../pages/builder/_components/dialogs/volunteer";
import { ImportDialog } from "../pages/dashboard/resumes/_dialogs/import";
import { LockDialog } from "../pages/dashboard/resumes/_dialogs/lock";
import { ResumeDialog } from "../pages/dashboard/resumes/_dialogs/resume";
import { TwoFactorDialog } from "../pages/dashboard/settings/_dialogs/two-factor";
import { useResumeStore } from "../stores/resume";

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
