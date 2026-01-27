const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].[chunkhash:5].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png)|(gif)|(jpg)$/,
        use: [
          // {
          //   loader: "file-loader",
          //   options: { name: "imgs/[name].[hash:5].[ext]" },
          // },
          {
            loader: "url-loader",
            options: {
              // limit: false, //all files to url-loader will convert to base64
              limit: 1 * 1024, //if files < 1*1024 bytes, use base64. Otherwise, convert to an url
              name: "imgs/[name].[hash:5].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./template",
          globOptions: {
            ignore: ["./template/index.html"],
          },
          to: "./",
        },
      ],
    }),
  ],
  devServer: {
    port: 8000,
    open: true,
    proxy: [
      {
        context: ["/api"],
        target: "https://study.duyiedu.com",
        changeOrigin: true,
      },
    ],
  },
  stats: {
    modules: false,
    colors: true,
  },
};
