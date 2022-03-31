import React, {Component} from 'react';
import {
    Alert,
    FlatList,
    Image,
    ImageBackground, PermissionsAndroid,
    SafeAreaView, ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import {Divider} from "react-native-elements";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../styles/Constants";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

class AddPlayerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: this.props.route.params.teamName,
            teamId: this.props.route.params.teamId,
            city: this.props.route.params.city,
            playerName: '',
            phoneNumber: '',
            filePath: ''
        }
    }

    handlePlayerName = (text) => {
        this.setState({playerName: text})
    }
    handlePhoneNumber = (text) => {
        this.setState({phoneNumber: text})
    }
    requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await this.requestCameraPermission();
        let isStoragePermitted = await this.requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            await launchCamera(options, (response) => {
                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode === 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode === 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode === 'others') {
                    alert(response.errorMessage);
                    return;
                }
                if (response.assets !== undefined &&
                    response.assets !== null &&
                    response.assets.length > 0) {
                    this.setState({
                        filePath: response.assets[0].uri
                    })
                } else {
                    this.setState({
                        filePath: response.uri
                    })
                }
            });
        }
    };

    chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                // alert('User cancelled camera picker');
                return;
            } else if (response.errorCode === 'camera_unavailable') {
                // alert('Camera not available on device');
                return;
            } else if (response.errorCode === 'permission') {
                // alert('Permission not satisfied');
                return;
            } else if (response.errorCode === 'others') {
                // alert(response.errorMessage);
                return;
            }
            if (response.assets !== undefined &&
                response.assets !== null &&
                response.assets.length > 0) {
                this.setState({
                    filePath: response.assets[0].uri
                })
            } else {
                this.setState({
                    filePath: response.uri
                })
            }
        });
    };

    callAPIForPlayerAdd(name, number, team_id, filePath) {
        console.log("filePath: ", filePath)
        let photo = "";
        if (filePath !== "") {
            photo = {
                uri: filePath,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };
        }

        let form = new FormData();
        form.append('name', name);
        form.append('number', number);
        if(photo !== ""){
            form.append("profile_pic", photo);
        }
        form.append('team_id', team_id);

        fetch(
            "https://www.goldendc.demourl.ca/api/create_player",
            {
                body: form,
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR ", error)
            })
            .then((responseData) => {
                console.log("Succes ", JSON.stringify(responseData))
                if (responseData !== undefined) {
                    this.props.navigation.goBack()
                }
            }).done();
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
                            marginEnd: 10,
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
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            fontFamily: fontStyle.MontserratBold,
                            fontSize: 20,
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: colors.WHITE
                        }}>{Constants.ADD_PLAYER + " to " + this.state.teamName}</Text>
                </View>
                <ScrollView>
                    <View style={{
                        flex: 1,
                    }}>
                        <TouchableOpacity onPress={() => {
                            // Alert.alert("","",
                            //     [
                            //
                            //     ])
                            this.captureImage('photo')
                        }}>
                            {(
                                this.state.filePath !== '' ?
                                    <Image
                                        source={{uri: this.state.filePath}}
                                        style={{
                                            marginTop: 60,
                                            alignSelf: 'center',
                                            width: 100,
                                            borderRadius: 100,
                                            height: 100,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}/>
                                    :
                                    <ImageBackground
                                        resizeMode={'cover'}
                                        style={{
                                            marginTop: 60,
                                            alignSelf: 'center',
                                            width: 100,
                                            height: 100,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }} source={require('../assets/images/ic_rond_gradiant.png')}>
                                        <Image
                                            resizeMode={'cover'}
                                            style={{
                                                width: 55,
                                                height: 55,
                                            }} source={require('../assets/images/ic_top_logo.png')}/>
                                    </ImageBackground>
                            )}
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 20,
                                marginTop: 13,
                                alignSelf: "center",
                                color: colors.BLACK
                            }}>{Constants.PLAYER_PHOTO}</Text>

                        <TextInput
                            style={{
                                margin: 20,
                                height: 50,
                                borderColor: '#76B04315',
                                borderWidth: 1,
                                paddingStart: 10,
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 14,
                            }}
                            returnKeyType={"next"}
                            underlineColorAndroid="transparent"
                            placeholder={Constants.PLAYER_NAME}
                            placeholderTextColor={colors.TXT_HINT_COLOR}
                            autoCapitalize="none"
                            onChangeText={this.handlePlayerName}
                        />
                        <TextInput
                            style={{
                                marginEnd: 20,
                                marginStart: 20,
                                height: 50,
                                borderColor: '#76B04315',
                                borderWidth: 1,
                                paddingStart: 10,
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 14,

                            }}
                            underlineColorAndroid="transparent"
                            placeholder={Constants.PHONE_NUMBER}
                            placeholderTextColor={colors.TXT_HINT_COLOR}
                            autoCapitalize="none"
                            keyboardType={"number-pad"}
                            onChangeText={this.handlePhoneNumber}
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity
                    onPress={() => {
                        let playerName = this.state.playerName
                        let phoneNumber = this.state.phoneNumber
                        if (playerName.trim() === "") {
                            Alert.alert("", "Please enter Player Name")
                            return;
                        }
                        if (phoneNumber.trim() === "") {
                            Alert.alert("", "Please enter Phone number")
                            return;
                        }

                        this.callAPIForPlayerAdd(playerName, phoneNumber, this.state.teamId, this.state.filePath)

                        // this.props.navigation.navigate("TeamListScreen",{
                        //     teamName : this.state.teamName,
                        //     city : this.state.city,
                        //     playName : this.state.playName,
                        //     phoneNumber : this.state.phoneNumber,
                        //     isNewAddPlayer: true
                        // });
                    }}
                    style={{
                        marginBottom: 10,
                        width: "90%",
                        alignSelf: 'center',
                    }}>
                    <Text
                        style={{
                            fontFamily: fontStyle.MontserratBold,
                            fontSize: 12,
                            paddingTop: 16,
                            alignSelf: 'center',
                            width: "100%",
                            paddingBottom: 16,
                            textAlign: 'center',
                            paddingStart: 20,
                            paddingEnd: 20,
                            borderRadius: 6,
                            backgroundColor: colors.STATUS_BAR_COLOR,
                            color: colors.WHITE
                        }}>{
                        Constants.ADD_PLAYER
                    }</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AddPlayerScreen;
