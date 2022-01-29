module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
  ],
  parserOptions: { 
    parser: "@typescript-eslint/parser" 
  },
  rules: {
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3
      },      
      "multiline": {
        "max": 1
      }
    }]
  }
}