import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, ImageBackground } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { ChatType } from './types';
import styles from './styles';
import TabNavigator from '../../components/TabNavigator';
import api from '../../services/api';

import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

export default ({ navigation }: any) => {

    const [chats, setChats] = useState<ChatType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await onLoadMessages();
        })();
    }, [])

    async function onLoadMessages(){
        await api.get('/Chat')
        .then(
            (resp) => {
                setChats(resp.data);
            },

            (reject) => {
                console.log("Erro ao carregar as mensagens: ", reject.response.data.message, reject);
            }
        )
    }

    const renderChat = (chat: ChatType) => 
        <TouchableHighlight key={chat.id.toString()} style={styles.chat} onPress={() => navigation.navigate("Chat", { chat: chat.id, user: chat.user })} >
            <>
                {/* Picture User */}
                <View style={styles.picture}>
                    { chat.user.picture
                    ?
                        <ImageBackground 
                            source={{
                                uri: `data:image/png;base64,${chat.user.picture}`
                            }}
                            resizeMode="stretch"
                            resizeMethod="resize"
                            style={styles.picture} 
                        />
                    :
                        <AntDesign name="user" size={20} color="#FFF" />
                    }
                </View>
                <Text style={styles.userName}> {chat.user.name} </Text>
            </>
        </TouchableHighlight>

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#373855" barStyle="light-content" />

            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.title}>Conversas</Text>
            </View>

            <FlatList
                keyExtractor={(item, index) => item?.id.toString()}
                data={chats}
                renderItem={({ item }) => renderChat(item)}
                horizontal={false}
                showsVerticalScrollIndicator={true}

            />

            {/* Tab Navigator */}
            <TabNavigator />
        </View>
    )
}