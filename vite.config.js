import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import JavaScriptObfuscator from 'javascript-obfuscator'

// Custom plugin — only touches rendered JS chunks, never HTML
function obfuscateChunks() {
  return {
    name: 'obfuscate-chunks',
    apply: 'build',
    enforce: 'post',
    renderChunk(code, chunk) {
      if (!chunk.fileName.endsWith('.js')) return null
      const result = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.4,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.15,
        stringArray: true,
        stringArrayThreshold: 0.75,
        stringArrayEncoding: ['rc4'],
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersType: 'function',
        splitStrings: true,
        splitStringsChunkLength: 10,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        debugProtection: true,
        debugProtectionInterval: 2000,
        selfDefending: true,
        transformObjectKeys: true,
        numbersToExpressions: true,
        target: 'browser',
        reservedNames: ['^React', '^useState', '^useEffect', '^useRef', '^useCallback', '^createElement'],
      })
      return { code: result.getObfuscatedCode(), map: null }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    obfuscateChunks(),
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
