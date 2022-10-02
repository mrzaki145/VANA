import { defineConfig } from 'vite';
import { resolve } from 'path';
import StylelintPlugin from 'vite-plugin-stylelint';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

const root = resolve(__dirname, 'src');

export default defineConfig({
  root,
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      },
    },
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv(), autoprefixer({ grid: 'autoplace' })],
    },
  },
  plugins: [StylelintPlugin()],
});
