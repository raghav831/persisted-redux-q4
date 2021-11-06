import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import { store, persistor } from './components/persistedReducer';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppState, StyleSheet, Text, View, Button } from "react-native";
import {Session} from './components/persistedReducer';

export default function App() {
  
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [session,setSession]=useState(true);
  var myVar;
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/background/)
      )
      {
        myVar = setTimeout(()=>{ setSession(false) }, 600000);
      }
      if(appState.current.match(/background/) &&
      nextAppState === "active") {
        console.log("App has come to the foreground!");
        clearTimeout(myVar);  
      }
      if(appState.current.match(/inactive/)){
        setSession(false);
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
    <View style={styles.container}>
      <Session/>
    </View>
    {/* <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      
    </PersistGate>
  </Provider> */}
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
