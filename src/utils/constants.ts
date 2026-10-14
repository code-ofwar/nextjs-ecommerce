const PRODACTION_DOMAIN =
  "https://nextjs-ecommerce-6zkrvis2d-code-ofwar.vercel.app";
const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODACTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
