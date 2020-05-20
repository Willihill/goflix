import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StatusBar, Image, TouchableOpacityBase, ImageBackground, ScrollView, AsyncStorage } from 'react-native';

import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import TabNavigator from '../../components/TabNavigator';

import styles from './styles';
import ButtonFat from '../../components/ButtonFat';
import InputFat from '../../components/InputFat';
import { SaveUser } from '../../services/user';
import api from '../../services/api';
import PickerIcon from '../../components/PickerIcon';
import { UserReducer } from '../../store/ducks/user';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

export default ({navigation}:any) => {

    const dispatch = useDispatch();
    const userRedux:UserReducer = useSelector<any, UserReducer>((store:any) => store.user);

    const [name, setName] = useState<string>("");
    const [surName, setSurName] = useState<string>("");
    const [gender, setGender] = useState<number>(0);
    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [confirmSenha, setConfirmSenha] = useState<string>("");
    const [picture, setPicture] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const genders : any = [
        {
            label: "Genero",
            value: 0
        },
        {
            label: "Masculino",
            value: 1
        },
        {
            label: "Feminino",
            value: 2
        }
    ];

    useEffect(() => {
        // Carregando os dados do Redux
        const year = userRedux.birthday.substr(0, 4);
        const month = userRedux.birthday.substr(5, 2);
        const day = userRedux.birthday.substr(8, 2);

        setName(userRedux.name);
        setSurName(userRedux.surname);
        setGender((userRedux.gender === 'M' ? 1 : 2));
        setDay(day);
        setMonth(month);
        setYear(year);
        setEmail(userRedux.email);
        setPicture(userRedux.picture);
    }, []);

    async function onRegister(){
        if(!name){
            alert("Preencha o nome");
            return;
        }

        if(!surName){
            alert("Preencha o sobrenome");
            return;
        }

        if(gender === 0){
            alert("Preencha o genero");
            return;
        }

        if(!day){
            alert("Preencha o dia de nascimento");
            return;
        }

        if(!month){
            alert("Preencha o mês de nascimento");
            return;
        }

        if(!year){
            alert("Preencha o ano de nascimento");
            return;
        }

        if(!email){
            alert("Preencha o e-mail");
            return;
        }

        if(senha || confirmSenha){
            if(!senha){
                alert("Preencha a senha");
                return;
            }
    
            if(senha !== confirmSenha){
                alert("As senhas não correspondem");
                return;
            }
        }

        setLoading(true);

        const dataPost = { 
            "name": name,
            "surname": surName,
            "gender": ( gender === 1 ? 'M' : 'F' ),
            "birthday": `${year}-${month}-${day}`,
            "email": email,
            "password": senha,
            "picture": picture
        }

        await api.put("/Account", dataPost)
        .then(
            async (resp) => {
                await SaveUser(dispatch, {
                    name: dataPost.name,
                    surname: dataPost.surname,
                    birthday: dataPost.birthday,
                    email: dataPost.email,
                    gender: dataPost.gender,
                    picture: picture,
                    tokenJwt: userRedux.tokenJwt
                });

                setLoading(false);
            },

            (reject) => {
                setLoading(false);
                console.log(reject.response);
                alert('Erro ao salvar os dados.');
            }
        )        
    }

    async function onChangePicture(){
        //var resp = await ImagePicker.requestCameraRollPermissionsAsync();
        // if(!resp.granted)
        //     return;

        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            allowsEditing: true,
            base64: true
        });

        if(image.base64)
            setPicture(image.base64)
    }

    function onRemovePicture(){
        setPicture('');
    }

    async function onLogout(){
        await AsyncStorage.clear();
        navigation.navigate("Login");
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFF" />
                <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 30 }}>
                    {/* Picture */}
                    <View style={styles.containerPicture}>
                        { picture
                        ?
                            <ImageBackground 
                                source={{
                                    uri: `data:image/png;base64,${picture}`
                                }}
                                resizeMode="stretch"
                                resizeMethod="resize"
                                style={styles.picture} 
                            />
                        :
                            <AntDesign name="user" size={40} color="gray" />
                        }

                        {/* Remover foto */}
                        <View style={styles.iconRemove} >
                            <TouchableOpacity onPress={onRemovePicture} >
                                <Feather
                                    name="camera-off" 
                                    size={15}
                                    color="#FFF"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Mudar foto */}
                        <View style={styles.iconCamera} >
                            <TouchableOpacity onPress={onChangePicture} >
                                <Feather
                                    name="camera" 
                                    size={15}
                                    color="#FFF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form login */}
                    <View style={styles.form}>
                        <View style={{ flexDirection: 'row' }}>
                            <InputFat 
                                iconName="user"
                                value={name}
                                onChangeText={setName}
                                placeholder="Nome"
                                backgroundColor="#EEE"
                                style={{ flex: 1, marginRight: 10 }}
                            />

                            <InputFat 
                                iconName="user" 
                                value={surName}
                                onChangeText={setSurName}
                                placeholder="Sobrenome"
                                backgroundColor="#EEE"
                                style={{ flex: 1 }}
                            />
                        </View>

                        <PickerIcon
                            IconName="user" 
                            Itens={genders}
                            PropsPicker={
                                {
                                    mode: 'dropdown',
                                    selectedValue: gender,
                                    onValueChange: (itemValue: string, position: number) => setGender(Number.parseInt(itemValue))
                                }
                            }
                            StyleContainer={{
                                marginTop: 10,
                                backgroundColor: "#EEE"
                            }}
                        />

                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                            <InputFat
                                iconName="calendar"
                                value={day}
                                onChangeText={setDay}
                                placeholder="Dia"
                                maxLength={2}
                                backgroundColor="#EEE"
                                moreProps={{
                                    keyboardType: "numeric"
                                }}
                                style={{
                                    flex: 1
                                }}
                            />
                            <InputFat
                                iconName="calendar"
                                value={month}
                                onChangeText={setMonth}
                                placeholder="Mês"
                                maxLength={2}
                                moreProps={{
                                    keyboardType: "numeric"
                                }}
                                style={{
                                    marginLeft: 2,
                                    flex: 1
                                }}
                                backgroundColor="#EEE"
                            />
                            <InputFat
                                iconName="calendar"
                                value={year}
                                onChangeText={setYear}
                                placeholder="Ano"
                                maxLength={4}
                                moreProps={{
                                    keyboardType: "numeric"
                                }}
                                style={{
                                    marginLeft: 2,
                                    flex: 1
                                }}
                                backgroundColor="#EEE"
                            />
                        </View>


                        <InputFat 
                            iconName="email"
                            iconComponent={MaterialCommunityIcons}
                            value={email}
                            onChangeText={setEmail}
                            moreProps={{
                                keyboardType: "email-address"
                            }}
                            style={{
                                marginTop: 10
                            }}
                            placeholder="E-mail"
                            backgroundColor="#EEE"
                            disabled={true}
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
                            backgroundColor="#EEE"
                        />

                        <InputFat
                            iconName="lock"
                            value={confirmSenha}
                            onChangeText={setConfirmSenha}
                            style={{
                                marginTop: 10
                            }}
                            placeholder="Confirmar senha"
                            isPassword={true}
                            backgroundColor="#EEE"
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <ButtonFat 
                                text="Salvar"
                                style={styles.save}
                                onPress={onRegister}
                                isLoading={loading}
                                backgroundColor='#5e45f7'
                            />
                        </View>

                    </View>

                    <ButtonFat 
                        text="Logout"
                        style={styles.save}
                        onPress={onLogout}
                        isLoading={false}
                        backgroundColor='red'
                    />
                </ScrollView>

            {/* Tab navigator */}
            <TabNavigator />            
        </View>
    )
}