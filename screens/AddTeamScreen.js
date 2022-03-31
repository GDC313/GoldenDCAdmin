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

import { firebase } from '@react-native-firebase/database';
import storage from '@react-native-firebase/app';
import moment from "moment";
import {Value} from "react-native-reanimated";

const axios = require('axios');

let reference;

class AddTeamScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
        teamName:'',
        city:'',
        filePath:''
    }
  }
  componentDidMount() {
      reference = firebase
          .app()
          .database('https://goldendc-fdb99-default-rtdb.firebaseio.com/')//https://<databaseName>.<region>.firebasedatabase.app/
          .ref('/teams/');
  }

    handleTeamName = (text) => {
        this.setState({ teamName: text })
    }
    handleCity = (text) => {
        this.setState({ city: text })
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
                if(response.assets !== undefined &&
                    response.assets !== null &&
                    response.assets.length > 0){
                    this.setState({
                        filePath: response.assets[0].uri
                    })
                }else{
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
            if(response.assets !== undefined &&
                response.assets !== null &&
                response.assets.length > 0){
                this.setState({
                    filePath: response.assets[0].uri
                })
            }else{
                this.setState({
                    filePath: response.uri
                })
            }
        });
    };

    callAPI(teamName, city, filePath){
        console.log("filePath: ",filePath)
        let photo = "";
        if (filePath !== "") {
            photo = {
                uri: filePath,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };
        }

        let form = new FormData();
        if(photo !== ""){
            form.append("logo", photo);
        }
        form.append('name',teamName);
        form.append('city',city);

        fetch(
            "https://www.goldendc.demourl.ca/api/create_team",
            {
                body: form,
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)
            })
            .then((responseData) => {
                console.log("Succes ", JSON.stringify(responseData))
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
          height:50,
          marginTop:22,
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:colors.PRIMARY_COLOR,
          flexDirection:'row',
        }}>
            <TouchableOpacity
                style={{
                    position:'absolute',
                    left:0,
                }}
                onPress={()=>{
                    this.props.navigation.goBack()
                }}>
                <Image
                    resizeMode={'cover'}
                    style={{
                        width: 20, height: 18,
                        alignSelf: 'center',
                        marginStart:15
                    }} source={require('../assets/images/ic_back.png')}/>
            </TouchableOpacity>

          <Text
              style={{
                fontFamily: fontStyle.MontserratBold,
                fontSize: 20,
                color: colors.WHITE
              }}>{Constants.ADD_TEAM}</Text>
        </View>

          <ScrollView>
              <View style={{
                  flex:1,
              }}>
                  <TouchableOpacity onPress={()=>{
                      // Alert.alert("","",
                      //     [
                      //
                      //     ])
                      this.captureImage('photo')
                  }}>
                      {(
                          this.state.filePath !==''?
                              <Image
                                  source={{uri: this.state.filePath}}
                                  style={{
                                      marginTop:60,
                                      alignSelf:'center',
                                      width: 100,
                                      borderRadius:100,
                                      height: 100,
                                      alignItems:'center',
                                      justifyContent:'center',
                                  }}/>
                              :
                              <ImageBackground
                                  resizeMode={'cover'}
                                  style={{
                                      marginTop:60,
                                      alignSelf:'center',
                                      width: 100,
                                      height: 100,
                                      alignItems:'center',
                                      justifyContent:'center',
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
                          marginTop:13,
                          alignSelf:"center",
                          color: colors.BLACK
                      }}>{Constants.TEAM_LOGO}</Text>

                  <TextInput
                      style = {{
                          margin: 20,
                          height: 50,
                          borderColor: '#76B04315',
                          borderWidth: 1,
                          paddingStart:10,
                          fontFamily: fontStyle.MontserratRegular,
                          fontSize: 14,
                      }}
                      returnKeyType={"next"}
                      underlineColorAndroid = "transparent"
                      placeholder ={Constants.TEAM_NAME}
                      placeholderTextColor ={colors.TXT_HINT_COLOR}
                      autoCapitalize = "none"
                      onChangeText = {this.handleTeamName}
                  />
                  <TextInput
                      style = {{
                          marginEnd: 20,
                          marginStart: 20,
                          height: 50,
                          borderColor: '#76B04315',
                          borderWidth: 1,
                          paddingStart:10,
                          fontFamily: fontStyle.MontserratRegular,
                          fontSize: 14,

                      }}
                      underlineColorAndroid = "transparent"
                      placeholder ={Constants.CITY}
                      placeholderTextColor ={colors.TXT_HINT_COLOR}
                      autoCapitalize = "none"
                      onChangeText = {this.handleCity}
                  />
              </View>
          </ScrollView>

          <TouchableOpacity
              onPress={async () => {
                  let teamName = this.state.teamName
                  let city = this.state.city
                  let filePath = this.state.filePath
                  var now = moment();
                  // alert(now)
                  let id = "dc_"+now
                  if (teamName.trim() === "") {
                      Alert.alert("", "Please enter Team Name")
                      return;
                  }
                  if (city.trim() === "") {
                      Alert.alert("", "Please enter City")
                      return;
                  }
                  // if (filePath.trim() === "") {
                  //     Alert.alert("", "Please select image")
                  //     return;
                  // }

                  this.callAPI(teamName, city, filePath)
                  // const uploadUri = Platform.OS === 'ios' ? filePath.replace('file://', '') : filePath;

                  /*
                  const task = storage
                      .ref("filename")
                      .putFile(uploadUri);
                  // set progress state
                  task.on('state_changed', snapshot => {
                      setTransferred(
                          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
                      );
                  });
                  try {
                      await task;
                  } catch (e) {
                      console.error(e);
                  }
                  */
                  // this.props.navigation.navigate("AddPlayerScreen",{
                  //     teamName : teamName,
                  //     city : city
                  // });

                  // reference.push({
                  //     id: id,
                  //     teamName: teamName,
                  //     city: city
                  // }).then((data)=>{
                  //     //success callback
                  //     // var final = data.substr(data.lastIndexOf('/') + 1);
                  //     console.log('data :' , JSON.stringify(data))
                  //     console.log('data.val :' , data.val())
                  //     // console.log('final ' , final)
                  //     let response = String.valueOf(data);
                  //     console.log('response ' , response)
                  //     let str = response.split("/");
                  //     console.log('data ' , str)
                  // }).catch((error)=>{
                  //     //error callback
                  //     console.log('error ' , error)
                  // })
              }}
              style={{
                  // flex:1,
                  marginBottom:10,
                  width:"90%",
                  alignSelf:'center',
              }}>
              <Text
                  style={{
                      fontFamily: fontStyle.MontserratBold,
                      fontSize: 12,
                      paddingTop:16,
                      alignSelf:'center',
                      width:"100%",
                      paddingBottom:16,
                      textAlign:'center',
                      paddingStart:20,
                      paddingEnd:20,
                      borderRadius:6,
                      backgroundColor:colors.STATUS_BAR_COLOR,
                      color: colors.WHITE}}>{
                  Constants.ADD_TEAM
              }</Text>
          </TouchableOpacity>


      </View>
    );
  }
}

export default AddTeamScreen;
