import React, {Component} from 'react';
import {
    Alert,
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {Divider} from "react-native-elements";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../styles/Constants";
import database from '@react-native-firebase/database';


class TossScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firebaseID: this.props.route.params.firebaseID,
            teamFirstId: this.props.route.params.teamFirstId,
            teamFirstName: this.props.route.params.teamFirstName,
            teamFirstImage: this.props.route.params.teamFirstImage,
            teamFirstSquad: this.props.route.params.teamFirstSquad,
            teamSecondId: this.props.route.params.teamSecondId,
            teamSecondName: this.props.route.params.teamSecondName,
            teamSecondSquad: this.props.route.params.teamSecondSquad,
            teamSecondImage: this.props.route.params.teamSecondImage,
            wonTossTeamFirst: null,
            selectBatFirst: null,
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop:10,
                backgroundColor: colors.PRIMARY_COLOR,
            }}>
                <SafeAreaView/>
                <StatusBar translucent backgroundColor='transparent'/>

                <View style={{
                    height: 50,
                    marginTop: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.PRIMARY_COLOR,
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            left: 0,
                        }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image
                            resizeMode={'cover'}
                            style={{
                                width: 20, height: 18,
                                alignSelf: 'center',
                                marginStart: 15
                            }} source={require('../assets/images/ic_back.png')}/>
                    </TouchableOpacity>

                    <Text
                        style={{
                            fontFamily: fontStyle.MontserratBold,
                            fontSize: 20,
                            color: colors.WHITE
                        }}>{Constants.TOSS}</Text>
                </View>

                <Text
                    style={{
                        fontFamily: fontStyle.MontserratBold,
                        fontSize: 20,
                        width:'100%',
                        textAlign:'center',
                        paddingTop: 20,
                        alignSelf: 'center',
                        backgroundColor:colors.WHITE,
                        color: colors.STATUS_BAR_COLOR
                    }}>{Constants.WHO_WON_TOSS}</Text>
                <View style={{
                    flexDirection: 'row',
                    paddingTop: 23,
                    paddingEnd: 18,
                    paddingStart: 18,
                    backgroundColor:colors.WHITE
                }}>
                    <View style={{
                        backgroundColor: '#76B04315',
                        flex: 1,
                        borderWidth: 1,
                        borderColor: this.state.wonTossTeamFirst !== null && this.state.wonTossTeamFirst ?
                            colors.STATUS_BAR_COLOR : '#76B04315',
                        marginEnd: 16,
                        borderRadius: 10,
                        height: 163,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',

                            }}
                            onPress={() => {
                                this.setState({
                                    wonTossTeamFirst: true
                                })
                            }}>
                            <ImageBackground
                                resizeMode={'cover'}
                                style={{
                                    width: 75,
                                    height: 75,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }} source={require('../assets/images/ic_rond_gradiant.png')}>
                                <Image
                                    resizeMode={'cover'}
                                    style={{
                                        width: 45,
                                        height: 45,
                                    }} source={require('../assets/images/ic_top_logo.png')}/>
                            </ImageBackground>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: colors.BLACK
                                }}>{this.state.teamFirstName}</Text>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 12,
                                    marginTop: 2,
                                    color: colors.BLACK
                                }}>{Constants.SQUAD_11 + "(" + this.state.teamFirstSquad.length + ")"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: '#76B04315',
                        flex: 1,
                        borderWidth: 1,
                        borderColor: this.state.wonTossTeamFirst !== null && !this.state.wonTossTeamFirst
                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                        marginEnd: 16,
                        borderRadius: 10,
                        height: 163,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.setState({
                                    wonTossTeamFirst: false
                                })
                            }}>
                            <ImageBackground
                                resizeMode={'cover'}
                                style={{
                                    width: 75,
                                    height: 75,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }} source={require('../assets/images/ic_rond_gradiant.png')}>
                                <Image
                                    resizeMode={'cover'}
                                    style={{
                                        width: 45,
                                        height: 45,
                                    }} source={require('../assets/images/ic_top_logo.png')}/>
                            </ImageBackground>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: colors.BLACK
                                }}>{this.state.teamSecondName}</Text>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 12,
                                    marginTop: 2,
                                    color: colors.BLACK
                                }}>{Constants.SQUAD_11 + "(" + this.state.teamSecondSquad.length + ")"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text
                    style={{
                        fontFamily: fontStyle.MontserratBold,
                        fontSize: 20,
                        paddingTop: 20,
                        width:'100%',
                        textAlign:'center',
                        alignSelf: 'center',
                        color: colors.STATUS_BAR_COLOR,
                        backgroundColor:colors.WHITE
                    }}>{Constants.WINNER_TOSS}</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingTop: 23,
                    paddingEnd: 18,
                    paddingStart: 18,
                    backgroundColor:colors.WHITE
                }}>
                    <View style={{
                        backgroundColor: '#76B04315',
                        flex: 1,
                        borderWidth: 1,
                        borderColor: this.state.selectBatFirst !== null && this.state.selectBatFirst ?
                            colors.STATUS_BAR_COLOR : '#76B04315',
                        marginEnd: 16,
                        borderRadius: 10,
                        height: 163,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',

                            }}
                            onPress={() => {
                                this.setState({
                                    selectBatFirst: true
                                })
                            }}>
                            <ImageBackground
                                resizeMode={'cover'}
                                style={{
                                    width: 75,
                                    height: 75,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }} source={require('../assets/images/ic_rond_gradiant.png')}>
                                <Image
                                    resizeMode={'cover'}
                                    style={{
                                        width: 17,
                                        height: 50,
                                    }} source={require('../assets/images/ic_bat_1.png')}/>
                            </ImageBackground>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: colors.BLACK
                                }}>{Constants.BAT}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: '#76B04315',
                        flex: 1,
                        borderWidth: 1,
                        borderColor: this.state.selectBatFirst !== null && !this.state.selectBatFirst ?
                            colors.STATUS_BAR_COLOR : '#76B04315',
                        marginEnd: 16,
                        borderRadius: 10,
                        height: 163,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.setState({
                                    selectBatFirst: false
                                })
                            }}>
                            <ImageBackground
                                resizeMode={'cover'}
                                style={{
                                    width: 75,
                                    height: 75,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }} source={require('../assets/images/ic_rond_gradiant.png')}>
                                <Image
                                    resizeMode={'cover'}
                                    style={{
                                        width: 35,
                                        height: 50,
                                    }} source={require('../assets/images/ic_bowl.png')}/>
                            </ImageBackground>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: colors.BLACK
                                }}>{Constants.BOWL}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingStart: 20,
                    paddingEnd: 20,
                    paddingBottom: 8,
                    backgroundColor:colors.WHITE
                }}>
                    <TouchableOpacity style={{
                        flex: 1,
                    }}>
                        <Text
                            style={{
                                width: '95%',
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 12,
                                marginEnd: 10,
                                paddingTop: 16,
                                alignSelf: 'center',
                                paddingBottom: 16,
                                textAlign: 'center',
                                paddingStart: 20,
                                paddingEnd: 20,
                                borderRadius: 6,
                                backgroundColor: colors.PRIMARY_COLOR,
                                color: colors.WHITE
                            }}>{
                            Constants.VIRTUAL_TOSS
                        }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.wonTossTeamFirst === null) {
                                Alert.alert("", "Please select who won the toss")
                                return
                            }
                            if (this.state.selectBatFirst === null) {
                                Alert.alert("", "Please select batting or bowling")
                                return
                            }
                            let battingTeamName = ""
                            let battingTeamId = ""
                            let bowlingTeamId = ""
                            let battingTeamSquad = []
                            let bowlingTeamName = ""
                            let bowlingTeamSquad = []
                            console.log("wonTossTeamFirst: ", this.state.wonTossTeamFirst)
                            console.log("selectBatFirst: ", this.state.selectBatFirst)

                            if (this.state.wonTossTeamFirst) {
                                if (this.state.selectBatFirst) {
                                    battingTeamId = this.state.teamFirstId
                                    battingTeamName = this.state.teamFirstName
                                    battingTeamSquad = this.state.teamFirstSquad
                                    bowlingTeamId = this.state.teamSecondId
                                    bowlingTeamName = this.state.teamSecondName
                                    bowlingTeamSquad = this.state.teamSecondSquad
                                } else {
                                    battingTeamId = this.state.teamSecondId
                                    battingTeamName = this.state.teamSecondName
                                    battingTeamSquad = this.state.teamSecondSquad
                                    bowlingTeamId = this.state.teamFirstId
                                    bowlingTeamName = this.state.teamFirstName
                                    bowlingTeamSquad = this.state.teamFirstSquad
                                }
                            } else {
                                if (this.state.selectBatFirst) {
                                    battingTeamId = this.state.teamSecondId
                                    battingTeamName = this.state.teamSecondName
                                    battingTeamSquad = this.state.teamSecondSquad
                                    bowlingTeamId = this.state.teamFirstId
                                    bowlingTeamName = this.state.teamFirstName
                                    bowlingTeamSquad = this.state.teamFirstSquad
                                } else {
                                    battingTeamId = this.state.teamFirstId
                                    battingTeamName = this.state.teamFirstName
                                    battingTeamSquad = this.state.teamFirstSquad
                                    bowlingTeamId = this.state.teamSecondId
                                    bowlingTeamName = this.state.teamSecondName
                                    bowlingTeamSquad = this.state.teamSecondSquad
                                }
                            }
                            let path = "/liveMatchList/" + this.state.firebaseID
                            console.log("path: ", path)

                            database()
                                .ref(path)
                                .update({
                                    tossWonTeamId: this.state.wonTossTeamFirst ?
                                        this.state.teamFirstId : this.state.teamSecondId,
                                    batFirstTeamId: battingTeamId,
                                    isFirstInningCompleted: false,
                                    currentOverRun: [],
                                    currentOverBowl: 0,
                                    currentOverBowlerOver: 0,
                                    teamFirstInning : {
                                        score: 0,
                                        overs: 0,
                                        wickets: 0
                                    },
                                    teamSecondInning : {
                                        score: 0,
                                        overs: 0,
                                        wickets: 0
                                    }
                                })
                                .then(() => console.log('Data updated.'));

                            this.props.navigation.navigate("StartInningScreen", {
                                firebaseID: this.state.firebaseID,
                                battingTeamId: battingTeamId,
                                battingTeamName: battingTeamName,
                                bowlingTeamId: bowlingTeamId,
                                bowlingTeamName: bowlingTeamName,
                                battingTeamSquad: battingTeamSquad,
                                bowlingTeamSquad: bowlingTeamSquad,
                            })
                        }}
                        style={{
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratBold,
                                width: '100%',
                                fontSize: 12,
                                paddingTop: 16,
                                paddingBottom: 16,
                                textAlign: 'center',
                                paddingStart: 20,
                                paddingEnd: 20,
                                borderRadius: 6,
                                backgroundColor: colors.STATUS_BAR_COLOR,
                                color: colors.WHITE
                            }}>{
                            Constants.LET_S_PLAY
                        }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default TossScreen;
