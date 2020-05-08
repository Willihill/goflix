import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import InputFat from '../../components/InputFat';
import ButtonFat from '../../components/ButtonFat';
import TabNavigator from '../../components/TabNavigator';

import api from '../../services/api';
import { SaveUser } from '../../services/user';

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

export default ({ navigation } : any) => {

    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    return(
        <LinearGradient
          colors={['#FFF', '#FFF']}
          style={styles.container}
        >
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

            <ScrollView>
                {/* Logo */}
                <Text style={{ fontFamily: "Cream Cake", fontSize: 60, color: '#59caef' }}>GoFlix</Text>

            </ScrollView>

            {/* Tab navigator control */}
            <TabNavigator navigation={navigation}/>
        </LinearGradient>
    )
}