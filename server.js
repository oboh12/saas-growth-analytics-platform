// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === AUTH0 CONFIG ===
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

// === TEST ROUTE ===
app.get("/api/public", (req, res) => {
  res.json({ message: "Public endpoint: no login needed ✅" });
});

app.get("/api/private", checkJwt, (req, res) => {
  res.json({
    message: "Private endpoint: user authenticated with Auth0 🔐",
    user: req.auth,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));