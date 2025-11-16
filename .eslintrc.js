module.exports = {
  extends: [
    '@n8n/n8n-node-dev/eslint-config',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
