const { override, addLessLoader, adjustStyleLoaders } = require('customize-cra');

module.exports = override(
  // 使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    }
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions }
  })
)