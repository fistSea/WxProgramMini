module.exports = {
  "*.{}": "eslint --fix --cache",
  "*.{}": "stylelint  --fix --allow-empty-input",
  "*.{}": () => "vue-tsc --noEmit -p tsconfig.vitest.json --composite false",
};
