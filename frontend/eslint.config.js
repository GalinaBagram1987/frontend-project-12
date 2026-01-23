import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Игнорируемые папки
  globalIgnores(['dist']),

  // Базовые правила JavaScript
  js.configs.recommended,

  // Правила для React Hooks (ИСПРАВЛЕНО - преобразовано в flat config)
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },

  // Правила для React Refresh (Vite) (ИСПРАВЛЕНО - преобразовано в flat config)
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: reactRefresh.configs.vite.rules,
  },

  // Правила @stylistic (ИСПРАВЛЕНО - преобразовано в flat config)
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: stylistic.configs.recommended.rules,
  },

  // Ваши кастомные правила
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '[A-Z_]',
        },
      ],

      // Переопределяем правила @stylistic если нужно
      '@stylistic/semi': ['error', 'never'], // Без точек с запятой
      '@stylistic/indent': ['error', 2, 
        {
    // Для JSX атрибутов - дополнительный отступ
    JSXAttribute: 2,
    JSXClosingElement: 2,
    JSXClosingFragment: 2,
    JSXExpressionContainer: 2,
    JSXOpeningElement: 2,
    JSXOpeningFragment: 2, }], // Отступ 2 пробела
      '@stylistic/quotes': ['error', 'single'], // Одинарные кавычки
    },
  },
])
