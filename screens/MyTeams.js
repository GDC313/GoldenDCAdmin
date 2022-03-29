import React, {Component} from 'react';
import {FlatList, Image, ImageBackground, SafeAreaView, StatusBar, Text, TouchableOpacity, View} from "react-native";

import {Divider} from "react-native-elements";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../styles/Constants";

let data = [
    {
        teamName:"Amreli11",
        city:"Amreli"
    },
    {
        teamName:"Ahmedabad11",
        city:"Ahmedabad"
    },
    {
        teamName:"Rajkot11",
        city:"Rajkot"
    },
    {
        teamName:"Savarkundla11",
        city:"Savarkundla"
    },
    {
        teamName:"Gariyadhar11",
        city:"Gariyadhar"
    },
]
class MyTeams extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
        <SafeAreaView/>
        <StatusBar translucent backgroundColor={colors.STATUS_BAR_COLOR}/>
          <View style={{
              height:50,
              marginTop:22,
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:colors.PRIMARY_COLOR,
              flexDirection:'row',
          }}>
              <TouchableOpacity
                  style={{
                      position:'absolute',
                      left:0,
                  }}
                  onPress={()=>{
                      this.props.navigation.goBack()
                  }}>
                  <Image
                      resizeMode={'cover'}
                      style={{
                          width: 20, height: 18,
                          alignSelf: 'center',
                          marginStart:15
                      }} source={require('../assets/images/ic_back.png')}/>
              </TouchableOpacity>
              <Text
                  style={{
                      fontFamily: fontStyle.MontserratBold,
                      fontSize: 20,
                      color: colors.WHITE
                  }}>{Constants.MY_TEAMS}
              </Text>
          </View>
          <TouchableOpacity
              onPress={()=>{
                  this.props.navigation.navigate("AddTeamScreen");
              }}>
              <Text
                  style={{
                      alignSelf:'flex-end',
                      marginTop:10,
                      fontFamily: fontStyle.MontserratBold,
                      fontSize: 12,
                      paddingTop:8,
                      paddingBottom:8,
                      paddingStart:20,
                      paddingEnd:20,
                      borderRadius:5,
                      marginEnd:10,
                      backgroundColor:colors.STATUS_BAR_COLOR,
                      color: colors.WHITE}}>{
                  Constants.ADD_NEW_TEAM
              }</Text>
          </TouchableOpacity>

          <FlatList
              contentContainerStyle={{
                  flexGrow: 1,
                  marginTop:10
              }}
              data={data}
              renderItem={({item}) => (
                  <TouchableOpacity onPress={()=>{
                      this.props.navigation.navigate("TeamListScreen",{
                          teamName : item.teamName,
                          city : item.city,
                          isNewAddPlayer:false
                      });
                  }}>
                      <View style={{
                          flexDirection: 'column',
                          paddingBottom: 10,
                          paddingTop: 10,
                          marginStart:20,
                          marginEnd:20,
                          borderRadius: 8,
                          marginBottom:10,
                          borderWidth:1,
                          borderColor:'rgba(2,79,39,0.1)'
                      }}>
                          <View
                              style={{
                                  paddingStart: 15,
                                  flexDirection:'row'
                              }}>
                              <Image
                                  resizeMode={'cover'}
                                  style={{
                                      width: 50, height: 50,
                                      marginEnd:10
                                  }} source={require('../assets/images/ic_top_logo.png')}/>

                              <View>
                                  <Text
                                      style={{
                                          fontFamily: fontStyle.MontserratBold,
                                          fontSize: 16,
                                          color: colors.BLACK}}>{
                                      item.teamName
                                  }</Text>
                                  <View style={{
                                      flexDirection:'row',
                                      alignItems:'center',
                                      marginTop:5
                                  }}>
                                      <Text
                                          style={{
                                              fontFamily: fontStyle.MontserratBold,
                                              fontSize: 16,
                                              color: colors.BLACK}}>{
                                          "City: "
                                      }</Text>
                                      <Text
                                          style={{
                                              fontFamily: fontStyle.MontserratRegular,
                                              fontSize: 16,
                                              color: colors.BLACK}}>{
                                          item.city
                                      }</Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                  </TouchableOpacity>
              )}/>
      </View>
    );
  }
}

export default MyTeams;