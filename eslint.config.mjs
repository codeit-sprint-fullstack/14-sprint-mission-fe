import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'dist/**',
    'node_modules/**',
    'src/**',
    'legacy/**',
    'server/**',
    'api_test/**',
    'next-env.d.ts',
  ]),
]);
