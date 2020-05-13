import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },

    form: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
    },

    input:{
        backgroundColor: '#EEE'
    },

    save: {
        marginTop: 20,
        flex: 1
    }
});