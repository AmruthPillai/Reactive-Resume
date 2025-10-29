/* eslint-disable lingui/no-unlocalized-strings */
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import type { EmploymentTypeEnum, WorkTypeEnum } from "@reactive-resume/schema";

export const useWorkTypeLabels = (): Record<WorkTypeEnum, string> => {
  const { _ } = useLingui();

  return {
    "On-Site": _(msg`On-Site`),
    Remote: _(msg`Remote`),
    Hybrid: _(msg`Hybrid`),
    none: _(msg`Not specified`),
    other: _(msg`Other`),
  };
};

export const useEmploymentTypeLabels = (): Record<EmploymentTypeEnum, string> => {
  const { _ } = useLingui();

  return {
    "Full-Time": _(msg`Full-Time`),
    "Part-Time": _(msg`Part-Time`),
    Internship: _(msg`Internship`),
    Contract: _(msg`Contract`),
    Freelance: _(msg`Freelance`),
    Temporary: _(msg`Temporary`),
    Volunteer: _(msg`Volunteer`),
    none: _(msg`Not specified`),
    other: _(msg`Other`),
  };
};
