export const isProduction = process.env.NODE_ENV === "production";
export const domain = isProduction
  ? process.env.PROD_HOSTNAME || "example.com"
  : "localhost:3000";
