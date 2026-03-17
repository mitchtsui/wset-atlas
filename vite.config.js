import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'

export default defineConfig({
  plugins: [
    react(),
    obfuscatorPlugin({
      apply: 'build',
      // ONLY obfuscate .js output chunks, skip everything else
      include: ['**/*.js'],
      exclude: ['node_modules/**', '**/*.html', '**/*.css'],
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2,
        stringArray: true,
        stringArrayThreshold: 0.75,
        stringArrayEncoding: ['rc4'],
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersType: 'function',
        splitStrings: true,
        splitStringsChunkLength: 8,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        debugProtection: true,
        debugProtectionInterval: 2000,
        selfDefending: true,
        transformObjectKeys: true,
        numbersToExpressions: true,
        target: 'browser',
        reservedNames: ['^React', '^useState', '^useEffect', '^useRef', '^useCallback', '^createElement'],
      },
    }),
  ],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_debugger: true },
      mangle: { safari10: true },
      format: { comments: false },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
  },
})
