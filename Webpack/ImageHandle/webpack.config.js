module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png)|(jpg)|(gif)$/, // apply to image files
        use: [
          {
            loader: "./loaders/img-loader.js",
          },
        ],
      },
    ],
  },
};
