import React, {Component} from 'react';
import { Dimensions, Image, SafeAreaView, View } from "react-native";

import {Divider} from "react-native-elements";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import { CommonActions } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;



class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.changeScreen()
  }
 changeScreen() {
    setTimeout(() => {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    {name: "LandingScreen"},
                ],
            })
        );
    },3000);
  }

  render() {
    return (
        <LinearGradient colors={['#FFF32A', '#76B043', '#76B043']} style={{
            flex: 1,
            backgroundColor: colors.TITLE_LINE_COLOR,
        }}>
            <View style={{
                flex: 1,
                justifyContent:"center",
            }}>
                <SafeAreaView/>
                <Image
                    resizeMode={'cover'} style={{
                    alignSelf:'center',

                    width: 311, height: 291,
                    marginStart:15
                }} source={require('../assets/images/gdc_text.png')}/>
            </View>

        </LinearGradient>
    );
  }
}

export default SplashScreen;
