import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

export const dayjsLocales: Record<string, () => Promise<ILocale>> = {
  "af-ZA": () => import("dayjs/locale/af"),
  "am-ET": () => import("dayjs/locale/am"),
  "ar-SA": () => import("dayjs/locale/ar-sa"),
  "bg-BG": () => import("dayjs/locale/bg"),
  "bn-BD": () => import("dayjs/locale/bn"),
  "ca-ES": () => import("dayjs/locale/ca"),
  "cs-CZ": () => import("dayjs/locale/cs"),
  "da-DK": () => import("dayjs/locale/da"),
  "de-DE": () => import("dayjs/locale/de"),
  "el-GR": () => import("dayjs/locale/el"),
  "en-US": () => import("dayjs/locale/en"),
  "es-ES": () => import("dayjs/locale/es"),
  "fa-IR": () => import("dayjs/locale/fa"),
  "fi-FI": () => import("dayjs/locale/fi"),
  "fr-FR": () => import("dayjs/locale/fr"),
  "he-IL": () => import("dayjs/locale/he"),
  "hi-IN": () => import("dayjs/locale/hi"),
  "hu-HU": () => import("dayjs/locale/hu"),
  "id-ID": () => import("dayjs/locale/id"),
  "it-IT": () => import("dayjs/locale/it"),
  "ja-JP": () => import("dayjs/locale/ja"),
  "km-KH": () => import("dayjs/locale/km"),
  "kn-IN": () => import("dayjs/locale/kn"),
  "ko-KR": () => import("dayjs/locale/ko"),
  "lt-LT": () => import("dayjs/locale/lt"),
  "ml-IN": () => import("dayjs/locale/ml"),
  "mr-IN": () => import("dayjs/locale/mr"),
  "ne-NP": () => import("dayjs/locale/ne"),
  "nl-NL": () => import("dayjs/locale/nl"),
  "no-NO": () => import("dayjs/locale/en"),
  "or-IN": () => import("dayjs/locale/en"),
  "pl-PL": () => import("dayjs/locale/pl"),
  "pt-BR": () => import("dayjs/locale/pt-br"),
  "pt-PT": () => import("dayjs/locale/pt"),
  "ro-RO": () => import("dayjs/locale/ro"),
  "ru-RU": () => import("dayjs/locale/ru"),
  "sr-SP": () => import("dayjs/locale/sr"),
  "sv-SE": () => import("dayjs/locale/sv"),
  "ta-IN": () => import("dayjs/locale/ta"),
  "te-IN": () => import("dayjs/locale/te"),
  "th-TH": () => import("dayjs/locale/th"),
  "tr-TR": () => import("dayjs/locale/tr"),
  "uk-UA": () => import("dayjs/locale/uk"),
  "vi-VN": () => import("dayjs/locale/vi"),
  "zh-CN": () => import("dayjs/locale/zh-cn"),
  "zh-TW": () => import("dayjs/locale/zh-tw"),
};
