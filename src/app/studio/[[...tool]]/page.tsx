/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path are handled by this file using Next.js' catch-all routes.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const metadata = {
    title: "Sanity Studio",
    description: "Content management studio for PrivateTools",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#000000",
};

export default function StudioPage() {
    return <NextStudio config={config} />;
}
