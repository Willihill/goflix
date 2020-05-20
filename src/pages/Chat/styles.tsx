import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#373855'
    },

    header: {
        flexDirection: 'row',
        backgroundColor: '#222230',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },

    headerBack: {
        flexDirection: 'row', 
        alignItems: 'center', 
        zIndex: 99
    },

    back: {
        fontSize: 22,
        color: '#FFF',
        marginRight: 10
    },

    headerName: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
        zIndex: -1
    },

    title: {
        color: "#FFF",
        fontSize: 24,
        textAlign: 'center'
    },

    picture: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },

    userName: {
        fontSize: 15,
        color: '#FFF'
    },

    chat: {
        //flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },

    message: {
        backgroundColor: '#47476b',
        alignSelf: 'flex-start',
    },

    myMessage: {
        backgroundColor: '#5e45f7',
        alignSelf: 'flex-end',
    },

    messageText: {
        color: "#FFF",
        fontSize: 15
    },

    messageDate: {
        color: "#EEE",
        fontSize: 7,
        marginHorizontal: 10
        //flex: 1
    },

    newMessage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    inputMessage: {
        flex: 1,
        color: '#FFF',
        fontSize: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10
    },

    sendMessage: {
        fontSize: 22,
        marginLeft: 10,
        color: "#FFF"
    },

    textBody: {
        marginTop: 10,
        fontSize: 12,
        fontFamily: "Roboto Light",
        color: "#FFF",
    }
});