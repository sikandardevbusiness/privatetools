/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import path from "path";
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
    api: { projectId, dataset },
    vite: {
        resolve: {
            alias: {
                // This maps the "@" prefix directly to your local src directory for the Sanity compiler compiler engine
                "@": path.resolve(__dirname, "./src"),
            },
        },
    },
});
