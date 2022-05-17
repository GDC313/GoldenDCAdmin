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

class LiveMatchScoreUpdateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            battingTeamName: this.props.route.params.battingTeamName,
            bowlingTeamName: this.props.route.params.bowlingTeamName,
            battingTeamSquadMain: this.props.route.params.battingTeamSquadMain,
            battingTeamSquad: this.props.route.params.battingTeamSquad,
            bowlingTeamSquad: this.props.route.params.bowlingTeamSquad,
            strikerName: this.props.route.params.strikerName,
            isStrikerSelection: false,
            nonStrikerName: this.props.route.params.nonStrikerName,
            isNonStrikerSelection: false,
            bowlerName: this.props.route.params.bowlerName,
            selectStriker: null,
            selectNonStriker: null,
            selectBowler: null,
            isSelectBattingModel: false,
            isSelectBowlingModel: false,
            isSelectBowlingStyleModel: false,
            isSelectBowlingStyleRightArmFast: false,
            isSelectBowlingStyleRightArmMedium: false,
            isSelectBowlingStyleLeftArmFast: false,
            isSelectBowlingStyleLeftArmMedium: false,
            isSelectBowlingStyleSlowLeftArmOrthodox: false,
            isSelectBowlingStyleSlowLeftArmChinaman: false,
            isSelectBowlingStyleRightArmOffBreak: false,
            isSelectBowlingStyleRightArmLrgBreak: false,
            batsman1Runs: 0,
            batsman1Bowls: 0,
            batsman2Runs: 0,
            batsman2Bowls: 0,
            runs: 0,
            wickets: 0,
            totalOvers: 20,
            overs: 1,
            bowlCount: 0,
            currentOverRun: [],
            currentOverBowl: 0,
        }
    }

    undoRun(isBatsman1) {
        let list = this.state.currentOverRun
        let lastRun = list[list.length - 1]
        let run = this.state.runs

        list = list.filter((_, i) => i !== list.length - 1)

        let batsman1Runs = this.state.batsman1Runs
        let batsman1Bowls = this.state.batsman1Bowls
        let batsman2Runs = this.state.batsman2Runs
        let batsman2Bowls = this.state.batsman2Bowls
        let currentOverBowl = this.state.currentOverBowl

        this.setState({
            runs: (run - lastRun) <= 0 ? 0 : (run - lastRun),
            currentOverRun: list,
            batsman1Runs: isBatsman1 ? (batsman1Runs - lastRun) <= 0 ? 0 : (batsman1Runs - lastRun) : batsman1Runs,
            batsman2Runs: !isBatsman1 ? (batsman2Runs - lastRun) <= 0 ? 0 : (batsman2Runs - lastRun) : batsman2Runs,
            batsman1Bowls: isBatsman1 ? (batsman1Bowls - 1) : batsman1Bowls,
            batsman2Bowls: !isBatsman1 ? (batsman2Bowls - 1) : batsman2Bowls,
            currentOverBowl: currentOverBowl - 1,
        })

    }

    updateRun(run, bowl, isBatsman1, isWideOrNoBall) {
        let list = this.state.currentOverRun
        let lastRuns = this.state.runs

        if (!isWideOrNoBall) {
            list.push(run)
            let batsman1Runs = this.state.batsman1Runs
            let batsman1Bowls = this.state.batsman1Bowls
            let batsman2Runs = this.state.batsman2Runs
            let batsman2Bowls = this.state.batsman2Bowls
            let currentOverBowl = this.state.currentOverBowl
            this.setState({
                runs: lastRuns + run,
                batsman1Runs: isBatsman1 ? batsman1Runs + run : batsman1Runs,
                batsman2Runs: !isBatsman1 ? batsman2Runs + run : batsman2Runs,
                batsman1Bowls: isBatsman1 ? batsman1Bowls + 1 : batsman1Bowls,
                batsman2Bowls: !isBatsman1 ? batsman2Bowls + 1 : batsman2Bowls,
                currentOverRun: list,
                currentOverBowl: currentOverBowl + 1
            }, () => {
                if (this.state.currentOverBowl === 6) {
                    Alert.alert("", "Over completed",
                        [
                            { text: "Select bowler", onPress: () => {
                                    this.setState({
                                        isSelectBowlingModel: true
                                    })
                                }
                            }
                        ]
                    )
                }
            })
        } else {
            list.push("WD\n" + run)
            this.setState({
                runs: lastRuns + run,
                currentOverRun: list
            })
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
                        }}>{Constants.LIVE_MATCH}</Text>
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

                                    let list = this.state.battingTeamSquad
                                    if (this.state.isStrikerSelection) {
                                        list.filter((item) => {
                                            item.isStriker = false
                                        })
                                        list[index].isStriker = !list[index].isStriker
                                        this.setState({
                                            battingTeamSquad: list,
                                            strikerName: list[index].playerName,
                                            isSelectBattingModel: false
                                        })
                                    } else {
                                        list.filter((item) => {
                                            item.isNonStriker = false
                                        })
                                        list[index].isNonStriker = !list[index].isNonStriker
                                        this.setState({
                                            battingTeamSquad: list,
                                            nonStrikerName: list[index].playerName,
                                            isSelectBattingModel: false
                                        })
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
                                            }}>{item.playerName}</Text>
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
                                    let list = this.state.bowlingTeamSquad
                                    list.filter((item) => {
                                        item.isBowler = false
                                    })
                                    list[index].isBowler = !list[index].isBowler
                                    this.setState({
                                        bowlingTeamSquad: list,
                                        bowlerName: list[index].playerName,
                                        isSelectBowlingModel: false,
                                        isSelectBowlingStyleModel: true
                                    })
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
                                            }}>{item.playerName}</Text>
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
                                        this.setState({
                                            isSelectBowlingStyleModel: false
                                        })


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
                        marginTop: 20,
                        alignSelf: 'center',
                        color: colors.STATUS_BAR_COLOR
                    }}>{this.state.battingTeamName}</Text>

                <Text
                    style={{
                        fontFamily: fontStyle.MontserratRegular,
                        fontSize: 16,
                        marginTop: 20,
                        alignSelf: 'center',
                        color: colors.STATUS_BAR_COLOR
                    }}>{this.state.runs + "/" + this.state.wickets + " (" + this.state.totalOvers + ")"}</Text>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 20,
                }}>
                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratMedium,
                                fontSize: 16,
                                alignSelf: 'center',
                                color: colors.STATUS_BAR_COLOR
                            }}>{this.state.strikerName}</Text>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 16,
                                alignSelf: 'center',
                                color: colors.STATUS_BAR_COLOR
                            }}>{this.state.batsman1Runs + " (" + this.state.batsman1Bowls + ")"}</Text>
                    </View>

                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratMedium,
                                fontSize: 16,
                                alignSelf: 'center',
                                color: colors.STATUS_BAR_COLOR
                            }}>{this.state.nonStrikerName}</Text>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 16,
                                alignSelf: 'center',
                                color: colors.STATUS_BAR_COLOR
                            }}>{this.state.batsman2Runs + " (" + this.state.batsman2Bowls + ")"}</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            flex: 1,
                            fontFamily: fontStyle.MontserratMedium,
                            fontSize: 16,
                            alignSelf: 'center',
                            color: colors.STATUS_BAR_COLOR
                        }}>{this.state.bowlerName}</Text>

                    <Text
                        style={{
                            textAlign: 'center',
                            flex: 1,
                            fontFamily: fontStyle.MontserratRegular,
                            fontSize: 16,
                            alignSelf: 'center',
                            color: colors.STATUS_BAR_COLOR
                        }}>{"0." + this.state.currentOverBowl + " - 0 - 0 - 0"}</Text>
                </View>
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{
                            height: 60,
                        }}
                        contentContainerStyle={{
                            width: '100%',
                            height: 40,
                            marginTop: 16,
                            marginStart: 20,
                            backgroundColor: colors.WHITE,
                        }}
                        data={this.state.currentOverRun}
                        renderItem={({item, index}) => (
                            <View style={{
                                width: "16%",
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    width: 40,
                                    borderRadius: 50,
                                    height: 40,
                                    justifyContent: 'center',
                                    backgroundColor: '#76B04315'
                                }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: fontStyle.MontserratMedium,
                                            fontSize: 14,
                                            alignSelf: 'center',
                                            color: colors.STATUS_BAR_COLOR
                                        }}>{item}</Text>
                                </View>
                            </View>
                        )}/>
                </View>


                <View>
                    <View style={{
                        flexDirection: 'row',
                        width: "90%",
                        marginTop: 20,
                        alignSelf: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(0, 1, true, false)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(1, 1, true, false)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{1}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(2, 1, true, false)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{2}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(3, 1, true, false)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{3}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: "90%",
                        alignSelf: 'center'
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(4, 1, true, false)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{4}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(6, 1, true, false)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{6}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(5, 1, true, false)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{5}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(7, 1, true, false)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{7}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: "90%",
                        alignSelf: 'center'
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(1, 1, true, true)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"WD"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(1, 1, true, true)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"NB"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // this.updateRun(1,1,true,true)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"B"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // this.updateRun(1,1,true,true)
                            }}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.STATUS_BAR_COLOR,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"LB"}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.currentOverRun.length > 0) {
                                this.undoRun(true)
                            }
                            // this.updateRun(1,1,true,true)
                        }}
                        style={{
                            paddingTop: 10,
                            paddingStart: 20,
                            paddingEnd: 20,
                            paddingBottom: 10,
                            marginTop: 10,
                            alignSelf: 'center',
                            borderWidth: 1,
                            borderColor: colors.STATUS_BAR_COLOR,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: fontStyle.MontserratMedium,
                                fontSize: 16,
                                color: colors.STATUS_BAR_COLOR
                            }}>{"Undo"}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default LiveMatchScoreUpdateScreen;
