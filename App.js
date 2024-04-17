import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import Switch from './navigation/Switch';
import auth from '@react-native-firebase/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [isLogedIn, setisLogedIn] = useState(false);
  function onAuthStateChanged(user) {
    setisLogedIn(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    SplashScreen.hide();
    return subscriber;
  });
  if (initializing) return null;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Switch uuid={isLogedIn} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
