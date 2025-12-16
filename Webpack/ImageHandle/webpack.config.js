module.exports = {
  mode: "development",
  devtool: "source-map",
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
