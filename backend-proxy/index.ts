import cors from "cors";
import express, { RequestHandler } from "express";
import dotenv from "dotenv";
import { Options, createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
const port = process.env.PROXY_PORT || 4001;

if (process.env.NODE_ENV === "production") {
  if (!process.env.MAIN_API_URL) {
    throw new Error("MAIN_API_URL environment variable is required in production");
  }
}
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is required to run the proxy server");
}
const mainApiUrl = process.env.MAIN_API_URL || "http://localhost:4000";

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

// Proxy configuration
const proxyOptions: Options = {
  target: mainApiUrl, // URL of your main API
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    // Add the API key to the proxied request
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API key not found in environment variables");
    }
    proxyReq.setHeader("x-api-token", apiKey);
    // console.log("proxying req: proxyReq", proxyReq);
  },
};

const blockBrowserClients: RequestHandler = (req, res, next) => {
  const origin = req.get("Origin");

  if (origin) {
    // If an Origin header is present, reject the request
    return res.status(403).send("Access denied for browser clients");
  }

  // Proceed with the next middleware if no Origin header is present
  next();
};

app.use(blockBrowserClients);
app.use("/", createProxyMiddleware(proxyOptions));

app.listen(port, () => {
  console.info(`Proxy server listening on port ${port}`);
});
