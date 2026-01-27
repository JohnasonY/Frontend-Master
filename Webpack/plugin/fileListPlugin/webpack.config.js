const baseConfig = require("./webpack.base");
const devConfig = require("./webpack.dev");
const buildConfig = require("./webpack.build");

const FileListPlugin = require("./plugins/fileListPlugin");

module.exports = function (env) {
  if (env && env.prod) {
    // production environment
    return {
      ...baseConfig,
      ...buildConfig,
      plugins: [new FileListPlugin()],
    };
  } else {
    // development environment
    return {
      ...baseConfig,
      ...devConfig,
      plugins: [new FileListPlugin()],
    };
  }
};

// {
//   mode: "development",
//   devtool: "source-map",
//   plugins: [new FileListPlugin()],
// };
