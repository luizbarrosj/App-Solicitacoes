module.exports = function (api) {
  api.cache(true);
  
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "process.env", // Definindo como process.env
          path: ".env",              // Caminho do arquivo .env
        },
      ],
    ],
  };
};
