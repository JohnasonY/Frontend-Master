const { sources, Compilation } = require("webpack");

module.exports = class FileListPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("FileListPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "FileListPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const lines = Object.keys(assets).map((name) => {
            const sizeKB = (assets[name].size() / 1024).toFixed(2);
            return `- ${name} (${sizeKB} KB)`;
          });

          const content = lines.join("\n");
          const outputName = "fileList.md";
          const source = new sources.RawSource(content);

          // If asset already exists, update it; otherwise emit it.
          if (assets[outputName]) {
            compilation.updateAsset(outputName, source);
          } else {
            compilation.emitAsset(outputName, source);
          }
        }
      );
    });
  }
};
