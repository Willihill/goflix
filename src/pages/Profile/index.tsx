import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TabNavigator from '../../components/TabNavigator';

import styles from './styles';
import ButtonFat from '../../components/ButtonFat';
import InputFat from '../../components/InputFat';
import { SaveUser } from '../../services/user';
import api from '../../services/api';
import PickerIcon from '../../components/PickerIcon';

export default ({navigation}:any) => {

    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [surName, setSurName] = useState<string>("");
    const [gender, setGender] = useState<number>(0);
    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [confirmSenha, setConfirmSenha] = useState<string>("");
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

        if(!senha){
            alert("Preencha a senha");
            return;
        }

        if(senha !== confirmSenha){
            alert("As senhas não correspondem");
            return;
        }           


        setLoading(true);

        const dataPost = { 
            "name": name,
            "surname": surName,
            "gender": ( gender === 1 ? 'M' : 'F' ),
            "birthday": `${year}-${month}-${day}`,
            "email": email,
            "password": senha
        }

        await api.post("/Authentication/Register", dataPost)
        .then(
            async (resp) => {
                await SaveUser(dispatch, {
                    name: dataPost.name,
                    surname: dataPost.surname,
                    birthday: dataPost.birthday,
                    email: dataPost.email,
                    gender: dataPost.gender,
                    picture: "",
                    tokenJwt: resp.data.tokenJwt
                });

                navigation.navigate("Main");
            },

            (reject) => {
                setLoading(false);
                alert(reject.response.data.message);
            }
        )        
    }


    return(
        <View style={styles.container}>

            <StatusBar backgroundColor="#FFF" />
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
                            text="Cadastrar" 
                            style={styles.save}
                            onPress={onRegister}
                            isLoading={loading}
                        />
                    </View>

                </View>

            {/* Tab navigator */}
            <TabNavigator />            
        </View>
    )
}