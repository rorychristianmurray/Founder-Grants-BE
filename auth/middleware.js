const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://founder-grants.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  // Audience is actually just a bananna term, used to identify the request in Auth0.
  // This can be changed in the Auth0 dashboard.
  audience: "http://localhost:5000/api/admin",
  issuer: `https://founder-grants.auth0.com/`,
  algorithms: ["RS256"]
});

module.exports = checkJwt;
