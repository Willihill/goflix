import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        //backgroundColor: 'red',
        marginTop: 20,
        //height: 150
    },

    title: {
        color: 'gray',
        fontSize: 18,
        fontFamily: 'Roboto Light',
        paddingLeft: 20,
        marginBottom: 10
    },

    cntMovie: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        marginLeft: 20,
        backgroundColor: '#EEE',
        width: 120,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 12,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 28,
    }
});