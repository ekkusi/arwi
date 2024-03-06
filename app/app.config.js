module.exports = {
  name: "Arwi",
  slug: "arwi-app",
  owner: "arwi",
  version: "1.1.6",
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
    infoPlist: {
      NSPhotoLibraryUsageDescription: "$(PRODUCT_NAME) does not require access to the photo library.",
    },
  },
  android: {
    package: "net.arwi.twa",
    adaptiveIcon: {
      foregroundImage: "./assets/logo-new-android.png",
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
  runtimeVersion: "1.0.4",
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
    [
      "@sentry/react-native/expo",
      {
        // You also need to set SENTRY_AUTH_TOKEN when building locally with eas. You can use .env file and scripts/build-local.sh for this.
        url: "https://sentry.io/",
        project: "arwi-app",
        organization: "arwi",
      },
    ],
    "expo-build-properties",
    "expo-font",
    "expo-secure-store",
  ],
};
