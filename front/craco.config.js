const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
            },
            "url-loader",
          ],
        },
      ],
    },
  },
};
