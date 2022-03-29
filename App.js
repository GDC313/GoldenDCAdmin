/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { StatusBar, View, YellowBox } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {DashStack} from './screens/DashStack';
import {firebase} from "@react-native-firebase/database";

let url = "https://www.goldendc.demourl.ca/api"


class App extends React.Component {
  constructor(props) {
    super(props);

      // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
          apiKey: "AIzaSyCjdSw_hkYHnpeDirazW0bR22TBf_r6SAI",
          authDomain: "goldendc-fdb99.firebaseapp.com",
          databaseURL: "https://goldendc-fdb99-default-rtdb.firebaseio.com",
          projectId: "goldendc-fdb99",
          storageBucket: "goldendc-fdb99.appspot.com",
          messagingSenderId: "27904910068",
          appId: "1:27904910068:web:cec2aceca3a308f63534a1",
          measurementId: "G-GMHSX2ZZ76"
      };

// Initialize Firebase
      if (!firebase.apps.length) {
          const app = firebase.initializeApp(firebaseConfig);
      }
      // const analytics = firebase.getAnalytics(app);
  }

  render() {
    YellowBox.ignoreWarnings(['']);
    return (
        <View
            style={{
              flex: 1,
            }}>
          <StatusBar translucent backgroundColor="transparent"/>
          <NavigationContainer
              ref={navigationRef => {
                this.navigationRef = navigationRef;
              }}
              onStateChange={async () => {
                const currentRouteName = this.navigationRef.getCurrentRoute().name;
              }}>
            {<DashStack />}
          </NavigationContainer>
        </View>
    );
  }
}

export default App;
