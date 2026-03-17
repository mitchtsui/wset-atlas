import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'

export default defineConfig({
  plugins: [
    react(),
    obfuscatorPlugin({
      // Only obfuscate in production builds
      apply: 'build',
      // Options for javascript-obfuscator
      options: {
        // --- Core protection ---
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2,
        
        // --- String protection ---
        stringArray: true,
        stringArrayThreshold: 0.75,
        stringArrayEncoding: ['rc4'],
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersType: 'function',
        splitStrings: true,
        splitStringsChunkLength: 8,
        
        // --- Identifier mangling ---
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false, // keep false to avoid breaking React
        
        // --- Anti-debug ---
        debugProtection: true,
        debugProtectionInterval: 2000,
        disableConsoleOutput: false, // we handle this ourselves
        selfDefending: true,
        
        // --- Transform ---
        transformObjectKeys: true,
        numbersToExpressions: true,
        
        // --- Performance balance ---
        // Keep target as browser to avoid Node-specific transforms
        target: 'browser',
        
        // Don't obfuscate these (React internals need them)
        reservedNames: ['^React', '^useState', '^useEffect', '^useRef', '^useCallback', '^createElement'],
      },
    }),
  ],
  build: {
    // No source maps in production
    sourcemap: false,
    // Minify with terser for extra compression + mangling
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // we use console for the warning
        drop_debugger: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false, // strip all comments
      },
    },
    rollupOptions: {
      output: {
        // Randomized chunk names make it harder to identify files
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
  },
})
