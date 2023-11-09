import { TemplateKey } from "@reactive-resume/utils";

import { Azurill } from "./azurill";
import { Bronzor } from "./bronzor";
import { Chikorita } from "./chikorita";
import { Ditto } from "./ditto";
import { Kakuna } from "./kakuna";
import { Onyx } from "./onyx";
import { Pikachu } from "./pikachu";
import { Rhyhorn } from "./rhyhorn";

export const getTemplate = (template: TemplateKey) => {
  switch (template) {
    case "onyx":
      return Onyx;
    case "kakuna":
      return Kakuna;
    case "rhyhorn":
      return Rhyhorn;
    case "azurill":
      return Azurill;
    case "ditto":
      return Ditto;
    case "chikorita":
      return Chikorita;
    case "bronzor":
      return Bronzor;
    case "pikachu":
      return Pikachu;
    default:
      return Onyx;
  }
};
