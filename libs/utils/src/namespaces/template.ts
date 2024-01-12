export enum Templates {
  AZURILL = "azurill",
  BRONZOR = "bronzor",
  CHIKORITA = "chikorita",
  DITTO = "ditto",
  GENGAR = "gengar",
  GLALIE = "glalie",
  KAKUNA = "kakuna",
  LEAFISH = "leafish",
  NOSEPASS = "nosepass",
  ONYX = "onyx",
  PIKACHU = "pikachu",
  RHYHORN = "rhyhorn",
}

export const templatesList = [
  Templates.AZURILL,
  Templates.BRONZOR,
  Templates.CHIKORITA,
  Templates.DITTO,
  Templates.GENGAR,
  Templates.GLALIE,
  Templates.KAKUNA,
  Templates.LEAFISH,
  Templates.NOSEPASS,
  Templates.ONYX,
  Templates.PIKACHU,
  Templates.RHYHORN,
] as const;

export type Template = (typeof templatesList)[number];
