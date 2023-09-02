import schemas from "@sanity/schemas";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export const config = defineConfig({
  projectId: "2vylmok6",
  dataset: "production",
  title: "Fadhyl store Admin",
  apiVersion: "2023-09-1",
  basePath: "/admin",
  plugins: [deskTool()],
  schema: { types: schemas },
});
