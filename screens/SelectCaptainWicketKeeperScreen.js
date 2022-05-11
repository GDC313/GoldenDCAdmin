import React, {Component} from 'react';
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../styles/Constants";


class SelectCaptainWicketKeeperScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: this.props.route.params.teamName,
            logo: this.props.route.params.logo,
            isTeamFirstSelect: this.props.route.params.isTeamFirstSelect,
            playerList: this.props.route.params.playerList,
            isCaptainShow: true
        }
    }

    componentDidMount() {
        console.log("playerList: ", this.state.playerList.length)
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                }}>
                <SafeAreaView/>
                <StatusBar translucent backgroundColor={colors.STATUS_BAR_COLOR}/>

                <View
                    style={{
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
                                width: 20,
                                height: 18,
                                alignSelf: 'center',
                                marginStart: 15
                            }} source={require('../assets/images/ic_back.png')}/>
                    </TouchableOpacity>

                    <Text
                        style={{
                            fontFamily: fontStyle.MontserratBold,
                            fontSize: 20,
                            color: colors.WHITE
                        }}>{this.state.teamName}</Text>
                </View>
                <View
                    style={{
                        height: 44,
                        backgroundColor: colors.YELLOW_COLOR,
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isCaptainShow: true
                            })
                        }}
                        style={{
                            marginStart: 15,
                            paddingBottom: 8,
                            paddingStart: 5,
                            paddingEnd: 5,
                            paddingTop: 8,
                            borderBottomWidth: 3,
                            borderColor: this.state.isCaptainShow ? colors.STATUS_BAR_COLOR : colors.YELLOW_COLOR,
                            alignSelf: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 15,
                                color: colors.STATUS_BAR_COLOR
                            }}>{Constants.CAPTAIN_CAPS}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isCaptainShow: false
                            })
                        }}
                        style={{
                            alignSelf: 'center',
                            marginEnd: 15,
                            borderBottomWidth: 3,
                            borderColor: !this.state.isCaptainShow ? colors.STATUS_BAR_COLOR : colors.YELLOW_COLOR,
                            paddingBottom: 8,
                            paddingStart: 5,
                            paddingEnd: 5,
                            paddingTop: 8,
                        }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 15,
                                color: colors.STATUS_BAR_COLOR
                            }}>{Constants.WICKET_KEEPER_CAPS}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1,
                        marginTop: 10,
                        paddingBottom: 10,
                    }}
                    data={this.state.playerList}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => {
                            let list = this.state.playerList
                            if (this.state.isCaptainShow) {
                                list.filter((item) => {
                                    item.isCaptain = false
                                })
                                list[index].isCaptain = !list[index].isCaptain
                                this.setState({playerList: list})
                            } else {
                                list.filter((item) => {
                                    item.isWicketKeeper = false
                                })
                                list[index].isWicketKeeper = !list[index].isWicketKeeper
                                this.setState({playerList: list})
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
                                {
                                    item.profile_pic !== null && item.profile_pic !== "" ?
                                        <Image
                                            resizeMode={'cover'}
                                            style={{
                                                width: 42,
                                                height: 42,
                                                borderRadius: 21,
                                                alignSelf: 'center',
                                                marginStart: 15
                                            }}
                                            source={{uri: "https://www.goldendc.demourl.ca/public/uploaded/images/" + item.profile_pic}}
                                        />
                                        :
                                        <Image
                                            resizeMode={'cover'}
                                            style={{
                                                width: 42,
                                                height: 42,
                                                borderRadius: 21,
                                                alignSelf: 'center',
                                                marginStart: 15
                                            }}
                                            source={require('../assets/images/ic_top_logo.png')}
                                        />

                                }
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
                                    }} source={(this.state.isCaptainShow && item.isCaptain) ||
                                (!this.state.isCaptainShow && item.isWicketKeeper)
                                    ? require('../assets/images/ic_tick.png') :
                                    require('../assets/images/ic_untick.png')}/>
                            </View>
                        </TouchableOpacity>
                    )}/>
                <View style={{
                    flexDirection: 'row',
                    marginStart: 20,
                    marginEnd: 20,
                    marginBottom: 8,
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.playerList.filter(item => item.isCaptain) <= 0) {
                                Alert.alert("", "Please select at least one Captain")
                                return
                            }
                            if (this.state.playerList.filter(item => item.isWicketKeeper) <= 0) {
                                Alert.alert("", "Please select at least one Wicket Keeper")
                                return
                            }
                            let jsonData = {
                                teamSquad: this.state.playerList,
                                teamName: this.state.teamName,
                                isTeamFirstSelect: this.state.isTeamFirstSelect,
                                logo: this.state.logo
                            }
                            // to set
                            AsyncStorage.setItem("teamData", JSON.stringify(jsonData));

                            this.props.navigation.pop(3)

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
                            Constants.DONE
                        }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default SelectCaptainWicketKeeperScreen;