module.exports = {
  name: "Arwi",
  slug: "arwi-app",
  owner: "arwi",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
    bundleIdentifier: "com.zen-tracking.arwi",
  },
  android: {
    package: "net.arwi.twa",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  scheme: "arwi-app",
  extra: {
    eas: {
      projectId: "630de596-103e-469d-968f-bd0339f5f4c8",
    },
  },
  plugins: [
    [
      "@react-native-voice/voice",
      {
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
        speechRecogntionPermission: "Allow $(PRODUCT_NAME) to securely recognize user speech",
      },
    ],
  ],
};
