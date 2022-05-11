import React, {Component} from 'react';
import {
    Alert,
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView, ScrollView,
    StatusBar,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../styles/Constants";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

let mThis;

class StartMatchScreen1 extends Component {
    constructor(props) {
        super(props);
        mThis = this;
        this.state = {
            teamFirstName: Constants.SELECT_TEAM_SMALL,
            teamFirstImage: null,
            teamFirstSquad: [],
            teamSecondName: Constants.SELECT_TEAM_SMALL,
            teamSecondSquad: [],
            teamSecondImage: null,
            isTeamFirstSelect: null,
            isTeamSelectionCompleted: false,
            noOfOvers: "",
            overPerBowler: "",
            city: "",
            groundName: "",
            dateTime: "Date & Time",
            dateTimePicker: new Date(),
            show: false,
            isDatePickerVisible: false,
            mode: 'date'
        }
    }


    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // to get
            AsyncStorage.getItem("teamData")
                .then(item => {
                    if (item !== null) {
                        item = JSON.parse(item);
                        console.log("item: ", item)
                        if (this.state.isTeamFirstSelect !== null) {
                            if (this.state.isTeamFirstSelect) {
                                this.setState({
                                    teamFirstName: item.teamName,
                                    teamFirstImage: item.logo === null ? "" : item.logo,
                                    teamFirstSquad: item.teamSquad,
                                    isTeamFirstSelect: null
                                })
                            } else {
                                this.setState({
                                    teamSecondName: item.teamName,
                                    teamSecondImage: item.logo === null ? "" : item.logo,
                                    teamSecondSquad: item.teamSquad,
                                    isTeamFirstSelect: null
                                })
                            }
                        }
                    }
                    if (this.state.teamFirstSquad.length > 0 && this.state.teamSecondSquad.length > 0) {
                        this.setState({
                            isTeamSelectionCompleted: true
                        });
                    }
                })
                .done();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({
            dateTimePicker: currentDate,
        })
    };

    showMode() {
        this.setState({
            isDatePickerVisible: true
        })
    };

    handleNoOfOvers = (text) => {
        this.setState({noOfOvers: text})
    }
    handleOverPerBowler = (text) => {
        this.setState({overPerBowler: text})
    }
    handleCity = (text) => {
        this.setState({city: text})
    }
    handleGroundName = (text) => {
        this.setState({groundName: text})
    }


    selectTeamView() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffffff',
            }}>
                <View style={{
                    alignSelf: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            this.setState({
                                isTeamFirstSelect: true
                            })
                            this.props.navigation.navigate("MyTeams", {
                                isTeamFirstSelect: true
                            });
                        }}>

                        {
                            this.state.teamFirstImage !== null ?
                                this.state.teamFirstImage !== "" ?
                                    <Image
                                        resizeMode={'cover'}
                                        style={{
                                            width: 85,
                                            height: 85,
                                            borderRadius: 42,
                                            marginEnd: 10
                                        }}
                                        source={{uri: "https://www.goldendc.demourl.ca/public/uploaded/images/" + this.state.teamFirstImage}}/>
                                    :
                                    <Image
                                        resizeMode={'cover'}
                                        style={{
                                            width: 85,
                                            height: 85,
                                            borderRadius: 42,
                                            marginEnd: 10
                                        }}
                                        source={require('../assets/images/ic_top_logo.png')}/>
                                :
                                <ImageBackground
                                    resizeMode={'cover'}
                                    style={{
                                        width: 85,
                                        height: 85,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }} source={require('../assets/images/ic_rond_gradiant.png')}>
                                    <Image
                                        resizeMode={'cover'}
                                        style={{
                                            width: 33,
                                            height: 33,
                                        }} source={require('../assets/images/ic_add.png')}/>
                                </ImageBackground>
                        }

                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratMedium,
                                fontSize: 18,
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


                    <View style={{
                        flexDirection: 'column',
                        width: 85,
                        borderRadius: 50,
                        marginTop: 40,
                        marginBottom: 40,
                        height: 85,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#76B04315'
                    }}>
                        <Text
                            style={{
                                alignSelf: 'center',
                                textAlign: "center",
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 22,
                                color: colors.STATUS_BAR_COLOR
                            }}>{
                            "VS"
                        }</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            this.setState({
                                isTeamFirstSelect: false
                            })

                            this.props.navigation.navigate("MyTeams", {
                                isTeamFirstSelect: false
                            });
                        }}>
                        {
                            this.state.teamSecondImage !== null ?
                                this.state.teamSecondImage !== "" ?
                                    <Image
                                        resizeMode={'cover'}
                                        style={{
                                            width: 85,
                                            height: 85,
                                            borderRadius: 42,
                                            marginEnd: 10
                                        }}
                                        source={{uri: "https://www.goldendc.demourl.ca/public/uploaded/images/" + this.state.teamSecondImage}}/>
                                    :
                                    <Image
                                        resizeMode={'cover'}
                                        style={{
                                            width: 85,
                                            height: 85,
                                            borderRadius: 42,
                                            marginEnd: 10
                                        }}
                                        source={require('../assets/images/ic_top_logo.png')}/>
                                :
                                <ImageBackground
                                    resizeMode={'cover'}
                                    style={{
                                        width: 85,
                                        height: 85,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }} source={require('../assets/images/ic_rond_gradiant.png')}>
                                    <Image
                                        resizeMode={'cover'}
                                        style={{
                                            width: 33,
                                            height: 33,
                                        }} source={require('../assets/images/ic_add.png')}/>
                                </ImageBackground>
                        }
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratMedium,
                                fontSize: 18,
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
        );
    }

    teamSelectionCompleteView() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffffff',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 18,
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <ImageBackground
                            resizeMode={'cover'}
                            style={{
                                width: 45,
                                height: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} source={require('../assets/images/ic_rond_gradiant.png')}>
                            <Image
                                resizeMode={'cover'}
                                style={{
                                    width: 25,
                                    height: 25,
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
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 12,
                                marginTop: 2,
                                color: colors.STATUS_BAR_COLOR
                            }}>{Constants.SQUAD_11 + "(" + this.state.teamFirstSquad.length + ")"}</Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'column',
                        width: 45,
                        borderRadius: 50,
                        height: 45,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#76B04315'
                    }}>
                        <Text
                            style={{
                                alignSelf: 'center',
                                textAlign: "center",
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 14,
                                color: colors.STATUS_BAR_COLOR
                            }}>{
                            "VS"
                        }</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <ImageBackground
                            resizeMode={'cover'}
                            style={{
                                width: 45,
                                height: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} source={require('../assets/images/ic_rond_gradiant.png')}>
                            <Image
                                resizeMode={'cover'}
                                style={{
                                    width: 25,
                                    height: 25,
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
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 12,
                                marginTop: 2,
                                color: colors.STATUS_BAR_COLOR
                            }}>{Constants.SQUAD_11 + "(" + this.state.teamSecondSquad.length + ")"}</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={{
                        flex: 1,
                    }}>
                        <TextInput
                            style={{
                                marginTop: 20,
                                marginEnd: 20,
                                marginStart: 20,
                                height: 50,
                                borderColor: '#76B04315',
                                borderWidth: 1,
                                paddingStart: 10,
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 14,
                            }}
                            returnKeyType={"next"}
                            underlineColorAndroid="transparent"
                            placeholder={Constants.NO_OF_OVERS}
                            placeholderTextColor={colors.TXT_HINT_COLOR}
                            autoCapitalize="none"
                            keyboardType={"number-pad"}
                            onChangeText={this.handleNoOfOvers}
                        />
                        <TextInput
                            style={{
                                marginEnd: 20,
                                marginStart: 20,
                                marginTop: 20,
                                height: 50,
                                borderColor: '#76B04315',
                                borderWidth: 1,
                                paddingStart: 10,
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 14,

                            }}
                            underlineColorAndroid="transparent"
                            placeholder={Constants.OVER_PER_BOWLER}
                            placeholderTextColor={colors.TXT_HINT_COLOR}
                            autoCapitalize="none"
                            keyboardType={"number-pad"}
                            onChangeText={this.handleOverPerBowler}
                        />
                        <TextInput
                            style={{
                                marginEnd: 20,
                                marginStart: 20,
                                marginTop: 20,
                                height: 50,
                                borderColor: '#76B04315',
                                borderWidth: 1,
                                paddingStart: 10,
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 14,
                            }}
                            underlineColorAndroid="transparent"
                            placeholder={Constants.CITY}
                            placeholderTextColor={colors.TXT_HINT_COLOR}
                            autoCapitalize="none"
                            onChangeText={this.handleCity}
                        />
                        <TextInput
                            style={{
                                marginEnd: 20,
                                marginStart: 20,
                                marginTop: 20,
                                height: 50,
                                borderColor: '#76B04315',
                                borderWidth: 1,
                                paddingStart: 10,
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 14,
                            }}
                            underlineColorAndroid="transparent"
                            placeholder={Constants.GROUND_NAME}
                            placeholderTextColor={colors.TXT_HINT_COLOR}
                            autoCapitalize="none"
                            onChangeText={this.handleGroundName}
                        />
                        <TouchableOpacity onPress={() => {
                            this.showMode()
                        }}>
                            <Text
                                style={{
                                    marginEnd: 20,
                                    marginStart: 20,
                                    marginTop: 20,
                                    height: 50,
                                    paddingTop: 13,
                                    borderColor: '#76B04315',
                                    borderWidth: 1,
                                    paddingStart: 10,
                                    fontFamily: fontStyle.MontserratRegular,
                                    fontSize: 14,
                                }}
                            >{this.state.dateTime}</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
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
                            Constants.SCHEDULE_MATCH
                        }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let noOfOvers = this.state.noOfOvers
                            let overPerBowler = this.state.overPerBowler
                            let city = this.state.city
                            let groundName = this.state.groundName
                            let dateTime = this.state.dateTime
                            if (noOfOvers.trim() === "") {
                                Alert.alert("", "Please enter No. Of Overs")
                                return;
                            }
                            if (overPerBowler.trim() === "") {
                                Alert.alert("", "Please enter Over Per Bowler")
                                return;
                            }
                            if (city.trim() === "") {
                                Alert.alert("", "Please enter City")
                                return;
                            }
                            if (groundName.trim() === "") {
                                Alert.alert("", "Please enter Ground Name")
                                return;
                            }
                            if (dateTime.trim() === "Date & Time") {
                                Alert.alert("", "Please enter Date & Time")
                                return;
                            }

                            this.props.navigation.navigate("TossScreen", {
                                teamFirstName: this.state.teamFirstName,
                                teamFirstImage: this.state.teamFirstImage,
                                teamFirstSquad: this.state.teamFirstSquad,
                                teamSecondName: this.state.teamSecondName,
                                teamSecondSquad: this.state.teamSecondSquad,
                                teamSecondImage: this.state.teamSecondImage,
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
                            Constants.NEXT + "(" + Constants.TOSS + ")"
                        }</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    hideDatePicker() {
        mThis.setState({
            isDatePickerVisible: false
        })
    };


    handleConfirm(date) {
        let newDate = date
        newDate = moment(newDate).format('DD MMM YYYY HH:mm');
        try {
            mThis.setState({
                dateTime: newDate,
                isDatePickerVisible: false
            })
        } catch (e) {
            console.log("Error: ", e)
        }

        // this.hideDatePicker();
    };

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
                        }}>{Constants.START_MATCH_SMALL}</Text>
                </View>

                {this.state.isTeamSelectionCompleted ? this.teamSelectionCompleteView() : this.selectTeamView()}
                {(
                    this.state.isTeamSelectionCompleted && this.state.isDatePickerVisible &&
                    <DateTimePickerModal
                        isVisible={true}
                        mode="datetime"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                )}
            </View>
        );
    }
}

export default StartMatchScreen1;
