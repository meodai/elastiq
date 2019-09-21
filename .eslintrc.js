module.exports = {
  parser: "vue-eslint-parser",
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
