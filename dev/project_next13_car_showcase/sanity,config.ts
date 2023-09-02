import schemas from "@sanity/schemas";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export const config = defineConfig({
  projectId: "2vylmok6",
  dataset: "production",
  title: "Fadhyl store Admin",
  apiVersion: "2023-03-04",
  basePath: "/admin",
  plugins: [deskTool()],
  schema: { types: schemas },
});
