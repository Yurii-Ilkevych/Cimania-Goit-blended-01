import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        cacheControl: 'public, max-age=31536000',
      },
    },
    outDir: '../dist',
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/**.html']),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
});



