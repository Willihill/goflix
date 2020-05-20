import React, { useEffect, useState, useRef } from 'react';
import { View, StatusBar, Text, ImageBackground, TextInput, ActivityIndicator } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { MessageType } from './types';
import styles from './styles';
import TabNavigator from '../../components/TabNavigator';

import api from '../../services/api';
import { openConnection, identifieUser, closeConnection, onReceivedMessage, sendMessage, onStatusMessageSent, onDisconnect, onError, onConnectError } from '../../services/socket';

import { UserChatType } from '../ChatList/types';
import { UserReducer } from '../../store/ducks/user';

export default ({ navigation }: any) => {
    
    const user: UserReducer = useSelector((store:any) => store.user);
    const refList = useRef(null);

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [chat, setChat] = useState<number>(navigation.getParam("chat"));
    const [userChat, setUserChat] = useState<UserChatType>({});
    const [message, setMessage] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);
    const [userName, setUserName] = useState<string>("");
    const [mens, setMens] = useState<[]>([]);
    const [men, setMen] = useState<MessageType>({});
    const [connected, setConnected] = useState<boolean>(false);
    const [connecting, setConnecting] = useState<boolean>(false);
    const [connectError, setConnectError] = useState<boolean>(false);
    const [loadMessagesError, setLoadMessagesError] = useState<boolean>(false);

    useEffect(() => 
    {
        if(!men.id)
            return;

        setMessages([ ...messages, ...[men] ]);
        refList.current.scrollToEnd();
    },[men]);

    useEffect(() => {
        setChat(navigation.getParam("chat"));
        setUserChat(navigation.getParam("user"));

        (async () => {
            await onLoadMessages();

            onConnectError((error: any) => {
                //console.log("Não conseguiu se conectar: ", error);
                setConnectError(true);
                setConnecting(false);
            });
        })();

        //if(userId === 0)
        setUserId(user.id);

        //if(!userName)
        setUserName(user.name);

        // Fecha a conexão com o socket quando sai da página
        return () => {
            closeConnection();
        }
        
    }, []);

    async function onLoadMessages(){
        setLoading(true);
        await api.get(`/Chat/${chat}/Messages`)
        .then(
            (resp) => {
                // Remove a flag de erro ao carregar as mensagens
                setLoadMessagesError(false);

                // Remove o Loading
                setLoading(false);

                // Criando a data como objeto
                resp.data.forEach((item: MessageType) => {
                    item.date = new Date(item.date);
                });

                setMessages(resp.data);

                // Após pegar as mensagens, conecta com o socket
                setConnecting(true);
                openConnection(() => {
                    // Remove a flag de conectando
                    setConnecting(false);

                    // Remove a flag de erro ao carregar as mensagens
                    setLoadMessagesError(false);

                    // Marca a flag de conectado
                    setConnected(true);

                    // Identifica o usuario após se connectar
                    identifieUser(user.id, user.name);

                    // Função para o evento de recebimento de mensagens do server
                    onReceivedMessage(receptMessage);
                    
                    // Função para o evento de recebimento do status da mensagem enviada
                    onStatusMessageSent(onReceptStatusMessageSent);

                    // Função para o evento de desconexão com o server
                    onDisconnect((reason) => {
                        alert(`A conexão com o servidor de chat foi perdida. Motivo: ${reason}`);
                        navigation.pop();
                    });

                    // Função para o evento de erro com o server
                    onError((error: any) => console.log('Erro no socket: ', error));

                    refList.current.scrollToEnd();
                });
            },

            (reject) => {
                // Marca a flag de erro ao carregar as mensagens
                setLoadMessagesError(true);

                console.log("Erro ao carregar as mensagens: ", reject.response.data.message, reject);
            }
        )
    }

    const renderChat = (message: MessageType) => 
        <View 
            style={
                {
                    justifyContent: ( message.isMyMessage ? 'flex-end' : 'flex-start' ), 
                    flexDirection: ( message.isMyMessage ? 'row' : 'row-reverse' ),
                    alignItems: 'center',
                    marginBottom: 10
                }} 
            key={message.id} >
            <View style={{flex: 1 }} />
            <Text style={styles.messageDate}>{`${message.date.getUTCDate()}/${message.date.getUTCMonth()} ${message.date.getUTCHours()}:${message.date.getUTCMinutes()}`}</Text>
            <View style={[styles.chat, ( message.isMyMessage ? styles.myMessage : styles.message )]}>
                <Text style={styles.messageText}>{message.message}</Text>
            </View>
        </View>

    function onSendMessage(){
        if(!(!loading && !connectError && connected))
            return;

        if(!message)
            return;

        setMessage("");
        sendMessage(chat, userChat.id, message, new Date(Date.now()));
    }

    function receptMessage(message: MessageType){
        console.log(`Recebeu a mensagem: `, message);
        setMen(message);
    }

    function onReceptStatusMessageSent(message: MessageType){
        setMen(message);
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#222230" barStyle="light-content" />

            {/* Cabeçalho */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.pop()} style={styles.headerBack}>
                    <Ionicons name="ios-arrow-back" style={styles.back} />
                    <View style={styles.picture}>
                        { userChat.picture
                        ?
                            <ImageBackground 
                                source={{
                                    uri: `data:image/png;base64,${userChat.picture}`
                                }}
                                resizeMode="stretch"
                                resizeMethod="resize"
                                style={styles.picture} 
                            />
                        :
                            <AntDesign name="user" size={15} color="#FFF" />
                        }
                    </View>
                </TouchableOpacity>

                <Text style={styles.headerName}>
                    <Text style={styles.userName}>{userChat.name}</Text>
                </Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                { (loading || connecting) &&
                    <>
                        <ActivityIndicator color="#5e45f7" size={70} />
                        { connecting && <Text style={styles.textBody}>Connectando com o servidor de chat</Text>}
                    </>
                }

                { connectError &&
                    <>
                        <AntDesign name="disconnect" color="#EEE" size={60} />
                        <Text style={styles.textBody}>Sem conexão com o servidor de chat</Text>
                    </>
                }

                { loadMessagesError &&
                    <>
                        <MaterialCommunityIcons name="message-bulleted-off" color="#EEE" size={60} />
                        <Text style={styles.textBody}>Erro ao carregar as mensagens</Text>
                    </>
                }
                
                { (!loading && !connectError && !loadMessagesError && connected) &&
                    <FlatList
                        ref={refList}
                        keyExtractor={(item, index) => item?.id.toString()}
                        data={messages}
                        renderItem={({ item }) => renderChat(item)}
                        horizontal={false}
                        showsVerticalScrollIndicator={true}
                        style={{ flex: 1, alignSelf: 'stretch' }}
                        //onViewableItemsChanged={() => refList.current.scrollToEnd()}
                        contentContainerStyle={{
                            padding: 10
                        }}
                    />
                }
            </View>

            {/* Send New Message */}
            <View style={styles.newMessage}>
                <TextInput
                    style={styles.inputMessage}
                    placeholder="Digite uma nova mensagem..."
                    value={message}
                    onChangeText={(value) => setMessage(value)}
                    editable={(!loading && !connectError && connected)}
                />
                <TouchableOpacity onPress={onSendMessage}>
                    <FontAwesome name="send-o" style={styles.sendMessage} />
                </TouchableOpacity>
            </View>
        </View>
    )
}