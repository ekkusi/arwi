import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { schemaTypes } from "./schemas";
import { structure } from "./deskStructure";
import { LayoutWithGraphQLClient } from "./graphqlClient";
import { createAsyncSubjectPublishAction } from "./actions/subject";

export default defineConfig({
  name: "default",
  title: "Arwi CMS",

  projectId: "c0mo1woj",
  dataset: "production",

  plugins: [
    deskTool({
      structure,
    }),
    visionTool(),
    colorInput(),
  ],
  document: {
    actions: (prev, context) => {
      return context.schemaType === "subject"
        ? prev.map((originalAction) => (originalAction.action === "publish" ? createAsyncSubjectPublishAction(originalAction) : originalAction))
        : prev;
    },
  },
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      layout: LayoutWithGraphQLClient,
    },
  },
});
