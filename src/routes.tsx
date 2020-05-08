import React, {Component} from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";


import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { RotationGestureHandler } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    cntButton:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

function TabButtonComponent(props: any){
    return(
        <TouchableOpacity style={styles.cntButton} onPress={props.onPress}>
            { props.route.key === "Perfil"  && <FontAwesomeIcon name="user-o" size={(props.focused ? 22 : 15)}/> }
            { props.route.key === "Mapa"    && <FontAwesomeIcon name="map-o" size={(props.focused ? 22 : 15)}/> }
            { props.route.key === "Sair"    && <MaterialCommunityIcons name="logout" size={20} color="#e87979" /> }
        </TouchableOpacity>
    )
}

const TabNavMain = createBottomTabNavigator(
{
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarButtonComponent: TabButtonComponent
        }
    },

}, 
{
    tabBarOptions: {
        activeTintColor: "#000",
        inactiveTintColor: "#EEE",
        labelStyle: {
            fontSize: 13
        },
        style:{
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center'
        },
        showLabel: false
    },
    initialRouteName: "Dashboard",
    tabBarComponent: (props: any) => {
        return(
            <View style={{
                width: 30,
                height: 10,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "row"
            }}>
                <View >

                </View>
            </View>
        )
    }
});


const SwitchMain = createSwitchNavigator({
    Dashboard
});

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Register,
        Main: SwitchMain
    })
);

export default Routes;