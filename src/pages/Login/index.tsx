import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import InputFat from '../../components/InputFat';
import ButtonFat from '../../components/ButtonFat';

import api from '../../services/api';
import { SaveUser } from '../../services/user';

import styles from './styles';

export default ({ navigation } : any) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("a");
    const [senha, setSenha] = useState<string>("a");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        // Carregando dados do usaurio do AsyncStorage
        (async () => {
            const token = await AsyncStorage.getItem('tokenJwt');
            if(!token)
                return;

            await SaveUser(dispatch, {
                name: (await AsyncStorage.getItem("user_name")) ?? '',
                surname: (await AsyncStorage.getItem("user_surname")) ?? '',
                birthday: (await AsyncStorage.getItem("user_birthday")) ?? '',
                email: (await AsyncStorage.getItem("user_email")) ?? '',
                gender: (await AsyncStorage.getItem("user_gender")) ?? '',
                picture: (await AsyncStorage.getItem("user_picture")) ?? '',
                tokenJwt: (await AsyncStorage.getItem("tokenJwt")) ?? ''
            })

            navigation.navigate("Main");
        })();

    }, []);

    async function onLogin(){
        setLoading(true);

        await api.post("/Authentication/Login", { "email": email, "password": senha })
        .then(
            async (resp) => {
                await SaveUser(dispatch, {
                    name: resp.data.name,
                    surname: resp.data.surName,
                    birthday: resp.data.birthday,
                    email: resp.data.email,
                    gender: resp.data.gender,
                    picture: resp.data.picture ?? "",
                    tokenJwt: resp.data.tokenJwt
                });

                navigation.navigate("Main");
            },

            (reject) => {
                alert(reject.response.data.message)
                setLoading(false)
            }
        )
        
    }

    return(
        <LinearGradient
          colors={['#518dcb', '#59caef']}
          style={styles.container}
        >
            <StatusBar backgroundColor="#518dcb" barStyle="light-content" />
                {/* Logo */}

                {/* Form login */}
                <View style={styles.cntLogin}>
                    <InputFat 
                        iconComponent={MaterialCommunityIcons}
                        iconName="email" 
                        value={email}
                        onChangeText={setEmail}
                        moreProps={{
                            keyboardType: "email-address"
                        }}
                        placeholder="E-mail"
                    />

                    <InputFat 
                        iconName="lock"
                        value={senha}
                        onChangeText={setSenha}
                        style={{
                            marginTop: 10
                        }}
                        placeholder="Senha"
                        isPassword={true}
                    />

                    <ButtonFat 
                        text="Login" 
                        style={styles.btnLogin}
                        onPress={onLogin}
                        isLoading={loading}
                    />

                </View>

                {/* New User */}
                <View style={{ justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row', paddingBottom: 50 }}>
                    <Text style={{ color: '#FFF', fontSize: 14 }}>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{ color: '#0e84b6', fontSize: 14 }}>Cadastre-se agora</Text>
                    </TouchableOpacity>
                </View>
        </LinearGradient>
    )
}