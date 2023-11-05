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
