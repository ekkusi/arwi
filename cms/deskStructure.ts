import { StructureResolver } from "sanity/desk";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Arwi metadata")
    .items([...S.documentTypeListItems()]);
