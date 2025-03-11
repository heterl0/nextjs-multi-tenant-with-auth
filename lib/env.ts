export const isProduction = process.env.NODE_ENV === "production";
export const domain = isProduction
  ? process.env.PROD_HOSTNAME || "heterl0.live"
  : "localhost:3000";
