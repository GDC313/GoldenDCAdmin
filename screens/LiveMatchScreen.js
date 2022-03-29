import React, {Component} from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import {Divider} from "react-native-elements";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";

let data = [
  {
    team1:{
      name:"IND",
      score:117,
      innings:{
        team1:[
          {
            playerName:"Madhevere",
            out:"c Neil Rock b Craig Young",
            run:"1",
            ball:"4",
            four:"0",
            six:"0"
          },
          {
            playerName:"T Marumani",
            out:"c Stirling b Craig Young",
            run:"1",
            ball:"10",
            four:"0",
            six:"0"
          },
          {
            playerName:"Chakabva (wk)",
            out:"b Simi Singh",
            run:"47",
            ball:"28",
            four:"4",
            six:"1"
          },
          {
            playerName:"Dion Myers",
            out:"b Getkate",
            run:"10",
            ball:"14",
            four:"1",
            six:"0"
          },
          {
            playerName:"Craig Ervine (c)",
            out:"c Andy Balbirnie b Simi Singh",
            run:"17",
            ball:"12",
            four:"1",
            six:"1"
          },
          {
            playerName:"Milton Shumba",
            out:"c Neil Rock b Barry McCarthy",
            run:"7",
            ball:"18",
            four:"0",
            six:"0"
          },
          {
            playerName:"Ryan Burl",
            out:"run out (Andy Balbirnie)",
            run:"12",
            ball:"15",
            four:"0",
            six:"0"
          },
          {
            playerName:"W Masakadza",
            out:"not out",
            run:"19",
            ball:"15",
            four:"1",
            six:"0"
          },
          {
            playerName:"Luke Jongwe",
            out:"not out",
            run:"2",
            ball:"4",
            four:"0",
            six:"0"
          }
        ],
        bowlers:[
          {
            playerName:"Craig Young",
            over:"4",
            run:"15",
            wickets:"2"
          },
          {
            playerName:"Barry McCarthy",
            over:"4",
            run:"20",
            wickets:"1"
          },
          {
            playerName:"Curtis Campher",
            over:"2",
            run:"25",
            wickets:"1"
          },
          {
            playerName:"Simi Singh",
            over:"4",
            run:"22",
            wickets:"2"
          },
          {
            playerName:"Getkate",
            over:"2",
            run:"16",
            wickets:"1"
          },
          {
            playerName:"Benjamin White",
            over:"4",
            run:"18",
            wickets:"0"
          }
        ],
        extras:"1",
        total:"117",
        didNotBat:"Chatara, Ngarava,"
      },
      overs:"20"
    },
    team2:{
      name:"ENG",
      score:114,
      innings:{
        team2:[
          {
            playerName:"Paul Stirling",
            out:"b Luke Jongwe",
            run:"24",
            ball:"19",
            four:"5",
            six:"0"
          },
          {
            playerName:"Kevin O Brien",
            out:"b Ryan Burl",
            run:"25",
            ball:"32",
            four:"3",
            six:"0"
          },
          {
            playerName:"Andrew Balbirnie (c)",
            out:"lbw b Ryan Burl",
            run:"6",
            ball:"8",
            four:"0",
            six:"0"
          },
          {
            playerName:"George Dockrell",
            out:"c W Masakadza b Ryan Burl",
            run:"8",
            ball:"6",
            four:"1",
            six:"0"
          },
          {
            playerName:"Shane Getkate",
            out:"c Chatara b W Masakadza",
            run:"5",
            ball:"10",
            four:"0",
            six:"0"
          },
          {
            playerName:"Curtis Campher",
            out:"c Dion Myers b W Masakadza",
            run:"3",
            ball:"4",
            four:"0",
            six:"0"
          },
          {
            playerName:"Neil Rock (wk)",
            out:"b Luke Jongwe",
            run:"4",
            ball:"7",
            four:"0",
            six:"0"
          },
          {
            playerName:"Simi Singh",
            out:"not out",
            run:"28",
            ball:"22",
            four:"3",
            six:"1"
          },
          {
            playerName:"Barry McCarthy",
            out:"b Ngarava",
            run:"4",
            ball:"11",
            four:"0",
            six:"0"
          },
          {
            playerName:"Craig Young",
            out:"run out (Chakabva/Ngarava)",
            run:"0",
            ball:"1",
            four:"0",
            six:"0"
          },
          {
            playerName:"Benjamin White",
            out:"not out",
            run:"0",
            ball:"0",
            four:"0",
            six:"0"
          }
        ],
        bowlers:[
          {
            playerName:"Wellington Masakadza",
            over:"4",
            run:"18",
            wickets:"2"
          },{
            playerName:"Richard Ngarava",
            over:"4",
            run:"17",
            wickets:"1"
          },{
            playerName:"Tendai Chatara",
            over:"3",
            run:"25",
            wickets:"0"
          },{
            playerName:"Luke Jongwe",
            over:"4",
            run:"17",
            wickets:"2"
          },{
            playerName:"Ryan Burl",
            over:"4",
            run:"22",
            wickets:"3"
          },{
            playerName:"Dion Myers",
            over:"1",
            run:"12",
            wickets:"0"
          }
        ],
        extras:"7",
        total:"114",
        didNotBat:""
      },
      overs:"20"
    },
    result:{
      date:"Fri,27 Aug 2021",
      winTeam:"IND win by 3 runs",
    }
  },
]

class LiveMatchScreen extends Component {
  constructor(props) {
    super(props);
    this._setNavigationOptions()
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
        }}>{"IND VS AUS"}</Text>,
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

        <ScrollView
          scrollEnabled={true}
          contentContainerStyle={{
            paddingBottom:10
          }}>
          <View style={{
            marginTop:10,
            marginStart:10,
            // alignSelf: 'center',
          }}>
            <View style={{
              flexDirection:'row'
            }}>

              <Image
                resizeMode={'cover'} style={{
                width: 50, height: 50,
                marginEnd:5
              }} source={require('../assets/images/ic_team_ind.png')}/>

              <View>
                <Text style={{
                  fontFamily: fontStyle.AvenirBlack,
                  fontSize: 16,
                  marginEnd:10,
                  color: colors.BLACK_0B
                }}>IND</Text>
                <View style={{
                  marginTop:-8,
                  flexDirection:'row'
                }}>
                  <Text style={{
                    fontFamily: fontStyle.AvenirBlack,
                    fontSize: 20,
                    marginEnd:5,
                    color: colors.BG_BLUE1
                  }}>100-3</Text>
                  <Text style={{
                    fontFamily: fontStyle.AvenirMedium,
                    alignSelf: 'center',
                    fontSize: 16,
                    marginEnd:10,
                    color: colors.BLACK_0B
                  }}>13.1</Text>

                </View>
              </View>

            </View>

            <Divider style={{
              marginTop:10,
              backgroundColor: colors.BLACK,
              opacity: 0.3,  }}/>


            <View style={{
              marginTop:20,
              flexDirection:'row'
            }}>
              <View style={{
                flexDirection:'row',
                flex:1,
                alignItems:'center'
              }}>
                <Image
                  resizeMode={"cover"}
                  style={{
                    borderRadius: 20,
                    height: 50, width: 50
                  }}
                  source={require('../assets/images/ic_user_icon.png')}
                />
                <View style={{
                  flexDirection:'column',
                  marginStart:8,
                  // alignItems:'center',
                  // justifyContent:'center'
                }}>
                  <Text
                    style={{
                      fontFamily: fontStyle.AvenirBlack,
                      fontSize: 20,
                      color: colors.BLACK
                    }}>{
                    "R. Pant"
                  }</Text>
                  <Text
                    style={{
                      marginTop:-10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 16,
                      color: colors.BLACK}
                    }>{
                    "43 (31)"
                  }</Text>
                </View>
                <Image
                  resizeMode={"cover"}
                  style={{
                    marginStart:10,
                    borderRadius: 20,
                    height: 18, width: 18
                  }}
                  source={require('../assets/images/ic_user_icon.png')}
                />
              </View>

              {/* Second Player */}
              <View style={{
                marginEnd:20,
                flex:1,
                alignItems:"flex-end",
                justifyContent:"flex-end",
                flexDirection:'row',
              }}>
                <Image
                  resizeMode={"cover"}
                  style={{
                    borderRadius: 20,
                    height: 50, width: 50
                  }}
                  source={require('../assets/images/ic_user_icon.png')}
                />
                <View style={{
                  flexDirection:'column',
                  marginStart:8,
                  // alignItems:'center',
                  // justifyContent:'center'
                }}>
                  <Text
                    style={{
                      fontFamily: fontStyle.AvenirBlack,
                      fontSize: 20,
                      color: colors.BLACK
                    }}>{
                    "S. Iyer"
                  }</Text>
                  <Text
                    style={{
                      marginTop:-10,
                      fontFamily: fontStyle.AvenirMedium,
                      fontSize: 16,
                      color: colors.BLACK}
                    }>{
                    "57 (30)"
                  }</Text>
                </View>
                {/*<Image*/}
                {/*  resizeMode={"cover"}*/}
                {/*  style={{*/}
                {/*    alignSelf:'center',*/}
                {/*    marginStart:10,*/}
                {/*    borderRadius: 20,*/}
                {/*    height: 18, width: 18*/}
                {/*  }}*/}
                {/*  source={require('../assets/images/ic_user_icon.png')}*/}
                {/*/>*/}
              </View>

            </View>

            <View style={{
              marginTop:10,
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'row',
            }}>
              <Image
                resizeMode={"cover"}
                style={{
                  borderRadius: 20,
                  height: 50, width: 50
                }}
                source={require('../assets/images/ic_user_icon.png')}
              />
              <View style={{
                flexDirection:'column',
                marginStart:8,
                // alignItems:'center',
                // justifyContent:'center'
              }}>
                <Text
                  style={{
                    fontFamily: fontStyle.AvenirBlack,
                    fontSize: 20,
                    color: colors.BLACK
                  }}>{
                  "S. Smith"
                }</Text>
                <Text
                  style={{
                    marginTop:-10,
                    fontFamily: fontStyle.AvenirMedium,
                    fontSize: 16,
                    color: colors.BLACK}
                  }>{
                  "2-32 (2.1)"
                }</Text>
              </View>
              {/*<Image*/}
              {/*  resizeMode={"cover"}*/}
              {/*  style={{*/}
              {/*    alignSelf:'center',*/}
              {/*    marginStart:10,*/}
              {/*    borderRadius: 20,*/}
              {/*    height: 18, width: 18*/}
              {/*  }}*/}
              {/*  source={require('../assets/images/ic_user_icon.png')}*/}
              {/*/>*/}
            </View>

            <Divider style={{
              marginTop:10,
              backgroundColor: colors.BLACK,
              opacity: 0.3,  }}/>


          </View>
        </ScrollView>
      </View>
    );
  }
}

export default LiveMatchScreen;
