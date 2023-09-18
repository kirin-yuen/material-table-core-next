module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb-base', // airbnb 公司的 eslint 规范
    'prettier', // 防止 Prettier 和 ESLint 格式化功能冲突, 放置在最后
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  // 某些配置文件不想被 eslint 插件实时验证
  ignorePatterns: ['/*.cjs'],
  // 取消 **/*.jsx 里继承自'plugin:react/recommended'里‘react/jsx-no-target-blank’的规则实时验证
  overrides: [
    {
      files: ['**/*.jsx', '**/*.js'],
      rules: {
        'react/prop-types': 0,
        'import/no-extraneous-dependencies': 1,
        'no-unused-vars': 1,
        'import/prefer-default-export': 0,
        'default-param-last': 0,
        'no-param-reassign': 1,
        'no-nested-ternary': 0,
        'react/display-name': 0,
      },
    },
  ],
};
