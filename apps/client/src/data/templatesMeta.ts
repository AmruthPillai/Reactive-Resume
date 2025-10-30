import { templatesList } from "@reactive-resume/utils";

const PREMIUM_SET = new Set([
  "twoColumn",
  "elegant",
  "ngosKenya",
  "pscKenya",
  "telcoPro",
  "bankingATS",
]);

export const TEMPLATE_META: Record<string, { premium: boolean; requiredCap: number }> =
  templatesList.reduce((acc, name, idx) => {
    const premium = PREMIUM_SET.has(name) || idx >= 3;
    acc[name] = { premium, requiredCap: premium ? 10 : Math.min(idx + 1, 3) };
    return acc;
  }, {} as Record<string, { premium: boolean; requiredCap: number }>);

