// const ws = new WebSocket('http://192.168.0.101:3000');
// export default ws;

import { MessageType } from "../pages/Chat/types";

//import io from 'socket.io-client/dist/socket.io';
const io = require('socket.io-client');
//http://192.168.0.101:3000
//https://goflixchat.herokuapp.com/
const socket = io('https://goflixchat.herokuapp.com', { 
        // forceJSONP: false,
        // jsonp: false,
        // autoConnect: false,
        reconnection: false,
        forceNew: true,
        // transports: ['websocket'],
        // rememberUpgrade: true
});

socket.on('reconnecting', (attemptNumber: number) => {
    console.log(`Se reconnectou ${attemptNumber}`);
});

export function openConnection(callback: () => void){
    if(socket.connected){
        // socket.disconnect();
        // socket.close();
        callback();
        return;
    }
    // socket.io.opts = { 
    //     // forceJSONP: false,
    //     // jsonp: false,
    //     // autoConnect: false,
    //     // reconnection: false,
    //     forceNew: true,
    //     // transports: ['websocket'],
    //     // rememberUpgrade: true
    // }
    //console.log(socket.io.opts, socket.connected);
    socket.open();
    socket.connect();

    if(socket.hasListeners('connect')){
        socket.off('connect');
    }

    socket.on('connect', () => {
        callback();
        //console.log(socket.io.opts);
    });
}

export function closeConnection(){
    // Caso nçao esteja conectado, naõ deve fazer nada
    if(!socket.connected)
        return;

    socket.disconnect();
    const socketClose = socket.close();
}

export function identifieUser(id: number, name: string){
    socket.emit('setUser', { id: id, name: name });
}

export function sendMessage(chat: number, to: number, message: string, date: Date){
    //socket.em
    socket.emit('message', {
        message: message,
        //to: userChat.id,
        to: to,
        chatId: chat,
        date: date
    });
}

export function onReceivedMessage(callback: (message: MessageType) => void){
    if(socket.hasListeners('receivedMessage')){
        socket.off('receivedMessage');
    }

    socket.on('receivedMessage', (data:any) => {
        console.log('Recebeu nova mensagem')
        //setMessages({[ ...messages, ...{id: messages.length+3, isMyMessage: false, message: data.message } ]});
        //setMessages([ { id: messages.length+3, isMyMessage: false, message: data.message, date: new Date('2020-05-01') }]);

        callback({ id: Math.random()*10 , isMyMessage: false, message: data.message, date: new Date(data.date) });
        //console.log([ ...messages, ...[{ id: messages.length+5, isMyMessage: false, message: data.message, date: new Date('2020-05-01') }], ...[{ id: messages.length+4, isMyMessage: false, message: data.message, date:  new Date('2020-05-01') }] ]);
    });
}

export function onStatusMessageSent(callback: (message: MessageType) => void){
    if(socket.hasListeners('statusMessageSent')){
        socket.off('statusMessageSent');
    }

    socket.on('statusMessageSent', (data:any) => {
        console.log('Status da mensagem enviada', data);
        //setMessages({[ ...messages, ...{id: messages.length+3, isMyMessage: false, message: data.message } ]});
        //setMessages([ { id: messages.length+3, isMyMessage: false, message: data.message, date: new Date('2020-05-01') }]);

        callback({ id: Math.random()*10 , isMyMessage: true, message: data.message, date: new Date(data.date) });
        //console.log([ ...messages, ...[{ id: messages.length+5, isMyMessage: false, message: data.message, date: new Date('2020-05-01') }], ...[{ id: messages.length+4, isMyMessage: false, message: data.message, date:  new Date('2020-05-01') }] ]);
    });
}

export function onDisconnect(callback: (reason: string) => void){
    if(socket.hasListeners('disconnect')){
        socket.off('disconnect');
    }

    socket.on('disconnect', (reason: string) => {
        //'io server disconnect' or 'io client disconnect'
        if(reason !== 'io client disconnect')
            callback(reason);
    });
}

export function onError(callback: (error: any) => void){
    if(socket.hasListeners('error')){
        socket.off('error');
    }
    
    socket.on('error', (error: any) => {
        //'io server disconnect' or 'io client disconnect'
        callback(error);
    });
}

export function onConnectError(callback: (error: any) => void){
    if(socket.hasListeners('connect_error')){
        socket.off('connect_error');
    }
    
    socket.on('connect_error', (error: any) => {
        //'io server disconnect' or 'io client disconnect'
        callback(error);
    });
}