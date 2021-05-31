module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/pages",
            from: "./src/server",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["src/pages/api/**/*"],
      rules: {
        "import/no-restricted-paths": [
          "error",
          {
            zones: [
              {
                target: "./src/pages/api",
                from: "./src/client/",
              },
            ],
          },
        ],
      },
    },
  ],
};
