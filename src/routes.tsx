import React, {Component} from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";


import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MovieDetail from "./pages/MovieDetail";
import Player from "./pages/Player";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import ChatList from "./pages/ChatList";
import Chat from "./pages/Chat";

const StackMain = createStackNavigator({
    Dashboard,
    MovieDetail,
    Player,
    Search,
    Profile,
    Favorite,
    ChatList,
    Chat
},
{
    headerMode: 'none',
    initialRouteName: 'Dashboard'
}
);

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Register,
        Main: StackMain
    })
);

export default Routes;