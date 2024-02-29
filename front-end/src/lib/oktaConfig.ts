export const oktaConfig = {
  clientId: "0oab3d9qrq3lYMDRo5d7",
  issuer: "https://dev-47341539.okta.com/oauth2/default",
  redirectUri: "http://localhost:5173/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
