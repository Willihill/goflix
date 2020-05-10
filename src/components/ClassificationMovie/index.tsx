import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ImageBackground } from 'react-native';

import styles from './styles';

export default ({ classification } : any) => {

    const [backColor, setBackColor] = useState<string>('green');

    useEffect(() => {
        let classNumber = parseInt(classification);

        if(classNumber < 18){
            setBackColor('green');
        }else if(classNumber >= 18 && classNumber <= 21){
            setBackColor('orange');
        }else{
            setBackColor('green');
        }            
        
    },[classification]);

    return(
        <View style={[styles.container, {backgroundColor: backColor}]}>
            <Text style={styles.text}>{classification}</Text>
        </View>
    )
}