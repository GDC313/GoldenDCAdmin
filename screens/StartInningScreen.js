import React, {Component} from 'react';
import {
    Alert,
    FlatList,
    Image,
    ImageBackground, Modal,
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
import database from "@react-native-firebase/database";

class StartInningScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firebaseID: this.props.route.params.firebaseID,
            battingTeamId: this.props.route.params.battingTeamId,
            battingTeamName: this.props.route.params.battingTeamName,
            bowlingTeamId: this.props.route.params.bowlingTeamId,
            bowlingTeamName: this.props.route.params.bowlingTeamName,
            battingTeamSquadMain: this.props.route.params.battingTeamSquad,
            battingTeamSquad: this.props.route.params.battingTeamSquad,
            bowlingTeamSquad: this.props.route.params.bowlingTeamSquad,
            strikerName: 'Select Striker',
            isStrikerSelection: false,
            nonStrikerName: 'Select Non-Striker',
            isNonStrikerSelection: false,
            bowlerName: 'Select Bowler',
            bowlerId: 0,
            selectStriker: null,
            selectNonStriker: null,
            selectBowler: null,
            isSelectBattingModel: false,
            isSelectBowlingModel: false,
            isSelectBowlingStyleModel: false,
            isSelectBowlingStyleName: "",
            isSelectBowlingStyleRightArmFast: false,
            isSelectBowlingStyleRightArmMedium: false,
            isSelectBowlingStyleLeftArmFast: false,
            isSelectBowlingStyleLeftArmMedium: false,
            isSelectBowlingStyleSlowLeftArmOrthodox: false,
            isSelectBowlingStyleSlowLeftArmChinaman: false,
            isSelectBowlingStyleRightArmOffBreak: false,
            isSelectBowlingStyleRightArmLrgBreak: false,
        }
    }

    updateBowlingIndex(list, selectedIndex, isBowlingStyle) {
        let path = "/liveMatchList/" + this.state.firebaseID

        database().ref(path)
            .orderByValue()
            .once('value')
            .then((result) => {
                let resultJson = JSON.parse(JSON.stringify(result))
                let selectedId = 0;
                if (isBowlingStyle) {
                    selectedId = selectedIndex
                } else {
                    selectedId = list[selectedIndex].id
                }
                console.log("selectedId : ",selectedId)
                console.log("resultJson.batFirstTeamId : ",resultJson.batFirstTeamId)
                console.log("resultJson.teamFirstId : ",resultJson.teamFirstId)
                if(resultJson.batFirstTeamId !== resultJson.teamFirstId){
                    let playerIndex = resultJson.teamFirstSquad.findIndex(
                        (item) => item.id === selectedId)
                    console.log("playerIndex 1: ",playerIndex)
                    if (isBowlingStyle) {
                        resultJson.teamFirstSquad[playerIndex].bowlingStyle = this.state.isSelectBowlingStyleName
                    }
                    resultJson.teamFirstSquad.filter((item) => {
                        item.bowlingIndex = 0
                        item.battingIndex = 0
                        item.strikerIndex = 0
                    })
                    resultJson.teamFirstSquad[playerIndex].bowlingIndex = 1
                }else{
                    let playerIndex = resultJson.teamSecondSquad.findIndex(
                        (item) => item.id === selectedId)
                    console.log("playerIndex 1: ",playerIndex)
                    playerIndex = resultJson.teamSecondSquad.findIndex(
                        (item) => item.id === selectedId)
                    if (isBowlingStyle) {
                        resultJson.teamSecondSquad[playerIndex].bowlingStyle = this.state.isSelectBowlingStyleName
                    }
                    resultJson.teamSecondSquad.filter((item) => {
                        item.bowlingIndex = 0
                        item.battingIndex = 0
                        item.strikerIndex = 0
                    })
                    resultJson.teamSecondSquad[playerIndex].bowlingIndex = 1
                }

                database()
                    .ref(path)
                    .update({
                        teamFirstSquad: resultJson.teamFirstSquad,
                        teamSecondSquad: resultJson.teamSecondSquad
                    })
                    .then((result) => console.log('Data updated.', result));
                if (isBowlingStyle) {
                    this.setState({
                        isSelectBowlingStyleModel: false
                    })
                } else {
                    this.setState({
                        bowlingTeamSquad: list,
                        bowlerName: list[selectedIndex].name,
                        bowlerId: list[selectedIndex].id,
                        isSelectBowlingModel: false,
                        isSelectBowlingStyleModel: true
                    })
                }
            });
    }

    updateBattingIndex(list, selectedIndex, isStriker) {
        let position = isStriker ? 1 : 2
        let path = "/liveMatchList/" + this.state.firebaseID
        database().ref(path)
            .orderByValue()
            .once('value')
            .then((result) => {
                let resultJson = JSON.parse(JSON.stringify(result))

                if(resultJson.batFirstTeamId === resultJson.teamFirstId) {
                    let playerIndex = resultJson.teamFirstSquad.findIndex(
                        (item) => item.id === list[selectedIndex].id)
                    resultJson.teamFirstSquad.filter((item) => {
                        if (isStriker && item.battingIndex === 1) {
                            item.battingIndex = 0
                            item.strikerIndex = 0
                        } else if (!isStriker && item.battingIndex === 2) {
                            item.battingIndex = 0
                            item.strikerIndex = 0
                        }
                        item.bowlingIndex = 0
                    })
                    resultJson.teamFirstSquad[playerIndex].battingIndex = position
                    resultJson.teamFirstSquad[playerIndex].strikerIndex = position
                }else{
                    let playerIndex = resultJson.teamSecondSquad.findIndex(
                        (item) => item.id === list[selectedIndex].id)
                    resultJson.teamSecondSquad.filter((item) => {
                        if (isStriker && item.battingIndex === 1) {
                            item.battingIndex = 0
                            item.strikerIndex = 0
                        } else if (!isStriker && item.battingIndex === 2) {
                            item.battingIndex = 0
                            item.strikerIndex = 0
                        }
                        item.bowlingIndex = 0
                    })
                    resultJson.teamSecondSquad[playerIndex].battingIndex = position
                    resultJson.teamSecondSquad[playerIndex].strikerIndex = position
                }
                database()
                    .ref(path)
                    .update({
                        teamFirstSquad: resultJson.teamFirstSquad,
                        teamSecondSquad: resultJson.teamSecondSquad
                    })
                    .then((result) => console.log('Data updated.', result));
                if (isStriker) {
                    this.setState({
                        battingTeamSquad: list,
                        strikerName: list[selectedIndex].name,
                        isSelectBattingModel: false
                    })
                } else {
                    this.setState({
                        battingTeamSquad: list,
                        nonStrikerName: list[selectedIndex].name,
                        isSelectBattingModel: false
                    })
                }
            });
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
                        }}>{Constants.START_INNINGS}</Text>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    style={{
                        alignSelf: 'center',
                    }}
                    visible={this.state.isSelectBattingModel}>
                    <View style={{
                        backgroundColor: colors.WHITE,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 20,
                                marginTop: 10,
                                alignSelf: 'center',
                                color: colors.PRIMARY_COLOR
                            }}>{Constants.SELECT_BASTMAN}</Text>

                        <FlatList
                            contentContainerStyle={{
                                width: '100%',
                                backgroundColor: colors.WHITE,
                                paddingTop: 10,
                            }}
                            data={this.state.battingTeamSquad}
                            renderItem={({item, index}) => (
                                <TouchableOpacity onPress={() => {

                                    let list = JSON.parse(JSON.stringify(this.state.battingTeamSquad))

                                    if (this.state.isStrikerSelection) {
                                        if (list[index].isNonStriker) {
                                            alert("Already selected")
                                            return
                                        }
                                        list.filter((item) => {
                                            item.isStriker = false
                                        })
                                        list[index].isStriker = !list[index].isStriker
                                        this.updateBattingIndex(list, index, true)

                                    } else {
                                        if (list[index].isStriker) {
                                            alert("Already selected")
                                            return
                                        }
                                        list.filter((item) => {
                                            item.isNonStriker = false
                                        })
                                        list[index].isNonStriker = !list[index].isNonStriker
                                        this.updateBattingIndex(list, index, false)

                                    }
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingBottom: 14,
                                        paddingTop: 14,
                                        marginStart: 20,
                                        marginEnd: 20,
                                        borderRadius: 8,
                                        marginBottom: 12,
                                        borderWidth: 1,
                                        backgroundColor: 'rgba(118,176,67,0.1)',
                                        borderColor: 'rgba(2,79,39,0.1)'
                                    }}>
                                        <Image
                                            resizeMode={'cover'}
                                            style={{
                                                width: 42,
                                                height: 42,
                                                alignSelf: 'center',
                                                marginStart: 15
                                            }} source={require('../assets/images/ic_top_logo.png')}/>

                                        <Text
                                            style={{
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                alignSelf: 'center',
                                                marginStart: 10,
                                                flex: 1,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{item.name}</Text>
                                        <Image
                                            resizeMode={'cover'}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                alignSelf: 'center',
                                                marginEnd: 15
                                            }} source={(this.state.isStrikerSelection && item.isStriker) ||
                                        (!this.state.isStrikerSelection && item.isNonStriker)
                                            ? require('../assets/images/ic_tick.png') :
                                            require('../assets/images/ic_untick.png')}/>
                                    </View>
                                </TouchableOpacity>
                            )}/>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    style={{
                        alignSelf: 'center',
                    }}
                    visible={this.state.isSelectBowlingModel}>
                    <View style={{
                        backgroundColor: colors.WHITE,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,

                    }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 20,
                                marginTop: 10,
                                alignSelf: 'center',
                                color: colors.PRIMARY_COLOR
                            }}>{Constants.SELECT_BOWLER}</Text>

                        <FlatList
                            contentContainerStyle={{
                                width: '100%',
                                backgroundColor: colors.WHITE,
                                paddingTop: 10,
                            }}
                            data={this.state.bowlingTeamSquad}
                            renderItem={({item, index}) => (
                                <TouchableOpacity onPress={() => {
                                    // let list = this.state.bowlingTeamSquad
                                    let list = JSON.parse(JSON.stringify(this.state.bowlingTeamSquad))
                                    list.filter((item) => {
                                        item.isBowler = false
                                    })
                                    list[index].isBowler = !list[index].isBowler
                                    this.updateBowlingIndex(list, index, false)
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingBottom: 14,
                                        paddingTop: 14,
                                        marginStart: 20,
                                        marginEnd: 20,
                                        borderRadius: 8,
                                        marginBottom: 12,
                                        borderWidth: 1,
                                        backgroundColor: 'rgba(118,176,67,0.1)',
                                        borderColor: 'rgba(2,79,39,0.1)'
                                    }}>
                                        <Image
                                            resizeMode={'cover'}
                                            style={{
                                                width: 42,
                                                height: 42,
                                                alignSelf: 'center',
                                                marginStart: 15
                                            }} source={require('../assets/images/ic_top_logo.png')}/>

                                        <Text
                                            style={{
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                alignSelf: 'center',
                                                marginStart: 10,
                                                flex: 1,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{item.name}</Text>
                                        <Image
                                            resizeMode={'cover'}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                alignSelf: 'center',
                                                marginEnd: 15
                                            }} source={item.isBowler
                                            ? require('../assets/images/ic_tick.png') :
                                            require('../assets/images/ic_untick.png')}/>
                                    </View>
                                </TouchableOpacity>
                            )}/>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isSelectBowlingStyleModel}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'rgba(15,79,39,0.5)',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }}>

                        <View style={{
                            width: '90%',
                            backgroundColor: colors.WHITE,
                            // paddingTop:10,
                            padding: 21,
                            borderRadius: 15,
                        }}>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 20,
                                    color: colors.STATUS_BAR_COLOR
                                }}>{Constants.BOWLING_STYLE}</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text
                                    style={{
                                        fontFamily: fontStyle.MontserratRegular,
                                        fontSize: 12,
                                        color: colors.STATUS_BAR_COLOR
                                    }}>{Constants.WHAT_BOWLING_STYLE + " "}</Text>
                                <Text
                                    style={{
                                        fontFamily: fontStyle.MontserratBold,
                                        fontSize: 12,
                                        color: colors.STATUS_BAR_COLOR
                                    }}>{this.state.bowlerName + " ?"}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleName: Constants.RIGHT_ARM_FAST,
                                            isSelectBowlingStyleRightArmFast: true,
                                            isSelectBowlingStyleRightArmMedium: false,
                                            isSelectBowlingStyleLeftArmFast: false,
                                            isSelectBowlingStyleLeftArmMedium: false,
                                            isSelectBowlingStyleSlowLeftArmOrthodox: false,
                                            isSelectBowlingStyleSlowLeftArmChinaman: false,
                                            isSelectBowlingStyleRightArmOffBreak: false,
                                            isSelectBowlingStyleRightArmLrgBreak: false,
                                        })
                                    }}>
                                    <View style={{
                                        backgroundColor: '#76B04315',
                                        // flex: 1,
                                        borderWidth: 1,
                                        borderColor: this.state.isSelectBowlingStyleRightArmFast
                                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                                        marginEnd: 16,
                                        borderRadius: 10,
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{Constants.RIGHT_ARM_FAST}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleName: Constants.RIGHT_ARM_MEDIUM,
                                            isSelectBowlingStyleRightArmFast: false,
                                            isSelectBowlingStyleRightArmMedium: true,
                                            isSelectBowlingStyleLeftArmFast: false,
                                            isSelectBowlingStyleLeftArmMedium: false,
                                            isSelectBowlingStyleSlowLeftArmOrthodox: false,
                                            isSelectBowlingStyleSlowLeftArmChinaman: false,
                                            isSelectBowlingStyleRightArmOffBreak: false,
                                            isSelectBowlingStyleRightArmLrgBreak: false,
                                        })
                                    }}>
                                    <View style={{
                                        backgroundColor: '#76B04315',
                                        // flex: 1,
                                        borderWidth: 1,
                                        borderColor: this.state.isSelectBowlingStyleRightArmMedium
                                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                                        marginEnd: 16,
                                        borderRadius: 10,
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{Constants.RIGHT_ARM_MEDIUM}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleName: Constants.RIGHT_ARM_FAST,
                                            isSelectBowlingStyleRightArmFast: false,
                                            isSelectBowlingStyleRightArmMedium: false,
                                            isSelectBowlingStyleLeftArmFast: true,
                                            isSelectBowlingStyleLeftArmMedium: false,
                                            isSelectBowlingStyleSlowLeftArmOrthodox: false,
                                            isSelectBowlingStyleSlowLeftArmChinaman: false,
                                            isSelectBowlingStyleRightArmOffBreak: false,
                                            isSelectBowlingStyleRightArmLrgBreak: false,
                                        })
                                    }}>
                                    <View style={{
                                        backgroundColor: '#76B04315',
                                        //flex: 1,
                                        borderWidth: 1,
                                        borderColor: this.state.isSelectBowlingStyleLeftArmFast
                                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                                        marginEnd: 16,
                                        borderRadius: 10,
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{Constants.LEFT_ARM_FAST}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleName: Constants.LEFT_ARM_FAST,
                                            isSelectBowlingStyleRightArmFast: false,
                                            isSelectBowlingStyleRightArmMedium: false,
                                            isSelectBowlingStyleLeftArmFast: false,
                                            isSelectBowlingStyleLeftArmMedium: true,
                                            isSelectBowlingStyleSlowLeftArmOrthodox: false,
                                            isSelectBowlingStyleSlowLeftArmChinaman: false,
                                            isSelectBowlingStyleRightArmOffBreak: false,
                                            isSelectBowlingStyleRightArmLrgBreak: false,
                                        })
                                    }}>
                                    <View style={{
                                        backgroundColor: '#76B04315',
                                        // flex: 1,
                                        borderWidth: 1,
                                        borderColor: this.state.isSelectBowlingStyleLeftArmMedium
                                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                                        marginEnd: 16,
                                        borderRadius: 10,
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{Constants.LEFT_ARM_MEDIUM}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleName: Constants.SLOW_LEFT_ARM_ORTHOBOX,
                                            isSelectBowlingStyleRightArmFast: false,
                                            isSelectBowlingStyleRightArmMedium: false,
                                            isSelectBowlingStyleLeftArmFast: false,
                                            isSelectBowlingStyleLeftArmMedium: false,
                                            isSelectBowlingStyleSlowLeftArmOrthodox: true,
                                            isSelectBowlingStyleSlowLeftArmChinaman: false,
                                            isSelectBowlingStyleRightArmOffBreak: false,
                                            isSelectBowlingStyleRightArmLrgBreak: false,
                                        })
                                    }}>
                                    <View style={{
                                        backgroundColor: '#76B04315',
                                        // flex: 1,
                                        borderWidth: 1,
                                        borderColor: this.state.isSelectBowlingStyleSlowLeftArmOrthodox
                                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                                        marginEnd: 16,
                                        borderRadius: 10,
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{Constants.SLOW_LEFT_ARM_ORTHOBOX}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleName: Constants.SLOW_LEFT_ARM_CHINA_MAN,
                                            isSelectBowlingStyleRightArmFast: false,
                                            isSelectBowlingStyleRightArmMedium: false,
                                            isSelectBowlingStyleLeftArmFast: false,
                                            isSelectBowlingStyleLeftArmMedium: false,
                                            isSelectBowlingStyleSlowLeftArmOrthodox: false,
                                            isSelectBowlingStyleSlowLeftArmChinaman: true,
                                            isSelectBowlingStyleRightArmOffBreak: false,
                                            isSelectBowlingStyleRightArmLrgBreak: false,
                                        })
                                    }}>
                                    <View style={{
                                        backgroundColor: '#76B04315',
                                        // flex: 1,
                                        borderWidth: 1,
                                        borderColor: this.state.isSelectBowlingStyleSlowLeftArmChinaman
                                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                                        marginEnd: 16,
                                        borderRadius: 10,
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{Constants.SLOW_LEFT_ARM_CHINA_MAN}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleName: Constants.RIGHT_ARM_OFF_BREAK,
                                            isSelectBowlingStyleRightArmFast: false,
                                            isSelectBowlingStyleRightArmMedium: false,
                                            isSelectBowlingStyleLeftArmFast: false,
                                            isSelectBowlingStyleLeftArmMedium: false,
                                            isSelectBowlingStyleSlowLeftArmOrthodox: false,
                                            isSelectBowlingStyleSlowLeftArmChinaman: false,
                                            isSelectBowlingStyleRightArmOffBreak: true,
                                            isSelectBowlingStyleRightArmLrgBreak: false,
                                        })
                                    }}>
                                    <View style={{
                                        backgroundColor: '#76B04315',
                                        // flex: 1,
                                        borderWidth: 1,
                                        borderColor: this.state.isSelectBowlingStyleRightArmOffBreak
                                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                                        marginEnd: 16,
                                        borderRadius: 10,
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{Constants.RIGHT_ARM_OFF_BREAK}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleName: Constants.RIGHT_ARM_LRG_BREAK,
                                            isSelectBowlingStyleRightArmFast: false,
                                            isSelectBowlingStyleRightArmMedium: false,
                                            isSelectBowlingStyleLeftArmFast: false,
                                            isSelectBowlingStyleLeftArmMedium: false,
                                            isSelectBowlingStyleSlowLeftArmOrthodox: false,
                                            isSelectBowlingStyleSlowLeftArmChinaman: false,
                                            isSelectBowlingStyleRightArmOffBreak: false,
                                            isSelectBowlingStyleRightArmLrgBreak: true,
                                        })
                                    }}>
                                    <View style={{
                                        backgroundColor: '#76B04315',
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: this.state.isSelectBowlingStyleRightArmLrgBreak
                                            ? colors.STATUS_BAR_COLOR : '#76B04315',
                                        marginEnd: 16,
                                        borderRadius: 10,
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.STATUS_BAR_COLOR
                                            }}>{Constants.RIGHT_ARM_LRG_BREAK}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16,
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            isSelectBowlingStyleModel: false
                                        })
                                    }}
                                    style={{flex: 1}}>
                                    <View style={{
                                        backgroundColor: colors.PRIMARY_COLOR,
                                        // flex: 1,
                                        borderWidth: 1,
                                        borderColor: colors.PRIMARY_COLOR,
                                        marginEnd: 16,
                                        borderRadius: 6,
                                        height: 48,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.WHITE
                                            }}>{Constants.CANCEL}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isSelectBowlingStyleRightArmFast &&
                                            !this.state.isSelectBowlingStyleRightArmMedium &&
                                            !this.state.isSelectBowlingStyleLeftArmFast &&
                                            !this.state.isSelectBowlingStyleLeftArmMedium &&
                                            !this.state.isSelectBowlingStyleSlowLeftArmOrthodox &&
                                            !this.state.isSelectBowlingStyleSlowLeftArmChinaman &&
                                            !this.state.isSelectBowlingStyleRightArmOffBreak &&
                                            !this.state.isSelectBowlingStyleRightArmLrgBreak) {
                                            Alert.alert("Please select bowling style")
                                            return
                                        }

                                        let list = JSON.parse(JSON.stringify(this.state.bowlingTeamSquad))
                                        this.updateBowlingIndex(list, this.state.bowlerId, true)
                                    }}
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <View style={{
                                        backgroundColor: colors.STATUS_BAR_COLOR,
                                        // flex: 1,
                                        borderWidth: 1,
                                        borderColor: colors.STATUS_BAR_COLOR,
                                        marginEnd: 16,
                                        borderRadius: 6,
                                        height: 48,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: fontStyle.MontserratBold,
                                                fontSize: 12,
                                                color: colors.WHITE
                                            }}>{Constants.OK}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>


                <Text
                    style={{
                        fontFamily: fontStyle.MontserratBold,
                        fontSize: 20,
                        paddingTop: 20,
                        width:'100%',
                        textAlign:'center',
                        backgroundColor:colors.WHITE,
                        alignSelf: 'center',
                        color: colors.STATUS_BAR_COLOR
                    }}>{Constants.BATTING + " - " + this.state.battingTeamName}</Text>
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
                        borderColor: this.state.strikerName !== 'Select Striker' ?
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
                                    isSelectBattingModel: true,
                                    isStrikerSelection: true
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
                                        width: 26,
                                        height: 50,
                                    }} source={require('../assets/images/ic_bat_1.png')}/>
                            </ImageBackground>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: colors.STATUS_BAR_COLOR
                                }}>{this.state.strikerName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: '#76B04315',
                        flex: 1,
                        borderWidth: 1,
                        borderColor: this.state.nonStrikerName !== 'Select Non-Striker'
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
                                    isSelectBattingModel: true,
                                    isStrikerSelection: false
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
                                    }} source={require('../assets/images/ic_bat_2.png')}/>
                            </ImageBackground>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: colors.STATUS_BAR_COLOR
                                }}>{this.state.nonStrikerName}</Text>
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
                        backgroundColor:colors.WHITE,
                        alignSelf: 'center',
                        color: colors.STATUS_BAR_COLOR
                    }}>{Constants.BOWLING + " - " + this.state.bowlingTeamName}</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor:colors.WHITE,
                    paddingTop: 23,
                    paddingEnd: 18,
                    paddingStart: 18,
                }}>
                    <View style={{
                        backgroundColor: '#76B04315',
                        flex: 1,
                        borderWidth: 1,
                        borderColor: this.state.bowlerName !== 'Select Bowler' ?
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
                                    isSelectBowlingModel: true
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
                                        width: 36,
                                        height: 50,
                                    }} source={require('../assets/images/ic_bowl.png')}/>
                            </ImageBackground>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: colors.STATUS_BAR_COLOR
                                }}>{this.state.bowlerName}</Text>
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
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.strikerName === 'Select Striker') {
                                Alert.alert("", "Please select striker")
                                return
                            }
                            if (this.state.nonStrikerName === 'Select Non-Striker') {
                                Alert.alert("", "Please select non striker")
                                return
                            }
                            if (this.state.bowlerName === 'Select Bowler') {
                                Alert.alert("", "Please select bowler")
                                return
                            }
                            console.log("safasdasd")
                            let path = "/liveMatchList/" + this.state.firebaseID

                            database().ref(path)
                                .orderByValue()
                                .once('value')
                                .then((result) => {
                                    let resultJson = JSON.parse(JSON.stringify(result))

                                    let bowlerPlayer = null
                                    let bowlingIndex = resultJson.teamFirstSquad.findIndex(
                                        (item) => item.bowlingIndex === 1)
                                    if (bowlingIndex === -1) {
                                        bowlingIndex = resultJson.teamSecondSquad.findIndex(
                                            (item) => item.bowlingIndex === 1)
                                        bowlerPlayer = resultJson.teamSecondSquad[bowlingIndex]
                                    } else {
                                        bowlerPlayer = resultJson.teamFirstSquad[bowlingIndex]
                                    }


                                    let strikerPlayer = null
                                    let strikerIndex = resultJson.teamFirstSquad.findIndex(
                                        (item) => item.strikerIndex === 1)
                                    if (strikerIndex === -1) {
                                        strikerIndex = resultJson.teamSecondSquad.findIndex(
                                            (item) => item.strikerIndex === 1)
                                        strikerPlayer = resultJson.teamSecondSquad[strikerIndex]
                                    } else {
                                        strikerPlayer = resultJson.teamFirstSquad[strikerIndex]
                                    }
                                    console.log("123456")
                                    let nonStrikerPlayer = null
                                    let nonStrikerIndex = resultJson.teamFirstSquad.findIndex(
                                        (item) => item.strikerIndex === 2)
                                    if (nonStrikerIndex === -1) {
                                        nonStrikerIndex = resultJson.teamSecondSquad.findIndex(
                                            (item) => item.strikerIndex === 2)
                                        nonStrikerPlayer = resultJson.teamSecondSquad[nonStrikerIndex]
                                    } else {
                                        nonStrikerPlayer = resultJson.teamFirstSquad[nonStrikerIndex]
                                    }
                                    console.log("frteg")
                                    this.props.navigation.navigate("LiveMatchScoreUpdateScreen", {
                                        firebaseID: this.state.firebaseID,
                                        battingTeamId: this.state.battingTeamId,
                                        battingTeamName: this.state.battingTeamName,
                                        bowlingTeamId: this.state.bowlingTeamId,
                                        bowlingTeamName: this.state.bowlingTeamName,
                                        battingTeamSquadMain: this.state.battingTeamSquad,
                                        battingTeamSquad: this.state.battingTeamSquad,
                                        bowlingTeamSquad: this.state.bowlingTeamSquad,
                                        strikerName: strikerPlayer.name,
                                        strikerId: strikerPlayer.id,
                                        nonStrikerName: nonStrikerPlayer.name,
                                        nonStrikerId: nonStrikerPlayer.id,
                                        bowlerName: bowlerPlayer.name,
                                        bowlerId: bowlerPlayer.id,
                                    })
                                })
                                .catch((error)=>{
                                    console.log("Catch Error: ",error)
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
                            Constants.START_SCORING
                        }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default StartInningScreen;
