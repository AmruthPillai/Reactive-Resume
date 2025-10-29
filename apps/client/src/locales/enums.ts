/* 
This file is all about creating helpful helper functions for translating employment and work type enums on the client side.

* The `t` macro from `@lingui/macro` is a special macro that needs to be evaluated when you’re working in the client-side React environment, like inside your components or functions that run in the browser. But when you use it on the server or in shared schema files, it doesn’t work as expected and can cause runtime errors like “(0, macro_1.t) is not a function.”
* To fix this, we’ve created these helper functions (`getWorkTypeLabels` and `getEmploymentTypeLabels`) in the client folder. They wrap the `t` calls inside functions that only run on the client, so translations are handled correctly when you’re using them.

* In short:
* - Server/shared code can’t safely call `t` because it gets stripped during the build.
* - Client-side functions can, which means you can get proper localisation and easily update the language.
*/

import { i18n } from "@lingui/core";
import type { EmploymentTypeEnum, WorkTypeEnum } from "@reactive-resume/schema";

export const getWorkTypeLabels = (): Record<WorkTypeEnum, string> => ({
  "On-Site": i18n._("On-Site"),
  Remote: i18n._("Remote"),
  Hybrid: i18n._("Hybrid"),
  none: i18n._("Not specified"),
  other: i18n._("Other"),
});

export const getEmploymentTypeLabels = (): Record<EmploymentTypeEnum, string> => ({
  "Full-Time": i18n._("Full-Time"),
  "Part-Time": i18n._("Part-Time"),
  Internship: i18n._("Internship"),
  Contract: i18n._("Contract"),
  Freelance: i18n._("Freelance"),
  Temporary: i18n._("Temporary"),
  Volunteer: i18n._("Volunteer"),
  none: i18n._("Not specified"),
  other: i18n._("Other"),
});
