import React, {Component} from 'react';
import {
    ActivityIndicator,
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
import AsyncStorage from "@react-native-community/async-storage";

class MyTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamList: [],
            isLoading: true,
            isTeamFirstSelect: this.props.route.params.isTeamFirstSelect,
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => this.getTeamList())
        this.getTeamList()
    }

    getTeamList() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://www.goldendc.demourl.ca/api/team_list", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result !== undefined && result !== null) {
                    // console.log("result: ", result)
                    let resultData = JSON.parse(result)
                    if (resultData.data !== undefined &&
                        resultData.data !== null &&
                        resultData.data.length > 0) {
                        // console.log("resultData: ", resultData.data)
                        let data = resultData.data.filter((item) =>
                            item.city !== undefined &&
                            item.city !== null &&
                            item.city !== ""
                        )
                        data = data.filter((item) =>
                            item.name !== undefined &&
                            item.name !== null &&
                            item.name !== ""
                        )
                        this.setState({
                            teamList: data,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            teamList: [],
                            isLoading: false
                        })
                    }
                } else {
                    this.setState({
                        teamList: [],
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
                        }}>{Constants.MY_TEAMS}
                    </Text>
                </View>
                <View style={{
                    width:'100%',
                    backgroundColor:colors.WHITE

                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("AddTeamScreen", {
                                isTeamFirstSelect: this.state.isTeamFirstSelect,
                            });
                        }}
                        style={{
                            backgroundColor:colors.WHITE,
                            width:"40%",
                            alignSelf:'flex-end'
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: 'flex-end',
                                marginTop: 10,
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 12,
                                paddingTop: 8,
                                paddingBottom: 8,
                                paddingStart: 20,
                                paddingEnd: 20,
                                borderRadius: 5,
                                marginEnd: 10,
                                backgroundColor: colors.STATUS_BAR_COLOR,
                                color: colors.WHITE
                            }}>{
                            Constants.ADD_NEW_TEAM
                        }</Text>
                    </TouchableOpacity>
                    {(
                        this.state.isLoading &&
                        <ActivityIndicator
                            size="large"
                            color={colors.PRIMARY_COLOR}
                            style={{
                                flex: 1,
                                alignSelf: 'center',
                            }}
                            animating={true}
                        />
                    )}

                </View>

                {(
                    !this.state.isLoading && this.state.teamList.length <= 0 &&
                    <View style={{
                        alignSelf: 'center',
                        flex: 1,
                        backgroundColor:colors.WHITE,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratMedium,
                                fontSize: 20,
                                color: colors.STATUS_BAR_COLOR
                            }}>{Constants.NO_TEAM}</Text>
                    </View>

                )}
                {(
                    !this.state.isLoading && this.state.teamList.length > 0 &&
                    <FlatList
                        contentContainerStyle={{
                            flexGrow: 1,
                            backgroundColor:colors.WHITE,
                            paddingTop: 10,
                            paddingBottom: 10
                        }}
                        data={this.state.teamList}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => {
                                // console.log("item: ",item)

                                AsyncStorage.getItem("teamData")
                                    .then(itemData => {
                                        console.log("item: ", itemData)
                                        if (itemData !== null) {
                                            itemData = JSON.parse(itemData);
                                            if (itemData.teamId === item.id) {
                                                alert("This team already selected")
                                            } else {
                                                this.props.navigation.navigate("TeamListScreen", {
                                                    teamId: item.id,
                                                    teamName: item.name,
                                                    city: item.city,
                                                    logo: item.logo,
                                                    isTeamFirstSelect: this.state.isTeamFirstSelect,
                                                    isNewAddPlayer: false
                                                });
                                            }
                                        } else {
                                            this.props.navigation.navigate("TeamListScreen", {
                                                teamId: item.id,
                                                teamName: item.name,
                                                city: item.city,
                                                logo: item.logo,
                                                isTeamFirstSelect: this.state.isTeamFirstSelect,
                                                isNewAddPlayer: false
                                            });
                                        }
                                    });
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
                                    <View
                                        style={{
                                            paddingStart: 15,
                                            flexDirection: 'row'
                                        }}>
                                        {
                                            item.logo !== null && item.logo !== "" ?
                                                <Image
                                                    resizeMode={'cover'}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: 25,
                                                        marginEnd: 10
                                                    }}
                                                    source={{uri: "https://www.goldendc.demourl.ca/public/uploaded/images/" + item.logo}}/>
                                                :
                                                <Image
                                                    resizeMode={'cover'}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: 25,
                                                        marginEnd: 10
                                                    }}
                                                    source={require('../assets/images/ic_top_logo.png')}/>
                                        }

                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily: fontStyle.MontserratBold,
                                                    fontSize: 16,
                                                    color: colors.BLACK
                                                }}>{
                                                item.name
                                            }</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: 5
                                            }}>
                                                <Text
                                                    style={{
                                                        fontFamily: fontStyle.MontserratBold,
                                                        fontSize: 16,
                                                        color: colors.BLACK
                                                    }}>{
                                                    "City: "
                                                }</Text>
                                                <Text
                                                    style={{
                                                        fontFamily: fontStyle.MontserratRegular,
                                                        fontSize: 16,
                                                        color: colors.BLACK
                                                    }}>{
                                                    item.city
                                                }</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}/>
                )}

            </View>
        );
    }
}

export default MyTeams;
