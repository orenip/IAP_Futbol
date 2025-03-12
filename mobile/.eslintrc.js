module.exports = {
  "parser": "@babel/eslint-parser",
  "extends": ["plugin:react/recommended", "plugin:react-native/all"],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "requireConfigFile": false
  },
  "plugins": ["react", "react-native"],
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
