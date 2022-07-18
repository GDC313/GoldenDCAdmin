import React, {Component} from 'react';
import {
    Alert,
    FlatList,
    Image,
    ImageBackground, Modal,
    SafeAreaView,
    StatusBar,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native";

import {Divider} from "react-native-elements";
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../styles/Constants";
import database from "@react-native-firebase/database";

let extraRun = 0

class LiveMatchScoreUpdateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firebaseID: this.props.route.params.firebaseID,
            batFirstTeamId: this.props.route.params.batFirstTeamId,
            battingTeamId: this.props.route.params.battingTeamId,
            battingTeamName: this.props.route.params.battingTeamName,
            bowlingTeamId: this.props.route.params.bowlingTeamId,
            bowlingTeamName: this.props.route.params.bowlingTeamName,
            battingTeamSquadMain: this.props.route.params.battingTeamSquadMain,
            battingTeamSquad: this.props.route.params.battingTeamSquad,
            bowlingTeamSquad: this.props.route.params.bowlingTeamSquad,
            strikerId: this.props.route.params.strikerId,
            strikerName: this.props.route.params.strikerName,
            isStrikerSelection: true,
            nonStrikerId: this.props.route.params.nonStrikerId,
            nonStrikerName: this.props.route.params.nonStrikerName,
            isNonStrikerSelection: false,
            bowlerName: this.props.route.params.bowlerName,
            bowlerId: this.props.route.params.bowlerId,
            selectStriker: null,
            selectNonStriker: null,
            selectBowler: null,
            isSelectExtraModel: false,
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
            extra: 0,
            wickets: 0,
            totalOvers: 20,
            overs: 0,
            wonToss: 1,
            bowlCount: 0,
            currentOverRun: [],
            currentOverBowl: 0,
            currentOverBowlerOver: 0,
            currentOverBowlRun: 0,
            completedOver: 0,
        }
    }

    undoRun(isBatsman1) {
        let list = this.state.currentOverRun
        let lastRun = list[list.length - 1]
        let run = this.state.runs
        let extra = this.state.extra

        list = list.filter((_, i) => i !== list.length - 1)

        let batsman1Runs = this.state.batsman1Runs
        let batsman1Bowls = this.state.batsman1Bowls
        let batsman2Runs = this.state.batsman2Runs
        let batsman2Bowls = this.state.batsman2Bowls
        let currentOverBowl = this.state.currentOverBowl
        let currentOverBowlerOver = this.state.currentOverBowlerOver
        let currentOverBowlRun = this.state.currentOverBowlRun

        this.setState({
            runs: (run - lastRun) <= 0 ? 0 : (run - lastRun),
            currentOverRun: list,
            currentOverBowlRun: (currentOverBowlRun - lastRun) <= 0 ? 0 : (currentOverBowlRun - lastRun),
            batsman1Runs: isBatsman1 ? (batsman1Runs - lastRun) <= 0 ? 0 : (batsman1Runs - lastRun) : batsman1Runs,
            batsman2Runs: !isBatsman1 ? (batsman2Runs - lastRun) <= 0 ? 0 : (batsman2Runs - lastRun) : batsman2Runs,
            batsman1Bowls: isBatsman1 ? (batsman1Bowls - 1) : batsman1Bowls,
            batsman2Bowls: !isBatsman1 ? (batsman2Bowls - 1) : batsman2Bowls,
            currentOverBowl: currentOverBowl - 1,
        })

    }

    componentDidMount() {
        extraRun = 0
        let path = "/liveMatchList/" + this.state.firebaseID
        database().ref(path)
            .orderByValue()
            .once('value')
            .then((result) => {
                let resultJson = JSON.parse(JSON.stringify(result))
                console.log("resultJson: ", resultJson)
                let isFirstSessionCompleted =
                    resultJson.isFirstSessionCompleted !== undefined &&
                    resultJson.isFirstSessionCompleted !== null &&
                    resultJson.isFirstSessionCompleted === true
                let overs = resultJson.batFirstTeamId === resultJson.teamFirstId ?
                    resultJson.teamFirstInning.overs : resultJson.teamSecondInning.overs
                let wickets = resultJson.batFirstTeamId === resultJson.teamFirstId ?
                    resultJson.teamFirstInning.wickets : resultJson.teamSecondInning.wickets

                if (!isFirstSessionCompleted) {
                    if (overs >= resultJson.noOfOvers) {
                        console.log("sfsfdsfsdfsdfsdfsdf")
                        isFirstSessionCompleted = true
                    }
                }

                let wonToss = ""
                // if (resultJson.tossWonTeamId === 1) {
                //     if (resultJson.batFirstTeamId === 1) {
                //         wonToss = resultJson.teamFirstName + " won the toss and elected to bat"
                //     } else {
                //         wonToss = resultJson.teamFirstName + " won the toss and elected to bowl"
                //     }
                // } else if (resultJson.tossWonTeamId === 2) {
                //     if (resultJson.batFirstTeamId === 1) {
                //         wonToss = resultJson.teamSecondName + " won the toss and elected to bat"
                //     } else {
                //         wonToss = resultJson.teamSecondName + " won the toss and elected to bowl"
                //     }
                // }

                if (resultJson.batFirstTeamId === resultJson.teamFirstId) {
                    wonToss = resultJson.teamFirstName + " won the toss and elected to bat"
                } else {
                    wonToss = resultJson.teamSecondName + " won the toss and elected to bowl"
                }


                let score = resultJson.batFirstTeamId === resultJson.teamFirstId ?
                    resultJson.teamFirstInning.score : resultJson.teamSecondInning.score

                let extra = resultJson.batFirstTeamId === resultJson.teamFirstId ?
                    resultJson.teamFirstInning.extra ?
                        resultJson.teamFirstInning.extra : 0 :
                    resultJson.teamSecondInning.extra ?
                        resultJson.teamSecondInning.extra : 0

                let currentOverRun = resultJson.currentOverRun !== undefined ? resultJson.currentOverRun : []
                let currentOverBowlRun = resultJson.currentOverBowlRun !== undefined ? resultJson.currentOverBowlRun : 0
                let currentOverBowl = resultJson.currentOverBowl !== undefined ? resultJson.currentOverBowl : 0
                let currentOverBowlerOver = resultJson.currentOverBowlerOver !== undefined ?
                    resultJson.currentOverBowlerOver : 0
                let batsman1Runs = 0
                let batsman2Runs = 0
                let batsman1Bowls = 0
                let batsman2Bowls = 0
                let strikerPlayerIndex = resultJson.teamFirstSquad.findIndex(
                    (item) => item.id === this.state.strikerId)
                if (strikerPlayerIndex === -1) {
                    strikerPlayerIndex = resultJson.teamSecondSquad.findIndex(
                        (item) => item.id === this.state.strikerId)
                    batsman1Runs = resultJson.teamSecondSquad[strikerPlayerIndex].run !== undefined ?
                        resultJson.teamSecondSquad[strikerPlayerIndex].run : 0
                    batsman1Bowls = resultJson.teamSecondSquad[strikerPlayerIndex].bowl !== undefined ?
                        resultJson.teamSecondSquad[strikerPlayerIndex].bowl : 0
                } else {
                    batsman1Runs = resultJson.teamFirstSquad[strikerPlayerIndex].run !== undefined ?
                        resultJson.teamFirstSquad[strikerPlayerIndex].run : 0
                    batsman1Bowls = resultJson.teamFirstSquad[strikerPlayerIndex].bowl !== undefined ?
                        resultJson.teamFirstSquad[strikerPlayerIndex].bowl : 0
                }
                let nonStrikerPlayerIndex = resultJson.teamFirstSquad.findIndex(
                    (item) => item.id === this.state.nonStrikerId)
                if (nonStrikerPlayerIndex === -1) {
                    nonStrikerPlayerIndex = resultJson.teamSecondSquad.findIndex(
                        (item) => item.id === this.state.nonStrikerId)
                    batsman2Runs = resultJson.teamSecondSquad[nonStrikerPlayerIndex].run !== undefined ?
                        resultJson.teamSecondSquad[nonStrikerPlayerIndex].run : 0
                    batsman2Bowls = resultJson.teamFirstSquad[nonStrikerPlayerIndex].bowl !== undefined ?
                        resultJson.teamFirstSquad[nonStrikerPlayerIndex].bowl : 0
                } else {
                    batsman2Runs = resultJson.teamFirstSquad[nonStrikerPlayerIndex].run !== undefined ?
                        resultJson.teamFirstSquad[nonStrikerPlayerIndex].run : 0
                    batsman2Bowls = resultJson.teamFirstSquad[nonStrikerPlayerIndex].bowl !== undefined ?
                        resultJson.teamFirstSquad[nonStrikerPlayerIndex].bowl : 0
                }

                if (currentOverRun.length >= 6) {
                    this.setState({
                        isSelectBowlingModel: true,
                        currentOverRun: [],
                        overs: overs,
                        wickets: wickets,
                        currentOverBowl: 0,
                        currentOverBowlRun: currentOverBowlRun,
                        batsman1Runs: batsman1Runs,
                        runs: score,
                        extra: extra,
                        batsman2Runs: batsman2Runs,
                        batsman1Bowls: batsman1Bowls,
                        batsman2Bowls: batsman2Bowls,
                        totalOvers: resultJson.noOfOvers,
                        batFirstTeamId: resultJson.batFirstTeamId,
                        wonToss: wonToss
                    })
                } else {
                    this.setState({
                        batsman1Runs: batsman1Runs,
                        runs: score,
                        extra: extra,
                        currentOverBowl: currentOverBowl,
                        currentOverBowlRun: currentOverBowlRun,
                        currentOverBowlerOver: currentOverBowlerOver,
                        overs: overs,
                        wickets: wickets,
                        currentOverRun: currentOverRun,
                        batsman2Runs: batsman2Runs,
                        batsman1Bowls: batsman1Bowls,
                        batsman2Bowls: batsman2Bowls,
                        totalOvers: resultJson.noOfOvers,
                        batFirstTeamId: resultJson.batFirstTeamId,
                        wonToss: wonToss
                    })
                }

            })
    }

    updateRun(run, bowl, isBatsman1, isWideOrNoBall, isWicket) {
        console.log("updateRun...", this.state.currentOverRun)
        let list = []
        list.push(...this.state.currentOverRun)
        let lastRuns = this.state.runs
        let lastExtra = this.state.extra
        console.log("updateRun...1", list)
        isBatsman1 = this.state.isStrikerSelection
        console.log("updateRun...2")

        if (!isWideOrNoBall) {
            console.log("updateRun...22", run)
            console.log("updateRun...2221", list)
            // try {
            let batsman1Runs = this.state.batsman1Runs
            let batsman1Bowls = this.state.batsman1Bowls
            let batsman2Runs = this.state.batsman2Runs
            let batsman2Bowls = this.state.batsman2Bowls
            let currentOverBowl = this.state.currentOverBowl + 1
            let currentOverBowlerOver = this.state.currentOverBowlerOver
            let overs = this.state.overs
            let wickets = this.state.wickets

            if (isWicket) {
                list.push("W")
                console.log("isBatsman1", isBatsman1)
                this.setState({
                    batsman1Bowls: isBatsman1 ? batsman1Bowls + 1 : batsman1Bowls,
                    batsman2Bowls: !isBatsman1 ? batsman2Bowls + 1 : batsman2Bowls,
                    currentOverRun: list,
                    currentOverBowl: currentOverBowl
                }, () => {
                    console.log("updateRun...4")
                    if (this.state.currentOverBowl >= 6) {
                        currentOverBowlerOver = currentOverBowlerOver + 1
                        overs = overs + 1
                        if (overs >= this.state.totalOvers) {
                            if (this.state.battingTeamId === this.state.batFirstTeamId) {
                                Alert.alert("", "First inning completed")
                            } else {
                                Alert.alert("", "Match completed")
                            }
                        } else {
                            Alert.alert("", "Over completed",
                                [
                                    {
                                        text: "Select bowler", onPress: () => {
                                            this.setState({
                                                isSelectBowlingModel: true,
                                                currentOverRun: [],
                                                overs: overs,
                                                currentOverBowl: 0,
                                            })
                                        }
                                    }
                                ]
                            )
                        }
                    }
                    let path = "/liveMatchList/" + this.state.firebaseID
                    database().ref(path)
                        .orderByValue()
                        .once('value')
                        .then((result) => {
                            let resultJson = JSON.parse(JSON.stringify(result))
                            if (resultJson.batFirstTeamId === resultJson.teamFirstId) {
                                //TODO: Bowler
                                let bowlerIndex = resultJson.teamSecondSquad.findIndex(
                                    (item) => item.id === this.state.bowlerId)
                                let bowlerData = resultJson.teamSecondSquad.filter(
                                    (item) => item.id === this.state.bowlerId)

                                //TODO: Batsman
                                let strikerPlayerIndex = resultJson.teamFirstSquad.findIndex(
                                    (item) => item.id === this.state.strikerId)
                                console.log("strikerPlayerIndex first: ",strikerPlayerIndex)
                                resultJson.teamFirstInning.wickets = wickets + 1
                                resultJson.teamFirstInning[strikerPlayerIndex].out = "b "+ bowlerData.name

                                //TODO: Bowler calculation
                                console.log("1st bowlerData", bowlerData)
                                resultJson.teamSecondSquad[bowlerIndex].currentOverBowl = currentOverBowl
                                resultJson.teamSecondSquad[bowlerIndex].currentOverBowlerOver = currentOverBowlerOver
                                resultJson.teamSecondSquad[bowlerIndex].wickets =
                                    resultJson.teamSecondSquad[bowlerIndex].wickets !== undefined ?
                                        resultJson.teamSecondSquad[bowlerIndex].wickets + 1 : 1

                            }else{

                                //TODO: Bowler
                                let bowlerIndex = resultJson.teamFirstSquad.findIndex(
                                    (item) => item.id === this.state.bowlerId)
                                let bowlerData = resultJson.teamFirstSquad.filter(
                                    (item) => item.id === this.state.bowlerId)
                                console.log("1st bowlerData", bowlerData)

                                //TODO: Batsman
                                let strikerPlayerIndex = resultJson.teamSecondSquad.findIndex(
                                    (item) => item.id === this.state.strikerId)
                                console.log("strikerPlayerIndex 2nd: ",strikerPlayerIndex)
                                resultJson.teamSecondInning.wickets = wickets + 1
                                resultJson.teamSecondSquad[strikerPlayerIndex].out = "b "+ bowlerData.name

                                //TODO: Bowler calculation
                                resultJson.teamFirstSquad[bowlerIndex].currentOverBowl = currentOverBowl
                                resultJson.teamFirstSquad[bowlerIndex].currentOverBowlerOver = currentOverBowlerOver
                                resultJson.teamFirstSquad[bowlerIndex].wickets =
                                    resultJson.teamFirstSquad[bowlerIndex].wickets !== undefined ?
                                        resultJson.teamFirstSquad[bowlerIndex].wickets + 1 : 1
                            }
                            database()
                                .ref(path)
                                .update({
                                    currentOverRun: this.state.currentOverRun,
                                    currentOverBowl: this.state.currentOverBowl,
                                    teamFirstInning: resultJson.teamFirstInning,
                                    teamSecondInning: resultJson.teamSecondInning,
                                    teamFirstSquad: resultJson.teamFirstSquad,
                                    teamSecondSquad: resultJson.teamSecondSquad
                                })
                                .then((result) => {
                                    console.log('Data updated.', result)
                                });


                        })
                })
            } else {
                list.push(run)
                console.log("updateRun...222", list)
                let currentOverBowlRun = this.state.currentOverBowlRun + run
                console.log("updateRun...3")

                this.setState({
                    runs: lastRuns + run,
                    isStrikerSelection: (currentOverBowl + 1) === 6 || run === 1 || run === 3 ?
                        !isBatsman1 : isBatsman1,
                    currentOverBowlRun: currentOverBowlRun,
                    batsman1Runs: isBatsman1 ? batsman1Runs + run : batsman1Runs,
                    batsman2Runs: !isBatsman1 ? batsman2Runs + run : batsman2Runs,
                    batsman1Bowls: isBatsman1 ? batsman1Bowls + 1 : batsman1Bowls,
                    batsman2Bowls: !isBatsman1 ? batsman2Bowls + 1 : batsman2Bowls,
                    currentOverRun: list,
                    currentOverBowl: currentOverBowl
                }, () => {
                    console.log("updateRun...4")

                    if (this.state.currentOverBowl >= 6) {
                        currentOverBowlerOver = currentOverBowlerOver + 1
                        overs = overs + 1
                        if (overs >= this.state.totalOvers) {
                            if (this.state.battingTeamId === this.state.batFirstTeamId) {
                                Alert.alert("", "First inning completed")
                            } else {
                                Alert.alert("", "Match completed")
                            }

                        } else {
                            Alert.alert("", "Over completed",
                                [
                                    {
                                        text: "Select bowler", onPress: () => {
                                            this.setState({
                                                isSelectBowlingModel: true,
                                                currentOverRun: [],
                                                overs: overs,
                                                currentOverBowl: 0,
                                            })
                                        }
                                    }
                                ]
                            )
                        }
                    }
                    // console.log("isSelectBowlingModel: ", this.state.isSelectBowlingModel)
                    // console.log("strikerId: ", this.state.strikerId)
                    // console.log("nonStrikerId: ", this.state.nonStrikerId)
                    // console.log("batsman1Runs: ", this.state.batsman1Runs)
                    // console.log("batsman2Runs: ", this.state.batsman2Runs)
                    console.log("currentOverRun: ", this.state.currentOverRun)
                    let path = "/liveMatchList/" + this.state.firebaseID
                    database().ref(path)
                        .orderByValue()
                        .once('value')
                        .then((result) => {
                            let resultJson = JSON.parse(JSON.stringify(result))

                            let strikerPlayerIndex = resultJson.teamFirstSquad.findIndex(
                                (item) => item.id === this.state.strikerId)
                            if (strikerPlayerIndex === -1) {
                                strikerPlayerIndex = resultJson.teamSecondSquad.findIndex(
                                    (item) => item.id === this.state.strikerId)
                                resultJson.teamSecondSquad[strikerPlayerIndex].run = this.state.batsman1Runs
                                resultJson.teamSecondSquad[strikerPlayerIndex].bowl = this.state.batsman1Bowls
                                if (run === 4) {
                                    resultJson.teamSecondSquad[strikerPlayerIndex].four =
                                        resultJson.teamSecondSquad[strikerPlayerIndex].four !== undefined ?
                                            resultJson.teamSecondSquad[strikerPlayerIndex].four + 1 : 0
                                }
                                if (run === 6) {
                                    resultJson.teamSecondSquad[strikerPlayerIndex].four =
                                        resultJson.teamSecondSquad[strikerPlayerIndex].six !== undefined ?
                                            resultJson.teamSecondSquad[strikerPlayerIndex].six + 1 : 0
                                }

                                console.log("resultJson.teamSecondSquad ", resultJson.teamSecondSquad[nonStrikerPlayerIndex])
                            } else {
                                resultJson.teamFirstSquad[strikerPlayerIndex].run = this.state.batsman1Runs
                                resultJson.teamFirstSquad[strikerPlayerIndex].bowl = this.state.batsman1Bowls
                                if (run === 4) {
                                    resultJson.teamFirstSquad[strikerPlayerIndex].four =
                                        resultJson.teamFirstSquad[strikerPlayerIndex].four !== undefined ?
                                            resultJson.teamFirstSquad[strikerPlayerIndex].four + 1 : 0
                                }
                                if (run === 6) {
                                    resultJson.teamFirstSquad[strikerPlayerIndex].four =
                                        resultJson.teamFirstSquad[strikerPlayerIndex].six !== undefined ?
                                            resultJson.teamFirstSquad[strikerPlayerIndex].six + 1 : 0
                                }
                                console.log("resultJson.teamFirstSquad ", resultJson.teamFirstSquad[strikerPlayerIndex])
                            }
                            console.log("updateRun...6")

                            let nonStrikerPlayerIndex = resultJson.teamFirstSquad.findIndex(
                                (item) => item.id === this.state.nonStrikerId)
                            if (nonStrikerPlayerIndex === -1) {
                                nonStrikerPlayerIndex = resultJson.teamSecondSquad.findIndex(
                                    (item) => item.id === this.state.nonStrikerId)
                                resultJson.teamSecondSquad[nonStrikerPlayerIndex].run = this.state.batsman2Runs
                                resultJson.teamSecondSquad[strikerPlayerIndex].bowl = this.state.batsman2Bowls
                                if (run === 4) {
                                    resultJson.teamSecondSquad[strikerPlayerIndex].four =
                                        resultJson.teamSecondSquad[strikerPlayerIndex].four !== undefined ?
                                            resultJson.teamSecondSquad[strikerPlayerIndex].four + 1 : 0
                                }
                                if (run === 6) {
                                    resultJson.teamSecondSquad[strikerPlayerIndex].four =
                                        resultJson.teamSecondSquad[strikerPlayerIndex].six !== undefined ?
                                            resultJson.teamSecondSquad[strikerPlayerIndex].six + 1 : 0
                                }
                                console.log("resultJson.teamSecondSquad ", resultJson.teamSecondSquad[nonStrikerPlayerIndex])
                            } else {
                                resultJson.teamFirstSquad[nonStrikerPlayerIndex].run = this.state.batsman2Runs
                                resultJson.teamFirstSquad[nonStrikerPlayerIndex].bowl = this.state.batsman2Bowls
                                if (run === 4) {
                                    resultJson.teamFirstSquad[nonStrikerPlayerIndex].four =
                                        resultJson.teamFirstSquad[nonStrikerPlayerIndex].four !== undefined ?
                                            resultJson.teamFirstSquad[nonStrikerPlayerIndex].four + 1 : 0
                                }
                                if (run === 6) {
                                    resultJson.teamFirstSquad[nonStrikerPlayerIndex].four =
                                        resultJson.teamFirstSquad[nonStrikerPlayerIndex].six !== undefined ?
                                            resultJson.teamFirstSquad[nonStrikerPlayerIndex].six + 1 : 0
                                }
                                console.log("resultJson.teamSecondSquad ", resultJson.teamFirstSquad[nonStrikerPlayerIndex])
                            }

                            if (this.state.bowlingTeamId === 1) {
                                let bowlerIndex = resultJson.teamFirstSquad.findIndex(
                                    (item) => item.id === this.state.bowlerId)
                                let bowlerData = resultJson.teamFirstSquad.filter(
                                    (item) => item.id === this.state.bowlerId)
                                console.log("1st bowlerData", bowlerData)
                                resultJson.teamFirstSquad[bowlerIndex].currentOverBowlRun = currentOverBowlRun
                                resultJson.teamFirstSquad[bowlerIndex].currentOverBowl = currentOverBowl
                                resultJson.teamFirstSquad[bowlerIndex].currentOverBowlerOver = currentOverBowlerOver
                            } else {
                                let bowlerIndex = resultJson.teamSecondSquad.findIndex(
                                    (item) => item.id === this.state.bowlerId)
                                let bowlerData = resultJson.teamSecondSquad.filter(
                                    (item) => item.id === this.state.bowlerId)
                                console.log("2nd bowlerData", bowlerData)
                                resultJson.teamSecondSquad[bowlerIndex].currentOverBowlRun = currentOverBowlRun
                                resultJson.teamSecondSquad[bowlerIndex].currentOverBowl = currentOverBowl
                                resultJson.teamSecondSquad[bowlerIndex].currentOverBowlerOver = currentOverBowlerOver
                            }

                            if (resultJson.batFirstTeamId === resultJson.teamFirstId) {
                                resultJson.teamFirstInning.score = this.state.runs
                                resultJson.teamFirstInning.overs = overs
                                resultJson.teamFirstInning.wickets = 0
                            } else {
                                resultJson.teamSecondInning.score = this.state.runs
                                resultJson.teamSecondInning.overs = overs
                                resultJson.teamSecondInning.wickets = 0
                            }

                            console.log("updateRun...7")
                            if (overs >= resultJson.noOfOvers) {
                                if (this.state.battingTeamId === resultJson.batFirstTeamId) {
                                    alert("1st inning finish")
                                } else {
                                    alert("Match complete")
                                }

                            }
                            database()
                                .ref(path)
                                .update({
                                    currentOverRun: this.state.currentOverRun,
                                    currentOverBowl: this.state.currentOverBowl,
                                    teamFirstInning: resultJson.teamFirstInning,
                                    teamSecondInning: resultJson.teamSecondInning,
                                    teamFirstSquad: resultJson.teamFirstSquad,
                                    teamSecondSquad: resultJson.teamSecondSquad
                                })
                                .then((result) => {
                                    console.log('Data updated.', result)
                                });
                        })
                })
            }
        } else {

            let path = "/liveMatchList/" + this.state.firebaseID
            database().ref(path)
                .orderByValue()
                .once('value')
                .then((result) => {
                    let resultJson = JSON.parse(JSON.stringify(result))
                    if (resultJson.batFirstTeamId === resultJson.teamFirstId) {
                        resultJson.teamFirstInning.score = lastRuns + run
                        resultJson.teamFirstInning.extra = lastExtra + run
                    } else {
                        resultJson.teamSecondInning.score = lastRuns + run
                        resultJson.teamSecondInning.extra = lastExtra + run
                    }

                    database()
                        .ref(path)
                        .update({
                            teamFirstInning: resultJson.teamFirstInning,
                            teamSecondInning: resultJson.teamSecondInning,
                        })
                        .then((result) => {
                            console.log('Data updated.', result)
                        });

                    list.push("WD\n" + run)
                    this.setState({
                        runs: lastRuns + run,
                        extra: lastExtra + run,
                        currentOverRun: list
                    })
                })
        }

    }

    handleExtraRun = (text) => {
        extraRun = text
    }

    viewForExtraRun() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                style={{
                    alignSelf: 'center',
                }}
                visible={this.state.isSelectExtraModel}>
                <View style={{
                    borderColor: colors.STATUS_BAR_COLOR,
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: colors.WHITE,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                    position: 'absolute',
                    top: '30%',
                    // left: 0,
                    // right: 0,

                }}>
                    <Text
                        style={{
                            fontFamily: fontStyle.MontserratBold,
                            fontSize: 20,
                            marginTop: 10,
                            alignSelf: 'center',
                            color: colors.PRIMARY_COLOR
                        }}>{Constants.ENTER_RUN}</Text>
                    <View style={{
                        // flex: 1,
                    }}>
                        <TextInput
                            style={{
                                marginTop: 20,
                                marginEnd: 20,
                                marginStart: 20,
                                height: 50,
                                width: 100,
                                borderColor: '#76B04315',
                                borderWidth: 1,
                                paddingStart: 10,
                                textAlign: 'center',
                                fontFamily: fontStyle.MontserratRegular,
                                fontSize: 14,
                            }}
                            returnKeyType={"next"}
                            underlineColorAndroid="transparent"
                            placeholder={Constants.RUN}
                            placeholderTextColor={colors.TXT_HINT_COLOR}
                            autoCapitalize="none"
                            keyboardType={"number-pad"}
                            onChangeText={this.handleExtraRun}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginStart: 20,
                        marginTop: 20,
                        marginEnd: 20,
                        marginBottom: 8,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isSelectExtraModel: false
                                })
                            }}
                            style={{
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
                                Constants.CANCEL
                            }</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isSelectExtraModel: false
                                }, () => {
                                    this.updateRun(extraRun, 1, true, true, false)
                                })
                            }}
                            style={{
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
                                    backgroundColor: colors.STATUS_BAR_COLOR,
                                    color: colors.WHITE
                                }}>{
                                Constants.OK
                            }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }


    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 10,
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
                        }}>{this.state.battingTeamName}</Text>
                </View>
                {this.viewForExtraRun()}
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
                                    let list = this.state.bowlingTeamSquad
                                    let lastBowler = list.filter((item) => item.isBowler)
                                    let selectedBowler = list[index]

                                    // console.log("lastSelectedBowler: ",lastBowler)
                                    // console.log("selectedBowler: ",selectedBowler.id)

                                    if (selectedBowler.id === lastBowler[0].id) {
                                        // Alert.alert("You are not selected this ")
                                        return;
                                    }

                                    list.filter((item) => {
                                        item.isBowler = false
                                    })

                                    list[index].isBowler = !list[index].isBowler

                                    let path = "/liveMatchList/" + this.state.firebaseID
                                    database().ref(path)
                                        .orderByValue()
                                        .once('value')
                                        .then((result) => {
                                            let resultJson = JSON.parse(JSON.stringify(result))

                                            let currentOverBowl = 0
                                            let currentOverBowlRun = 0
                                            let currentOverBowlerOver = 0
                                            let isStyleSet = false

                                            if (this.state.bowlingTeamId === 1) {
                                                let bowlerIndex = resultJson.teamFirstSquad.findIndex(
                                                    (item) => item.id === list[index].id)
                                                let bowlerData = resultJson.teamFirstSquad.filter(
                                                    (item) => item.id === list[index].id)
                                                currentOverBowlerOver =
                                                    resultJson.teamFirstSquad[bowlerIndex].currentOverBowlerOver !== undefined ?
                                                        resultJson.teamFirstSquad[bowlerIndex].currentOverBowlerOver : 0
                                                currentOverBowl =
                                                    resultJson.teamFirstSquad[bowlerIndex].currentOverBowl !== undefined ?
                                                        resultJson.teamFirstSquad[bowlerIndex].currentOverBowl : 0
                                                currentOverBowlRun =
                                                    resultJson.teamFirstSquad[bowlerIndex].currentOverBowlRun !== undefined ?
                                                        resultJson.teamFirstSquad[bowlerIndex].currentOverBowlRun : 0
                                                isStyleSet = resultJson.teamFirstSquad[bowlerIndex].bowlingStyle === undefined ||
                                                    resultJson.teamFirstSquad[bowlerIndex].bowlingStyle === null
                                            } else {
                                                let bowlerIndex = resultJson.teamSecondSquad.findIndex(
                                                    (item) => item.id === list[index].id)
                                                let bowlerData = resultJson.teamSecondSquad.filter(
                                                    (item) => item.id === list[index].id)
                                                currentOverBowlerOver =
                                                    resultJson.teamSecondSquad[bowlerIndex].currentOverBowlerOver !== undefined ?
                                                        resultJson.teamSecondSquad[bowlerIndex].currentOverBowlerOver : 0
                                                currentOverBowl =
                                                    resultJson.teamSecondSquad[bowlerIndex].currentOverBowl !== undefined ?
                                                        resultJson.teamSecondSquad[bowlerIndex].currentOverBowl : 0
                                                currentOverBowlRun =
                                                    resultJson.teamSecondSquad[bowlerIndex].currentOverBowlRun !== undefined ?
                                                        resultJson.teamSecondSquad[bowlerIndex].currentOverBowlRun : 0
                                                isStyleSet = resultJson.teamSecondSquad[bowlerIndex].bowlingStyle === undefined ||
                                                    resultJson.teamSecondSquad[bowlerIndex].bowlingStyle === null
                                            }

                                            if (currentOverBowl >= 6) {
                                                currentOverBowl = 0
                                            }
                                            this.setState({
                                                bowlingTeamSquad: list,
                                                bowlerName: list[index].name,
                                                bowlerId: list[index].id,
                                                isSelectBowlingModel: false,
                                                isSelectBowlingStyleModel: isStyleSet,
                                                currentOverBowl: currentOverBowl,
                                                currentOverBowlRun: currentOverBowlRun,
                                                currentOverBowlerOver: currentOverBowlerOver,
                                            })
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
                                            isSelectBowlingStyleName: Constants.LEFT_ARM_FAST,
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
                                            isSelectBowlingStyleName: Constants.LEFT_ARM_MEDIUM,
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
                                        let path = "/liveMatchList/" + this.state.firebaseID
                                        database().ref(path)
                                            .orderByValue()
                                            .once('value')
                                            .then((result) => {
                                                let resultJson = JSON.parse(JSON.stringify(result))
                                                if (this.state.bowlingTeamId === 1) {
                                                    let bowlerIndex = resultJson.teamFirstSquad.findIndex(
                                                        (item) => item.id === this.state.bowlerId)
                                                    let bowlerData = resultJson.teamFirstSquad.filter(
                                                        (item) => item.id === this.state.bowlerId)
                                                    console.log("1st bowlerData", bowlerData)
                                                    resultJson.teamFirstSquad[bowlerIndex].bowlingStyle = this.state.isSelectBowlingStyleName
                                                } else {
                                                    let bowlerIndex = resultJson.teamSecondSquad.findIndex(
                                                        (item) => item.id === this.state.bowlerId)
                                                    let bowlerData = resultJson.teamSecondSquad.filter(
                                                        (item) => item.id === this.state.bowlerId)
                                                    console.log("2nd bowlerData", bowlerData)
                                                    resultJson.teamSecondSquad[bowlerIndex].bowlingStyle = this.state.isSelectBowlingStyleName
                                                }

                                                database()
                                                    .ref(path)
                                                    .update({
                                                        teamFirstSquad: resultJson.teamFirstSquad,
                                                        teamSecondSquad: resultJson.teamSecondSquad
                                                    })
                                                    .then((result) => console.log('Data updated.', result));
                                            })
                                        // this.updateBowlingIndex(list, , true)

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
                        fontSize: 45,
                        marginTop: 40,
                        alignSelf: 'center',
                        color: colors.WHITE
                    }}>{this.state.runs + "/" + this.state.wickets}</Text>
                <Text
                    style={{
                        fontFamily: fontStyle.MontserratRegular,
                        fontSize: 18,
                        // marginTop: 2,
                        alignSelf: 'center',
                        color: colors.WHITE
                    }}>{"(" + this.state.overs + "." + this.state.currentOverBowl + "/" + this.state.totalOvers + ")"}</Text>

                <Text
                    style={{
                        fontFamily: fontStyle.MontserratRegular,
                        fontSize: 13,
                        marginTop: 30,
                        alignSelf: 'center',
                        color: colors.WHITE
                    }}>{this.state.wonToss}</Text>


                <View style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    backgroundColor: colors.WHITE
                }}>
                    <View style={{
                        flex: 1,
                        marginTop: 20,
                        marginBottom: 20,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <ImageBackground
                            resizeMode={'cover'}
                            style={{
                                width: 30,
                                alignSelf: 'center',
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} source={require('../assets/images/ic_rond_gradiant.png')}>
                            <Image
                                resizeMode={'cover'}
                                style={{
                                    width: 8,
                                    height: 24,
                                }} source={require('../assets/images/ic_bat_2.png')}/>
                        </ImageBackground>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: 10,
                        }}>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 12,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{this.state.strikerName + (this.state.isStrikerSelection ? "*" : "")}</Text>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 14,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{this.state.batsman1Runs + "(" + this.state.batsman1Bowls + ")"}</Text>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        flex: 1,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <ImageBackground
                            resizeMode={'cover'}
                            style={{
                                width: 30,
                                alignSelf: 'center',
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} source={require('../assets/images/ic_rond_gradiant.png')}>
                            <Image
                                resizeMode={'cover'}
                                style={{
                                    width: 8,
                                    height: 24,
                                }} source={require('../assets/images/ic_bat_2.png')}/>
                        </ImageBackground>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: 10,
                        }}>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratMedium,
                                    fontSize: 12,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{this.state.nonStrikerName + (!this.state.isStrikerSelection ? "*" : "")}</Text>
                            <Text
                                style={{
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 14,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{this.state.batsman2Runs + "(" + this.state.batsman2Bowls + ")"}</Text>
                        </View>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: colors.PRIMARY_COLOR_LIGHT,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        marginTop: 20,
                        marginBottom: 20,
                        flex: 1,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>

                        <ImageBackground
                            resizeMode={'cover'}
                            style={{
                                width: 30,
                                alignSelf: 'center',
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} source={require('../assets/images/ic_rond_gradiant.png')}>
                            <Image
                                resizeMode={'cover'}
                                style={{
                                    width: 8,
                                    height: 24,
                                }} source={require('../assets/images/ic_bat_2.png')}/>
                        </ImageBackground>
                        <Text
                            style={{
                                marginStart: 10,
                                fontFamily: fontStyle.MontserratMedium,
                                fontSize: 12,
                                color: colors.STATUS_BAR_COLOR
                            }}>{this.state.bowlerName}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 14,
                                alignSelf: 'center',
                                color: colors.STATUS_BAR_COLOR
                            }}>{this.state.currentOverBowlerOver + "." + this.state.currentOverBowl + " -"}</Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 14,
                                alignSelf: 'center',
                                color: colors.STATUS_BAR_COLOR
                            }}>{" " + this.state.currentOverBowlRun + " -"}</Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 14,
                                alignSelf: 'center',
                                color: colors.STATUS_BAR_COLOR
                            }}>{" 0 -"}</Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: fontStyle.MontserratBold,
                                fontSize: 14,
                                alignSelf: 'center',
                                color: colors.STATUS_BAR_COLOR
                            }}>{" 0"}</Text>

                    </View>
                </View>
                <View style={{
                    backgroundColor: colors.PRIMARY_COLOR_LIGHT
                }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{
                            backgroundColor: colors.PRIMARY_COLOR_LIGHT,
                            height: 60,
                        }}
                        contentContainerStyle={{
                            width: '100%',
                            height: 40,
                            marginStart: 20,
                            backgroundColor: colors.PRIMARY_COLOR_LIGHT,
                        }}
                        data={this.state.currentOverRun}
                        renderItem={({item, index}) => (
                            <View style={{
                                width: "16%",
                                backgroundColor: colors.PRIMARY_COLOR_LIGHT
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

                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    backgroundColor: colors.WHITE
                }}>
                    <View style={{
                        width: '25%',
                        flexDirection: 'column',
                        backgroundColor: colors.WHITE,
                        alignSelf: 'flex-end'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(0, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{0}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(3, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{3}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                extraRun = 0
                                this.setState({
                                    isSelectExtraModel: true
                                })
                                //this.updateRun(1, 1, true, true)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"WD"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: '25%',
                        flexDirection: 'column',
                        backgroundColor: colors.WHITE,
                        alignSelf: 'flex-end'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(1, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{1}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(4, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{4}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(1, 1, true, true, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"NB"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '25%',
                        flexDirection: 'column',
                        backgroundColor: colors.WHITE,
                        alignSelf: 'flex-end'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(2, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{2}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(6, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{6}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(0, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "17%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"BYE"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: '25%',
                        flexDirection: 'column',
                        backgroundColor: colors.WHITE,
                        alignSelf: 'flex-end'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.updateRun(0, 0, true, false)
                                // this.undoRun()
                            }}
                            style={{
                                width: '100%',
                                padding: "13%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 18,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"UNDO"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(5, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "13%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 18,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"5,7"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(0, 1, true, false, true)
                            }}
                            style={{
                                width: '100%',
                                padding: "13%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 18,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"OUT"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateRun(1, 1, true, false, false)
                            }}
                            style={{
                                width: '100%',
                                padding: "13%",
                                borderWidth: 1,
                                borderColor: colors.PRIMARY_COLOR_LIGHT,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: fontStyle.MontserratBold,
                                    fontSize: 18,
                                    alignSelf: 'center',
                                    color: colors.STATUS_BAR_COLOR
                                }}>{"LB"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default LiveMatchScoreUpdateScreen;
