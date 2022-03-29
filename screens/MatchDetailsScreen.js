import React, {Component} from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import {Divider} from "react-native-elements";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";

let data = [
  {
    team1:{
      name:"IND",
      score:100,
    },
    team2:{
      name:"ENG",
      score:150,
    },
    result:{
      date:"Fri,27 Aug 2021",
      winTeam:"ENG win by 50 runs"
    }
  },
  {
    team1:{
      name:"IND",
      score:250,
    },
    team2:{
      name:"ENG",
      score:200,
    },
    result:{
      date:"Sat, 29 Aug 2021",
      winTeam:"IND win by 50 runs"
    }
  }
]

class MatchDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this._setNavigationOptions()
    this.state={
      item:this.props.route.params.item
    }
  }

  componentDidMount() {
  }

  /**
   * set navigation options
   */
  _setNavigationOptions = () => {
    this.props.navigation.setOptions({
      headerTitle:props => <Text
        {...props}
        style={{
          alignSelf: 'center',
          fontFamily: fontStyle.AvenirBlack,
          fontSize: 16,
          color: colors.WHITE
        }}>{this.props.route.params.name}</Text>,
      headerTitleStyle: {
        alignSelf: 'center',
      },
      headerStyle: {
        backgroundColor:colors.BLUE_COLOR,
      },
      headerBackButtonText: '',
      headerBackTitleVisible: false,
      headerTintColor: colors.WHITE,
      headerRight: () => (
        <View/>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack()
          }}>
          <Image
            resizeMode={'cover'} style={{
            width: 13, height: 22,
            marginStart:15,
            tintColor:colors.WHITE
          }} source={require('../assets/images/ic_back_1.png')}/>
        </TouchableOpacity>
      ),
      headerLayoutPreset: 'center',
    });
  };

  render() {
    return (

      <View style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
        <SafeAreaView/>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontFamily: fontStyle.AvenirMedium,
              fontSize: 18,
              color: colors.BG_BLUE}}>{
            this.state.item.result.winTeam
          }</Text>
        <ScrollView
          scrollEnabled={true}
          contentContainerStyle={{
            paddingBottom:10
          }}>

          {/*Team 1 start*/}
          <Text
            style={{
              backgroundColor:colors.BLACK_0B,
              paddingStart: 10,
              marginTop: 10,
              fontFamily: fontStyle.AvenirMedium,
              fontSize: 18,
              color: colors.WHITE}}>{
            this.state.item.team1.name+" Innings"
          }</Text>
          {/* First inning batting */}
          <View style={{
            backgroundColor:colors.LINE_GRAY_COLOR,
            flexDirection: 'row',
          }}>
            <Text
              style={{
                flex:6,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "Player Name"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirBlack,
                fontSize: 14,
                color: colors.BLACK}}>{
              "R"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "B"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "4s"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "6s"
            }</Text>
          </View>
          <FlatList
            contentContainerStyle={{
            }}
            data={this.state.item.team1.innings.team1}
            renderItem={({item}) => (
              <View style={{
                flexDirection: 'column',
              }}>
                <View style={{
                  flexDirection: 'row',
                  paddingBottom:3,
                  paddingTop:3
                }}>
                  <Text
                    style={{
                      flex:6,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.playerName
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirBlack,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.run
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.ball
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.four
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.six
                  }</Text>

                </View>
                <Divider style={{
                  backgroundColor: colors.BLACK,
                  opacity: 0.3,  }}/>
              </View>
            )}/>
          <View style={{
            flexDirection: 'row',
            paddingBottom:3,
            paddingTop:3
          }}>
            <Text
              style={{
                flex:5,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "Extra"
            }</Text>
            <Text
              style={{
                flex:4,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirBlack,
                fontSize: 14,
                color: colors.BLACK}}>{
              this.state.item.team1.innings.extras
            }</Text>
          </View>
          <Divider style={{
            backgroundColor: colors.BLACK,
            opacity: 0.3,  }}/>

          <View style={{
            flexDirection: 'row',
            paddingBottom:3,
            paddingTop:3
          }}>
            <Text
              style={{
                flex:5,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "Total"
            }</Text>
            <Text
              style={{
                flex:4,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirBlack,
                fontSize: 14,
                color: colors.BLACK}}>{
              this.state.item.team1.innings.total+" ( "+this.state.item.team1.overs+" Ov )"
            }</Text>
          </View>

          {/* First inning bowler */}
          <View style={{
            backgroundColor:colors.LINE_GRAY_COLOR,
            flexDirection: 'row',
          }}>
            <Text
              style={{
                flex:6,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "Bowler Name"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirBlack,
                fontSize: 14,
                color: colors.BLACK}}>{
              "O"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "R"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "W"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              ""
            }</Text>
          </View>
          <FlatList
            contentContainerStyle={{
            }}
            data={this.state.item.team1.innings.bowlers}
            renderItem={({item}) => (
              <View style={{
                flexDirection: 'column',

              }}>
                <View style={{
                  flexDirection: 'row',
                  paddingBottom:3,
                  paddingTop:3
                }}>
                  <Text
                    style={{
                      flex:6,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.playerName
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirBlack,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.over
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.run
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.wickets
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{

                  }</Text>

                </View>
                <Divider style={{
                  backgroundColor: colors.BLACK,
                  opacity: 0.3,  }}/>
              </View>
            )}/>


          {/*Team 2 start*/}
          <Text
            style={{
              backgroundColor:colors.BLACK_0B,
              paddingStart: 10,
              marginTop: 10,
              fontFamily: fontStyle.AvenirMedium,
              fontSize: 18,
              color: colors.WHITE}}>{
            this.state.item.team2.name+" Innings"
          }</Text>
          <View style={{
            backgroundColor:colors.LINE_GRAY_COLOR,
            flexDirection: 'row',
          }}>
            <Text
              style={{
                flex:6,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "Player Name"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirBlack,
                fontSize: 14,
                color: colors.BLACK}}>{
              "R"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "B"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "4s"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "6s"
            }</Text>
          </View>
          <FlatList
            contentContainerStyle={{
            }}
            data={this.state.item.team2.innings.team2}
            renderItem={({item}) => (
              <View style={{
                flexDirection: 'column',
              }}>
                <View style={{
                  flexDirection: 'row',
                  paddingBottom:3,
                  paddingTop:3
                }}>
                  <Text
                    style={{
                      flex:6,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.playerName
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirBlack,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.run
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.ball
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.four
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.six
                  }</Text>

                </View>
                <Divider style={{
                  backgroundColor: colors.BLACK,
                  opacity: 0.3,  }}/>
              </View>
            )}/>
          <View style={{
            flexDirection: 'row',
            paddingBottom:3,
            paddingTop:3
          }}>
            <Text
              style={{
                flex:5,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "Extra"
            }</Text>
            <Text
              style={{
                flex:4,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirBlack,
                fontSize: 14,
                color: colors.BLACK}}>{
              this.state.item.team2.innings.extras
            }</Text>
          </View>
          <Divider style={{
            backgroundColor: colors.BLACK,
            opacity: 0.3,  }}/>
          <View style={{
            flexDirection: 'row',
            paddingBottom:3,
            paddingTop:3
          }}>
            <Text
              style={{
                flex:5,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "Total"
            }</Text>
            <Text
              style={{
                flex:4,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirBlack,
                fontSize: 14,
                color: colors.BLACK}}>{
              this.state.item.team2.innings.total+" ( "+this.state.item.team2.overs+" Ov )"
            }</Text>
          </View>
          <Divider style={{
            backgroundColor: colors.BLACK,
            opacity: 0.3,  }}/>
          {/* Second inning bowler */}
          <View style={{
            backgroundColor:colors.LINE_GRAY_COLOR,
            flexDirection: 'row',
          }}>
            <Text
              style={{
                flex:6,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "Bowler Name"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirBlack,
                fontSize: 14,
                color: colors.BLACK}}>{
              "O"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "R"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              "W"
            }</Text>
            <Text
              style={{
                flex:1,
                marginLeft: 10,
                fontFamily: fontStyle.AvenirMedium,
                fontSize: 14,
                color: colors.BLACK}}>{
              ""
            }</Text>
          </View>
          <FlatList
            contentContainerStyle={{
            }}
            data={this.state.item.team2.innings.bowlers}
            renderItem={({item}) => (
              <View style={{
                flexDirection: 'column',

              }}>
                <View style={{
                  flexDirection: 'row',
                  paddingBottom:3,
                  paddingTop:3
                }}>
                  <Text
                    style={{
                      flex:6,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.playerName
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirBlack,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.over
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.run
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{
                    item.wickets
                  }</Text>
                  <Text
                    style={{
                      flex:1,
                      marginLeft: 10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 14,
                      color: colors.BLACK}}>{

                  }</Text>

                </View>
                <Divider style={{
                  backgroundColor: colors.BLACK,
                  opacity: 0.3,  }}/>
              </View>
            )}/>


        </ScrollView>
      </View>
    );
  }
}

export default MatchDetailsScreen;
