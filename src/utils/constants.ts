const PRODACTION_DOMAIN = "";
const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODACTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
