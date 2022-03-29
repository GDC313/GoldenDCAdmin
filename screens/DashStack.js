import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from './LandingScreen';
import MatchDetailsScreen from "./MatchDetailsScreen";
import LiveMatchScreen from "./LiveMatchScreen";
import SplashScreen from "./SplashScreen";
import StartMatchScreen1 from "./StartMatchScreen1";
import MyTeams from "./MyTeams";
import AddTeamScreen from "./AddTeamScreen";
import AddPlayerScreen from "./AddPlayerScreen";
import TeamListScreen from "./TeamListScreen";
import SelectCaptainWicketKeeperScreen from "./SelectCaptainWicketKeeperScreen";
import TossScreen from "./TossScreen";
import StartInningScreen from "./StartInningScreen";
import LiveMatchScoreUpdateScreen from "./LiveMatchScoreUpdateScreen";

const AppAuthStack = createStackNavigator();

export function NavigationStackScreens({navigation}) {
  return (
    <AppAuthStack.Navigator>
      {/*<AppAuthStack.Screen*/}
      {/*  name="SplashScreen"*/}
      {/*  component={SplashScreen}*/}
      {/*  options={{headerShown: false}}*/}
      {/*/>*/}
      <AppAuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="MatchDetailsScreen"
        component={MatchDetailsScreen}
        options={{headerShown: true}}
      />
      <AppAuthStack.Screen
        name="LiveMatchScreen"
        component={LiveMatchScreen}
        options={{headerShown: true}}
      />
      <AppAuthStack.Screen
        name="StartMatchScreen1"
        component={StartMatchScreen1}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="TossScreen"
        component={TossScreen}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="MyTeams"
        component={MyTeams}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="AddTeamScreen"
        component={AddTeamScreen}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="AddPlayerScreen"
        component={AddPlayerScreen}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="TeamListScreen"
        component={TeamListScreen}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="SelectCaptainWicketKeeperScreen"
        component={SelectCaptainWicketKeeperScreen}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="StartInningScreen"
        component={StartInningScreen}
        options={{headerShown: false}}
      />
      <AppAuthStack.Screen
        name="LiveMatchScoreUpdateScreen"
        component={LiveMatchScoreUpdateScreen}
        options={{headerShown: false}}
      />
    </AppAuthStack.Navigator>
  );
}

export function DashStack({navigation}) {
  return (
    <AppAuthStack.Navigator mode="modal">
      {/*Navigation push animation stack*/}
      <AppAuthStack.Screen
        name="DashStack"
        component={NavigationStackScreens}
        options={{headerShown: false}}
      />
    </AppAuthStack.Navigator>
  );
}
