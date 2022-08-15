export default {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        targets: { node: "current" },
      },
    ],
  ],
  plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-object-rest-spread"],
};
