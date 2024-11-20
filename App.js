
import React, { useState, useEffect, useCallback } from "react";
import { Platform, StatusBar, Image } from "react-native";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Images, products, materialTheme } from "./constants/";
import Screens from "./navigation/Screens";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

// Cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
  ...products.map((product) => product.image), // Cache product images
];

// Cache image function
const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load Resources
        await _loadResourcesAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Once the app is ready, set state
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const _loadResourcesAsync = async () => {
    // Cache images asynchronously
    await Promise.all([...cacheImages(assetImages)]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Optionally, you could return a loading spinner here
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <GalioProvider theme={materialTheme}>
        <Block flex>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <Screens />
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
}
