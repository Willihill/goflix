import React, { ReactComponentElement } from 'react';
import { View, TextInput, StyleProp, TextStyle, NativeComponent } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import styles from './styles';

type InputFatProps = {
    iconName: string,
    value?: string,
    placeholder: string,
    onChangeText?: (text: string) => void,
    style?: StyleProp<TextStyle>,
    moreProps?: any,
    isPassword?: boolean,
    maxLength?: number,
    iconComponent?: any
}

export default (props: InputFatProps) => {

    return(
        <View style={[styles.container, props.style]}>
            { props.iconComponent 
            ?
                <props.iconComponent name="email" style={styles.icon} />
            :
                <AntDesign 
                    name={props.iconName}
                    style={styles.icon} 
                />
            }
            
            <TextInput 
                style={styles.input}
                value={props.value}
                maxLength={props?.maxLength ?? 9999}
                {...props.moreProps}
                placeholder={props.placeholder}
                placeholderTextColor="#70aff0"
                onChangeText={props.onChangeText}
                secureTextEntry={props.isPassword}
            />
        </View>
    )
}