import React from 'react';
import { View, TextInput, StyleProp, TextStyle, TouchableOpacity, AsyncStorage } from "react-native";

import { AntDesign, EvilIcons, Octicons, Ionicons } from "@expo/vector-icons";

import styles from './styles';

type InputFatProps = {
    navigation: any
}

export default (props: InputFatProps) => {

    async function onLogout(){
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <AntDesign name="hearto" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity>
                <AntDesign name="search1" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Octicons name="home" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity>
                <AntDesign name="user" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onLogout} >
                <AntDesign name="logout" style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}