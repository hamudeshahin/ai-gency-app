module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",

      // [
      //   "babel-plugin-inline-import",
      //   {
      //     extensions: [".svg"],
      //   },
      // ],
    ],
  };
};
