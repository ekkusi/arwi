import { createClient } from "@sanity/client";

const { SANITY_PROJECT_ID } = process.env;

if (!SANITY_PROJECT_ID) {
  throw new Error("Missing SANITY_PROJECT_ID environment variable");
}

const client = createClient({
  projectId: "c0mo1woj",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-02-15",
});

export default client;
