module.exports = {
  presets: [
    [
      "@babel/env",
      {
        corejs: 3,
        modules: "auto",
        useBuiltIns: "usage",
      },
    ],
    "@babel/react",
    "@babel/preset-typescript",
  ],
  plugins: [["import", { libraryName: "antd", style: "css" }]],
};
