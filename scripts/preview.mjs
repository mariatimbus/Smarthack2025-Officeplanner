import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT ?? 4173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith('/')) pathname += 'index.html';

  let filePath = path.join(distDir, pathname);
  let fileStat;

  try {
    fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      fileStat = await stat(filePath);
    }
  } catch {
    // SPA fallback
    filePath = path.join(distDir, 'index.html');
    try {
      fileStat = await stat(filePath);
    } catch (error) {
      res.writeHead(404);
      res.end('Run "npm run build" before previewing the app.');
      return;
    }
  }

  const ext = path.extname(filePath);
  const mime = mimeTypes[ext] ?? 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': mime,
    'Content-Length': fileStat.size
  });

  createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
});

const shutdown = () => {
  server.close(() => process.exit());
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
