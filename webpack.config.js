var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./app/src/index",
    client: "webpack-dev-server/client/index.js?hot=true&live-reload=true",
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: false, // HMR is broken, as a workaround live reload is used
    open: true,
    port: 8090,
    static: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(s?css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./app/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".scss"],
  },
};
