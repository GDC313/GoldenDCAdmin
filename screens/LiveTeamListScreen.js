import React, {Component} from 'react';
import {
    FlatList,
    Image,
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

let obj =
    {
        "&&N1uwbTb3VvvFSoWmt&&0":
            {
                "teamFirstName": "AhmedabadLion"
            },
        "-N2Eayu7-KKquK_uTZkH":
            {
                "teamSecondName": "AMDJoin"
            }
    }

class LiveTeamListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childKeys: this.props.route.params.childKeys,
            value: this.props.route.params.value
        }
    }

    componentDidMount() {
        console.log("childKeys: ", this.state.childKeys)
        console.log("value: ", this.state.value[this.state.childKeys[0]])
        // console.log("obj: ",obj)
        // let vau = "&&N1uwbTb3VvvFSoWmt&&0"
        // let data = JSON.parse(JSON.stringify(obj))
        // console.log("value[\"N1uwbTb3VvvFSoWmt_0\"]: ",obj[vau])

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
                        }}>{Constants.REMAIN_LIVE_MATCH}</Text>
                </View>
                <View style={{
                    height: 44,
                    backgroundColor: colors.YELLOW_COLOR,
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            alignSelf: 'center',
                            marginEnd: 15,
                            padding: 5,
                        }}
                        onPress={async () => {
                            this.props.navigation.navigate("StartMatchScreen1");
                        }}>

                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 15,
                                color: colors.STATUS_BAR_COLOR
                            }}>{Constants.START_NEW_MATCH}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1,
                        marginTop: 10,
                        paddingBottom: 10,
                    }}
                    data={this.state.childKeys}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("TossScreen", {
                                firebaseID: item,
                                teamFirstId: this.state.value[item].teamFirstId,
                                teamFirstName: this.state.value[item].teamFirstName,
                                teamFirstImage: this.state.value[item].teamFirstImage,
                                teamFirstSquad: this.state.value[item].teamFirstSquad,
                                teamSecondId: this.state.value[item].teamSecondId,
                                teamSecondName: this.state.value[item].teamSecondName,
                                teamSecondSquad: this.state.value[item].teamSecondSquad,
                                teamSecondImage: this.state.value[item].teamSecondImage,
                            })
                        }}>
                            <View style={{
                                flexDirection: 'column',
                                paddingBottom: 10,
                                paddingTop: 10,
                                marginStart: 20,
                                marginEnd: 20,
                                borderRadius: 8,
                                marginBottom: 10,
                                borderWidth: 1,
                                borderColor: 'rgba(2,79,39,0.1)'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingStart: 15,
                                }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            alignSelf: 'center',
                                            textAlign: "center",
                                            fontFamily: fontStyle.AvenirHeavy,
                                            fontSize: 14,
                                            color: colors.BLUE_COLOR
                                        }}>{
                                        this.state.value[item].teamFirstName
                                    }</Text>
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <View style={{
                                            flexDirection: 'column',
                                            width: 40,
                                            borderRadius: 50,
                                            height: 40,
                                            alignSelf: 'center',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: colors.YELLOW_COLOR
                                        }}>
                                            <Text
                                                style={{
                                                    alignSelf: 'center',
                                                    textAlign: "center",
                                                    fontFamily: fontStyle.MontserratBold,
                                                    fontSize: 15,
                                                    color: colors.STATUS_BAR_COLOR
                                                }}>{
                                                "VS"
                                            }</Text>
                                        </View>
                                    </View>
                                    <Text
                                        style={{
                                            flex: 1,
                                            alignSelf: 'center',
                                            textAlign: "center",
                                            fontFamily: fontStyle.AvenirHeavy,
                                            fontSize: 14,
                                            color: colors.BLUE_COLOR
                                        }}>{
                                        this.state.value[item].teamSecondName
                                    }</Text>

                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: fontStyle.AvenirHeavy,
                                            fontSize: 14,
                                            color: colors.BLUE_COLOR
                                        }}>{
                                        Constants.GROUND_NAME + ": "
                                    }</Text>
                                    <Text
                                        style={{
                                            fontFamily: fontStyle.AvenirLight,
                                            fontSize: 14,
                                            color: colors.BLUE_COLOR
                                        }}>{
                                        this.state.value[item].groundName
                                    }</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: fontStyle.AvenirHeavy,
                                            fontSize: 14,
                                            color: colors.BLUE_COLOR
                                        }}>{
                                        Constants.CITY + ": "
                                    }</Text>
                                    <Text
                                        style={{
                                            fontFamily: fontStyle.AvenirLight,
                                            fontSize: 14,
                                            color: colors.BLUE_COLOR
                                        }}>{
                                        this.state.value[item].city
                                    }</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: fontStyle.AvenirHeavy,
                                            fontSize: 14,
                                            color: colors.BLUE_COLOR
                                        }}>{
                                        Constants.DATE_TIME + ": "
                                    }</Text>
                                    <Text
                                        style={{
                                            fontFamily: fontStyle.AvenirLight,
                                            fontSize: 14,
                                            color: colors.BLUE_COLOR
                                        }}>{
                                        this.state.value[item].dateTime
                                    }</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                    )}
                />

            </View>
        );
    }
}

export default LiveTeamListScreen;
