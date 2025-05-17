import { Hono } from "hono";
import { serve } from "@hono/node-server";

// Initialize Hono app
const app = new Hono();

// Health check endpoint
app.get("/health", (c) => c.json({ status: "OK" }));

// Homepage route
app.get("/", (c) => {
  console.log("Homepage accessed");
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Code Club AGPIT</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; }
        h1 { font-size: 2.5rem; color: #2563eb; }
        a { color: #2563eb; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>Code Club AGPIT</h1>
      <h2>Backend API</h2>
      <p>
        <a href="https://codeclubagpit.vercel.app/" target="_blank">Visit Website</a> | 
        <a href="/api/test">Test API</a>
      </p>
    </body>
    </html>
  `);
});

// API Routes
const api = new Hono()
  .get("/test", (c) => c.json({ 
    message: "API is working", 
    timestamp: new Date().toISOString() 
  }))
  .post("/echo", async (c) => c.json({ 
    received: await c.req.json() 
  }));

// Mount API routes
app.route("/api", api);

// Error handling
app.onError((err, c) => {
  console.error("Error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

app.notFound((c) => {
  return c.json({ error: "Route not found" }, 404);
});

// Server configuration
const port = parseInt(process.env.PORT || "3000");
const server = serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`🚀 Server running on http://localhost:${info.port}`);
});

// Handle server errors
server.on("error", (err: NodeJS.ErrnoException) => {
  console.error("Server error:", err.message);
  if (err.code === "EADDRINUSE") {
    console.log(`⚠️  Port ${port} is already in use`);
  }
});

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n🔴 Server shutting down...");
  server.close();
  process.exit(0);
});