import React from 'react';
import { TouchableOpacity, Text, StyleProp, TextStyle, GestureResponderEvent, ActivityIndicator } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import styles from './styles';

type ButtonFatProps = {
    text: string,
    onPress?: (text: GestureResponderEvent) => void,
    style?: StyleProp<TextStyle>,
    moreProps?: any,
    isLoading: boolean
}

export default (props: ButtonFatProps) => {

    return(
        <TouchableOpacity 
            {...props.moreProps}
            onPress={props.onPress}
            style={[styles.container, props.style]}
        >
            { props.isLoading
            ?
                <ActivityIndicator color="#fff" />
            :
                <Text style={styles.text}>{props.text}</Text>
            }
            
        </TouchableOpacity>
    )
}