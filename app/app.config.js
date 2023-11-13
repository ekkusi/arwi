module.exports = {
  name: "Arwi",
  slug: "arwi-app",
  owner: "arwi",
  version: "1.1.0",
  orientation: "portrait",
  icon: "./assets/logo-new.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/logo-new.png",
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
    buildNumber: "1",
    infoPlist: {
      NSPhotoLibraryUsageDescription: "$(PRODUCT_NAME) does not require access to the photo library.",
    },
  },
  android: {
    package: "net.arwi.twa",
    versionCode: 12, // Always needs to be incremented when creating new android release
    adaptiveIcon: {
      foregroundImage: "./assets/logo-new.png",
      backgroundColor: "#FEFCFB",
    },
  },
  web: {
    favicon: "./assets/logo-new.png",
  },
  scheme: "arwi-app",
  updates: {
    url: "https://u.expo.dev/630de596-103e-469d-968f-bd0339f5f4c8",
  },
  runtimeVersion: "1.0.3",
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
