import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import InputFat from '../../components/InputFat';
import ButtonFat from '../../components/ButtonFat';

import api from '../../services/api';
import { SaveUser } from '../../services/user';

import styles from './styles';

export default ({ navigation } : any) => {

    const dispatch = useDispatch();
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
    }, []);

    async function onLogin(){
        setLoading(true);

        await api.post("/Authentication/Login", { "email": email, "password": senha })
        .then(
            (resp) => {
                SaveUser(dispatch, {
                    name: resp.data.name,
                    surname: resp.data.surname,
                    birthday: resp.data.birthday,
                    email: resp.data.email,
                    gender: resp.data.gender,
                    picture: resp.data.picture,
                    tokenJwt: resp.data.tokenJwt
                })
            },

            (reject) => {
                alert(reject.response.data.message)
            }
        )
        .finally(() => setLoading(false));
        
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
                        iconName="user"
                        value={nome}
                        onChangeText={setNome}
                        moreProps={{
                            keyboardType: "email-address"
                        }}
                        placeholder="Nome"
                    />

                    <InputFat 
                        iconName="user" 
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
                        text="Cadastrar" 
                        style={styles.btnLogin}
                        onPress={onLogin}
                        isLoading={loading}
                    />

                </View>

                {/* New User */}
        </LinearGradient>
    )
}