import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        // APP META CONFIGURATIONS
        NEXT_PUBLIC_SITE_URL: z.url(),
        NEXT_PUBLIC_SITE_TITLE: z.string().min(1),
        NEXT_PUBLIC_AUTHOR_NAME: z.string().min(1),
        NEXT_PUBLIC_SITE_DESCRIPTION: z.string().min(1),

        // CONTACT DETAILS
        NEXT_PUBLIC_CONTACT_EMAIL: z.email(),

        // VERIFICATION CODES
        NEXT_PUBLIC_GA_ID: z.string().min(1),
        NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE: z.string().min(1),

        // Sanity
        NEXT_PUBLIC_SANITY_NAME: z.string().min(1),
        NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
        NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),

        // DONATION PLATFORM COMPLETE URL VALIDATION
        NEXT_PUBLIC_KOFI_URL: z.url(),
        NEXT_PUBLIC_PATREON_URL: z.url(),
        NEXT_PUBLIC_BUYMEACOFFEE_URL: z.url(),
        NEXT_PUBLIC_PAYPAL_DONATE_URL: z.url(),
        NEXT_PUBLIC_OPENCOLLECTIVE_URL: z.url(),
        NEXT_PUBLIC_GITHUB_SPONSORS_URL: z.url(),
    },
    server: {
        SANITY_API_TOKEN: z.string().min(1),

        // --- FOR SANITY STUDIO (Vite requires this prefix) ---
        SANITY_STUDIO_NAME: z.string().min(1),
        SANITY_STUDIO_DATASET: z.string().min(1),
        SANITY_STUDIO_PROJECT_ID: z.string().min(1),
    },
    runtimeEnv: {
        // APP META CONFIGURATIONS
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
        NEXT_PUBLIC_AUTHOR_NAME: process.env.NEXT_PUBLIC_AUTHOR_NAME,
        NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,

        // CONTACT DETAILS
        NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,

        // VERIFICATION CODES
        NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
        NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE,

        // DONATION PLATFORM COMPLETE URL TARGETS
        NEXT_PUBLIC_KOFI_URL: process.env.NEXT_PUBLIC_KOFI_URL,
        NEXT_PUBLIC_PATREON_URL: process.env.NEXT_PUBLIC_PATREON_URL,
        NEXT_PUBLIC_BUYMEACOFFEE_URL: process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL,
        NEXT_PUBLIC_PAYPAL_DONATE_URL: process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL,
        NEXT_PUBLIC_OPENCOLLECTIVE_URL: process.env.NEXT_PUBLIC_OPENCOLLECTIVE_URL,
        NEXT_PUBLIC_GITHUB_SPONSORS_URL: process.env.NEXT_PUBLIC_GITHUB_SPONSORS_URL,

        // Sanity (Client)
        NEXT_PUBLIC_SANITY_NAME: process.env.NEXT_PUBLIC_SANITY_NAME,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

        // Sanity (Server) - THESE WERE MISSING!
        SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
        SANITY_STUDIO_NAME: process.env.SANITY_STUDIO_NAME,
        SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
        SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    },

    // Optional but recommended: skip validation during build if env vars aren't available yet
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
