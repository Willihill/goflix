import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage, Image, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import InputFat from '../../components/InputFat';
import ButtonFat from '../../components/ButtonFat';

import api from '../../services/api';
import { SaveUser } from '../../services/user';

import styles from './styles';

export default ({ navigation } : any) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { height } = Dimensions.get('window');

    useEffect(() => {

        // Carregando dados do usaurio do AsyncStorage
        (async () => {
            const token = await AsyncStorage.getItem('tokenJwt');
            if(!token)
                return;

            await SaveUser(dispatch, {
                id: parseInt((await AsyncStorage.getItem("user_id")) ?? '0'),
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
                    id: resp.data.id,
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
        <ScrollView  
            //emulateUnlessSupported={false}
            //behavior="padding" 
            //enabled={true} 
            //keyboardVerticalOffset={1}
            style={styles.container}
            contentContainerStyle={{ height: height }}
        >
            <StatusBar backgroundColor="#373855" barStyle="light-content" />
                {/* Form login */}
                <View style={styles.cntLogin}>
                    {/* Logo */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/logo_500x5001.png')}
                            resizeMode="center"
                            resizeMethod="resize"
                            style={{ width: 200, height: 200 }}
                        />
                    </View>

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
                <View style={{ justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <Text style={{ color: '#FFF', fontSize: 14 }}>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{ color: '#5e45f7', fontSize: 14 }}>Cadastre-se agora</Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
    )
}