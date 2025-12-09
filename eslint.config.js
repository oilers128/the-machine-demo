import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const configDir = dirname(fileURLToPath(import.meta.url))

const tsRules = {
  ...tsPlugin.configs['eslint-recommended']?.overrides?.[0]?.rules,
  ...tsPlugin.configs.recommended.rules,
}

export default [
  {
    ignores: ['dist', 'node_modules', 'vite.config.ts', '**/*.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: resolve(configDir, 'tsconfig.json'),
        tsconfigRootDir: configDir,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...tsRules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]

