import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
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


class TeamListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: this.props.route.params.teamName,
            teamId: this.props.route.params.teamId,
            city: this.props.route.params.city,
            playerName: this.props.route.params.playerName,
            phoneNumber: this.props.route.params.phoneNumber,
            filePath: this.props.route.params.filePath,
            isNewAddPlayer: this.props.route.params.isNewAddPlayer,
            isLoading: true,
            playerList: [],
            data: [
                {
                    playerName: "Madhevere",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "T Marumani",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Chakabva",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Dion Myers",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Craig Ervine",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Milton Shumba",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Ryan Burl",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "W Masakadza",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Luke Jongwe",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Ryan Burl",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "W Masakadza",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Luke Jongwe",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Ryan Burl",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "W Masakadza",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                },
                {
                    playerName: "Luke Jongwe",
                    isSelected: false,
                    isCaptain: false,
                    isWicketKeeper: false
                }
            ]
        }
    }

    componentDidMount(): void {
        this.getPlayerList()
        if (this.state.isNewAddPlayer) {
            let newPlayer = {
                playerName: this.state.playerName,
                isSelected: false
            }
        }
    }

    getPlayerList() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://www.goldendc.demourl.ca/api/player_list/" + this.state.teamId, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result !== undefined && result !== null) {
                    console.log("result: ", result)
                    let resultData = JSON.parse(result)
                    if (resultData.data !== undefined &&
                        resultData.data !== null &&
                        resultData.data.length > 0) {
                        console.log("resultData: ", resultData.data)

                        let data = resultData.data.filter((item) =>
                            item.name !== undefined &&
                            item.name !== null &&
                            item.name !== ""
                        )
                        this.setState({
                            playerList: data,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            playerList: [],
                            isLoading: false
                        })
                    }
                } else {
                    this.setState({
                        playerList: [],
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                this.setState({
                    teamList: [],
                    isLoading: false
                })
            });
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
                        }}>{this.state.teamName}</Text>
                </View>
                <View style={{
                    height: 44,
                    backgroundColor: colors.YELLOW_COLOR,
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        style={{
                            marginStart: 15,
                            padding: 5,
                            alignSelf: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratMedium,
                                fontSize: 15,
                                color: colors.STATUS_BAR_COLOR
                            }}>{Constants.SELECT_PLAYING_SQUAD}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            alignSelf: 'center',
                            marginEnd: 15,
                            padding: 5,
                        }}
                        onPress={() => {
                            // this.props.navigation.navigate("StartMatchScreen1");
                            this.props.navigation.navigate("AddPlayerScreen", {
                                teamName: this.state.teamName,
                                teamId: this.state.teamId,
                                city: this.state.city
                            });
                        }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 15,
                                color: colors.STATUS_BAR_COLOR
                            }}>{Constants.ADD_PLAYER_CAPS}</Text>
                    </TouchableOpacity>

                </View>
                {(
                    this.state.isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={colors.PRIMARY_COLOR}
                        style={{
                            alignSelf: 'center',
                        }}
                        animating={true}
                    />
                )}

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
                            if (item.isSelected) {
                                list[index].isSelected = !list[index].isSelected
                                list[index].isCaptain = false
                                list[index].isWicketKeeper = false
                                this.setState({playerList: list})
                            } else if (list.filter(item => item.isSelected).length >= 11) {
                                Alert.alert("", "Select only 11 players")
                            } else {
                                list[index].isSelected = !list[index].isSelected
                                list[index].isCaptain = false
                                list[index].isWicketKeeper = false
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
                                                borderRadius: 21,
                                                height: 42,
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
                                    }} source={item.isSelected ? require('../assets/images/ic_tick.png') :
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
                            Constants.NOT_NOW
                        }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let list = this.state.playerList.filter((item) => {
                                return item.isSelected
                            })
                            if (list.length < 2) {
                                Alert.alert("", "Please select at least two players")
                                return
                            }
                            this.props.navigation.navigate("SelectCaptainWicketKeeperScreen", {
                                teamName: this.state.teamName,
                                playerList: list
                            });
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
                            Constants.NEXT
                        }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default TeamListScreen;