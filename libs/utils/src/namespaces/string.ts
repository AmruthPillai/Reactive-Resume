import sanitizeHtml from "sanitize-html";
import type { Config as UniqueNamesConfig } from "unique-names-generator";
import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";

import type { LayoutLocator, SortablePayload } from "./types";

export const getInitials = (name: string) => {
  // eslint-disable-next-line unicorn/better-regex
  const regex = new RegExp(/(\p{L}{1})\p{L}+/gu);
  const initials = [...name.matchAll(regex)];

  return ((initials.shift()?.[1] ?? "") + (initials.pop()?.[1] ?? "")).toUpperCase();
};

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
  return sanitizeHtml(html, {
    ...options,
    allowedAttributes: {
      ...options?.allowedAttributes,
      "*": ["class", "style"],
    },
    allowedStyles: {
      ...options?.allowedStyles,
      "*": { "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/] },
    },
  });
};
