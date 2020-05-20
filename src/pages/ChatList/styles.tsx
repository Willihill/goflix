import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#373855'
    },

    header: {
        paddingVertical: 10

    },

    title: {
        color: "#FFF",
        fontSize: 24,
        textAlign: 'center'
    },

    chat: {
        //backgroundColor: 'rgba(255, 255, 255, 0.7)',
        flex: 1,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    picture: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },

    userName: {
        fontSize: 15,
        color: '#FFF',
        marginLeft: 20
    }
});