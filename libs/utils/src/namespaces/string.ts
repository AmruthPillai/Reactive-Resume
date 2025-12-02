import sanitizeHtml from "sanitize-html";
import type { Config as UniqueNamesConfig } from "unique-names-generator";
import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";

import type { LayoutLocator, SortablePayload } from "./types";

/**
 * Extracts initials from a full name.
 * Takes the first letter of each word and returns them as uppercase.
 *
 * @param name - The full name to extract initials from
 * @returns The initials in uppercase (e.g., "John Doe" → "JD")
 *
 * @example
 * ```typescript
 * getInitials("John Doe"); // "JD"
 * getInitials("Mary Jane Smith"); // "MS"
 * getInitials("John"); // "J"
 * ```
 */
export const getInitials = (name: string) => {
  const regex = /(\p{L}{1})\p{L}+/gu;
  const initials = [...name.matchAll(regex)];

  return ((initials.shift()?.[1] ?? "") + (initials.pop()?.[1] ?? "")).toUpperCase();
};

/**
 * Checks if a string is a valid HTTP/HTTPS URL.
 *
 * @param string - The string to check
 * @returns True if the string is a valid URL, false otherwise
 *
 * @example
 * ```typescript
 * isUrl("https://example.com"); // true
 * isUrl("http://localhost:3000"); // true
 * isUrl("not a url"); // false
 * isUrl(null); // false
 * ```
 */
export const isUrl = (string: string | null | undefined) => {
  if (!string) return false;

  const urlRegex = /https?:\/\/[^\n ]+/i;

  return urlRegex.test(string);
};

export const isEmptyString = (string: string) => {
  if (string === "<p></p>") return true;
  return string.trim().length === 0;
};

export const extractUrl = (string: string) => {
  const urlRegex = /https?:\/\/[^\n ]+/i;

  const result = urlRegex.exec(string);
  return result ? result[0] : null;
};

export const generateRandomName = (options?: Omit<UniqueNamesConfig, "dictionaries">) => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, adjectives, animals],
    style: "capital",
    separator: " ",
    length: 3,
    ...options,
  });
};

export const processUsername = (string?: string | null) => {
  if (!string) return "";

  return string.replace(/[^\d.A-Za-z-]/g, "").toLowerCase();
};

export const parseLayoutLocator = (payload: SortablePayload | null): LayoutLocator => {
  if (!payload) return { page: 0, column: 0, section: 0 };

  const section = payload.index;
  const [page, column] = payload.containerId.split(".").map(Number);

  return { page, column, section };
};

export const sanitize = (html: string, options?: sanitizeHtml.IOptions) => {
  const allowedTags = (options?.allowedTags ?? []) as string[];

  return sanitizeHtml(html, {
    ...options,
    allowedTags: [
      ...allowedTags,
      "a",
      "abbr",
      "address",
      "article",
      "aside",
      "b",
      "bdi",
      "bdo",
      "blockquote",
      "br",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "dd",
      "dfn",
      "div",
      "dl",
      "dt",
      "em",
      "figcaption",
      "figure",
      "footer",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "i",
      "img",
      "kbd",
      "li",
      "main",
      "main",
      "mark",
      "nav",
      "ol",
      "p",
      "pre",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "section",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "time",
      "tr",
      "u",
      "ul",
      "var",
      "wbr",
    ],
    allowedAttributes: {
      ...options?.allowedAttributes,
      "*": ["class", "style"],
      a: ["href", "target"],
      img: ["src", "alt"],
    },
    allowedStyles: {
      ...options?.allowedStyles,
      "*": { "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/] },
    },
  });
};
