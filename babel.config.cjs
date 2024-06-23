module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { esmodules: true, node: true },
        // Setting this to false will preserve ES modules.
        modules: false,
      },
    ],
    "@babel/preset-typescript",
  ],
};
