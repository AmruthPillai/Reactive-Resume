import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";

import { LayoutLocator, SortablePayload } from "./types";

export const getInitials = (name: string) => {
  const regex = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
  const initials = [...name.matchAll(regex)] || [];

  return ((initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")).toUpperCase();
};

export const isUrl = (string: string | null | undefined) => {
  if (!string) return false;

  const urlRegex = /https?:\/\/[^ \n]+/i;

  return urlRegex.test(string);
};

export const isEmptyString = (string: string) => {
  if (string === "<p></p>") return true;
  return string.trim().length === 0;
};

export const extractUrl = (string: string) => {
  const urlRegex = /https?:\/\/[^ \n]+/i;

  const result = string.match(urlRegex);
  return result ? result[0] : null;
};

export const kebabCase = (string?: string | null) => {
  if (!string) return "";

  return (
    string
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.join("-")
      .toLowerCase() ?? ""
  );
};

export const generateRandomName = () => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, adjectives, animals],
    style: "capital",
    separator: " ",
    length: 3,
  });
};

export const processUsername = (string?: string | null) => {
  if (!string) return "";

  return string.replace(/[^a-zA-Z0-9-.]/g, "").toLowerCase();
};

export const parseLayoutLocator = (payload: SortablePayload | null): LayoutLocator => {
  if (!payload) return { page: 0, column: 0, section: 0 };

  const section = payload.index as number;
  const [page, column] = payload.containerId.split(".").map(Number);

  return { page, column, section };
};
