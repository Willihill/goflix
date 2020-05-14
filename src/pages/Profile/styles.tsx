import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },

    containerPicture: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 70,
        backgroundColor: '#eee'
    },

    picture: {
        flex: 1,
        width: 120,
        height: 120,
        borderRadius: 70,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    iconRemove: {
        position: 'absolute',
        right: 20,
        bottom: -10,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 50
    },

    iconCamera: {
        position: 'absolute',
        right: -10,
        bottom: 15,
        backgroundColor: '#5e45f7',
        padding: 8,
        borderRadius: 50
    },

    form: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 30,
        justifyContent: "flex-start",
        alignSelf: "stretch",
        marginTop: 50
    },

    input:{
        backgroundColor: '#EEE'
    },

    save: {
        marginTop: 20,
        flex: 1
    }
});