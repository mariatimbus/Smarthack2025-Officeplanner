import esbuild from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

const isProd = (process.env.NODE_ENV ?? 'production') === 'production';

async function prepareDist() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  try {
    await cp(publicDir, distDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

async function build() {
  await prepareDist();

  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src/main.jsx')],
    bundle: true,
    outdir: path.join(distDir, 'assets'),
    format: 'esm',
    sourcemap: !isProd,
    minify: isProd,
    target: ['es2018'],
    jsx: 'automatic',
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx',
      '.css': 'css',
      '.svg': 'file',
      '.png': 'file',
      '.jpg': 'file',
      '.jpeg': 'file',
      '.gif': 'file'
    },
    publicPath: 'assets',
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
    }
  });
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
