import { createClient } from "next-sanity";

const client = {
  projectId: "2vylmok6",
  dataset: "production",
  apiVersion: "2023-09-03",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_TOKEN,
  ignoreBrowserTokenWarning: true,
};
const configC = createClient(client);
export default configC;
