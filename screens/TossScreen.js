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

class TossScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamFirstName: this.props.route.params.teamFirstName,
            teamFirstImage: this.props.route.params.teamFirstImage,
            teamFirstSquad: this.props.route.params.teamFirstSquad,
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
                backgroundColor: '#ffffff',
            }}>
                <SafeAreaView/>
                <StatusBar translucent backgroundColor={colors.STATUS_BAR_COLOR}/>

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
                        marginTop: 20,
                        alignSelf: 'center',
                        color: colors.STATUS_BAR_COLOR
                    }}>{Constants.WHO_WON_TOSS}</Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 23,
                    marginEnd: 18,
                    marginStart: 18,
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
                        marginTop: 20,
                        alignSelf: 'center',
                        color: colors.STATUS_BAR_COLOR
                    }}>{Constants.WINNER_TOSS}</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 23,
                    marginEnd: 18,
                    marginStart: 18,
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
                    marginStart: 20,
                    marginEnd: 20,
                    marginBottom: 8,
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
                            if(this.state.wonTossTeamFirst === null){
                                Alert.alert("","Please select who won the toss")
                                return
                            }
                            if(this.state.selectBatFirst === null){
                                Alert.alert("","Please select batting or bowling")
                                return
                            }
                            let battingTeamName = ""
                            let battingTeamSquad = []
                            let bowlingTeamName = ""
                            let bowlingTeamSquad = []
                            console.log("wonTossTeamFirst: ",this.state.wonTossTeamFirst)
                            console.log("selectBatFirst: ",this.state.selectBatFirst)

                            if(this.state.wonTossTeamFirst){
                                if(this.state.selectBatFirst){
                                    battingTeamName = this.state.teamFirstName
                                    bowlingTeamName = this.state.teamSecondName
                                    battingTeamSquad = this.state.teamFirstSquad
                                    bowlingTeamSquad = this.state.teamSecondSquad
                                }else{
                                    battingTeamName = this.state.teamSecondName
                                    bowlingTeamName = this.state.teamFirstName
                                    battingTeamSquad = this.state.teamSecondSquad
                                    bowlingTeamSquad = this.state.teamFirstSquad
                                }
                            }else{
                                if(this.state.selectBatFirst){
                                    battingTeamName = this.state.teamSecondName
                                    bowlingTeamName = this.state.teamFirstName
                                    battingTeamSquad = this.state.teamSecondSquad
                                    bowlingTeamSquad = this.state.teamFirstSquad
                                }else{
                                    battingTeamName = this.state.teamFirstName
                                    bowlingTeamName = this.state.teamSecondName
                                    battingTeamSquad = this.state.teamFirstSquad
                                    bowlingTeamSquad = this.state.teamSecondSquad
                                }
                            }
                            this.props.navigation.navigate("StartInningScreen",{
                                battingTeamName:battingTeamName,
                                bowlingTeamName:bowlingTeamName,
                                battingTeamSquad:battingTeamSquad,
                                bowlingTeamSquad:bowlingTeamSquad,
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