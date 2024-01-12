import { Template, Templates } from "@reactive-resume/utils";

import { Azurill } from "./azurill";
import { Bronzor } from "./bronzor";
import { Chikorita } from "./chikorita";
import { Ditto } from "./ditto";
import { Gengar } from "./gengar";
import { Glalie } from "./glalie";
import { Kakuna } from "./kakuna";
import { Leafish } from "./leafish";
import { Nosepass } from "./nosepass";
import { Onyx } from "./onyx";
import { Pikachu } from "./pikachu";
import { Rhyhorn } from "./rhyhorn";

export const getTemplate = (template: Template) => {
  switch (template) {
    case Templates.AZURILL:
      return Azurill;
    case Templates.BRONZOR:
      return Bronzor;
    case Templates.CHIKORITA:
      return Chikorita;
    case Templates.DITTO:
      return Ditto;
    case Templates.GENGAR:
      return Gengar;
    case Templates.GLALIE:
      return Glalie;
    case Templates.KAKUNA:
      return Kakuna;
    case Templates.LEAFISH:
      return Leafish;
    case Templates.NOSEPASS:
      return Nosepass;
    case Templates.ONYX:
      return Onyx;
    case Templates.PIKACHU:
      return Pikachu;
    case Templates.RHYHORN:
      return Rhyhorn;
    default:
      return Onyx;
  }
};
