import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from '@use-expo/font';
import * as Font from 'expo-font';

import store from "./src/store";
import Routes from "./src/routes";

enum FontDisplay {
  AUTO = 'auto',
  BLOCK = 'block',
  SWAP = 'swap',
  FALLBACK = 'fallback',
  OPTIONAL = 'optional',
}


export default function App() {

  let [fontsLoaded] = useFonts({
    'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
    'Lato-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),
    'Lato-Hairline': require('./assets/fonts/Lato/Lato-Thin.ttf'),
    'Lato Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
    'Albertiny Demo': require('./assets/fonts/Albertiny/AlbertinyDemo.otf'),
    'Cream Cake': require('./assets/fonts/CreamCake/CreamCake.ttf'),
    'Roboto Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto Thin': require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
    'Roboto Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
    'Comfortaa Light': require('./assets/fonts/Comfortaa/Comfortaa-Light.ttf'),
    'Comfortaa Medium': require('./assets/fonts/Comfortaa/Comfortaa-Medium.ttf'),
    'Comfortaa Bold': require('./assets/fonts/Comfortaa/Comfortaa-Bold.ttf'),
  });
    
  useEffect(() => {
      (async () => {
        //await Font.unloadAsync('Albertiny Demo');

        // const respLoad = await Font.loadAsync({
        //   // Load a font `Montserrat` from a static resource
        //   //Montserrat: require('./assets/fonts/Montserrat.ttf'),
        
        //   // Any string can be used as the fontFamily name. Here we use an object to provide more control
        //   'Modak': {
        //     uri: 'https://fonts.googleapis.com/css2?family=Modak&display=swap',
        //     display: FontDisplay.SWAP
        //   },
        // })

      })()
  },[]);

  return (
    <Provider store={store}>
      <StatusBar translucent={false} animated={true} backgroundColor="white" barStyle="dark-content" />
      <Routes />
    </ Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
