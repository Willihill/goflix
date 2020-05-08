import React from 'react';
import { View, TextInput, StyleProp, TextStyle } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import styles from './styles';

type InputFatProps = {
    iconName: string,
    value?: string,
    placeholder: string,
    onChangeText?: (text: string) => void,
    style?: StyleProp<TextStyle>,
    moreProps?: any,
    isPassword?: boolean
}

export default (props: InputFatProps) => {

    return(
        <View style={[styles.container, props.style]}>
            <AntDesign 
                name={props.iconName} 
                style={styles.icon} 
            />
            
            <TextInput 
                style={styles.input}
                value={props.value}
                {...props.moreProps}
                placeholder={props.placeholder}
                placeholderTextColor="#70aff0"
                onChangeText={props.onChangeText}
                secureTextEntry={props.isPassword}
            />
        </View>
    )
}