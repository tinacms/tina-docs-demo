import { defineConfig } from "tinacms";
import { MockAuthProvider } from "./mock-auth-provider";
import { schema } from "./schema";

// Get the base URL for the API endpoint
const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: use window.location
    return `${window.location.origin}/api/gql`;
  }
  // Server-side: use environment variable or default to localhost
  return process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/gql`
    : "http://localhost:3000/api/gql";
};

export const config = defineConfig({
  contentApiUrlOverride: getApiUrl(),
  schema,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  authProvider: new MockAuthProvider(),
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "",
    },
    accept: ["image/*", "video/*", "application/json", ".json"],
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
});

export default config;
