const path = require("node:path");

module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: { config: path.join(__dirname, "tailwind.config.js") },
    autoprefixer: {},
  },
};
