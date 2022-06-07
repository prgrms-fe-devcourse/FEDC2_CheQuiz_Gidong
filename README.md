# React typescript boilerplate

## 설치 방법
```cli
npm install
npm start # development
npm build # production
```

## 설치되어 있는 플러그인

- typescript
- webpack
- webpack-dev-server
- webpack-cli
- eslint
- prettier
- sass
- postcss

## ESLint

- airbnb rule 적용

```json
{
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "airbnb",
        "prettier:recommends",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["react", "react-hooks"]
}
```

## Prettier

```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}

```