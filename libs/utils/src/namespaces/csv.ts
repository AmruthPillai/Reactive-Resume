import Papa from "papaparse";

import { Json } from "./types";

export const parseCSV = async (string: string) => {
  return new Promise<Json[]>((resolve, reject) => {
    Papa.parse(string, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data as Json[]),
      error: (error: Error) => reject(error),
    });
  });
};

/**
 * Parser for cases when we receive an array like structure f.e. a in the LinkedIn Profile.csv import
 * @param csvEntry array-like entry such as [TAG:https://some.link,TAG:https://someother.link]
 * @returns
 */
export const parseArrayLikeCSVEntry = (csvEntry: string) =>
  csvEntry.replace(/^\[/, "").replace(/$\]/, "").split(",");
