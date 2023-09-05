const HtmlWebpackPlugin = require("html-loader");
module.rules.push({
  test: /\.html$/,
  loader: "html-loader",
});
