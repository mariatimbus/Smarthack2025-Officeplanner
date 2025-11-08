// scripts/dev.mjs

import esbuild from "esbuild";
import { cp, mkdir } from "node:fs/promises";
import { watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");
const port = Number(process.env.PORT ?? 5173);

async function copyPublicAssets() {
  try {
    await mkdir(distDir, { recursive: true });
    await cp(publicDir, distDir, { recursive: true });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

function watchPublicAssets() {
  try {
    watch(publicDir, { persistent: true }, async () => {
      await copyPublicAssets();
      console.log("[public] assets synced");
    });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

// 1) Copy /public on start (safe even if folder is missing)
await copyPublicAssets();
watchPublicAssets();

// 2) Build + watch React app
const ctx = await esbuild.context({
  entryPoints: [path.join(rootDir, "src", "main.jsx")],
  bundle: true,
  outfile: path.join(rootDir, "bundle.js"), // bundle in project root
  sourcemap: true,
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".svg": "file",
  },
});

await ctx.watch();

// 3) Serve project root
const server = await ctx.serve({
  servedir: rootDir,
  host: "localhost",
  port,
});

console.log(
  `Dev server ready at http://${server.host ?? "localhost"}:${server.port}`
);

// 4) Graceful shutdown
const shutdown = async () => {
  await ctx.dispose();
  process.exit();zz
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
