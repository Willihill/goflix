import React, { useEffect } from 'react';
import { View, TextInput, StyleProp, TextStyle, TouchableOpacity, AsyncStorage } from "react-native";
import { useNavigation } from 'react-navigation-hooks';

import { AntDesign, Octicons } from "@expo/vector-icons";

import styles from './styles';

export default () => {

    const navigation = useNavigation();

    useEffect(() => {
        //console.log(navigation.state.routeName)
    }, [])

    async function onLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <AntDesign name="hearto" style={[styles.icon, (navigation.state.routeName === 'Favorite' ? styles.iconActive : {})]} 
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <AntDesign name="search1" style={[styles.icon, (navigation.state.routeName === 'Search' ? styles.iconActive : {})]}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                <Octicons name="home" style={[styles.icon, (navigation.state.routeName === 'Dashboard' ? styles.iconActive : {}) ]} 
                />
            </TouchableOpacity>

            <TouchableOpacity>
                <AntDesign name="user" style={[styles.icon, (navigation.state.routeName === 'Profile' ? styles.iconActive : {}) ]} 
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={onLogout} >
                <AntDesign name="logout" style={[styles.icon, { color: 'red' }]} />
            </TouchableOpacity>
        </View>
    )
}