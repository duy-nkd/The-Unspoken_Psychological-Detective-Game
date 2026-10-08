import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // File cấu hình + test chạy trên Node
    files: ['*.config.js', 'src/**/*.test.js'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    // Context/provider export cả component lẫn hook
    files: ['src/features/**/state/**/*.{js,jsx}', 'src/app/**/*.{js,jsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    // Logger là nơi duy nhất được dùng console.*
    files: ['src/shared/logger/**/*.js'],
    rules: { 'no-console': 'off' },
  },
])
