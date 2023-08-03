module.exports = {
  name: "Arwi",
  slug: "arwi-app",
  owner: "arwi",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/logo-new.jpg",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/logo-new.jpg",
    resizeMode: "contain",
    backgroundColor: "#65AF53",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
    bundleIdentifier: "com.zen-tracking.arwi",
    buildNumber: "2",
  },
  android: {
    package: "net.arwi.twa",
    versionCode: 2,
    adaptiveIcon: {
      foregroundImage: "./assets/logo-new.jpg",
      backgroundColor: "#FEFCFB",
    },
  },
  web: {
    favicon: "./assets/logo-new.jpg",
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
        microphonePermission: "CUSTOM: Allow $(PRODUCT_NAME) to access the microphone",
        speechRecognitionPermission: "CUSTOM: Allow $(PRODUCT_NAME) to securely recognize user speech",
      },
    ],
  ],
};
