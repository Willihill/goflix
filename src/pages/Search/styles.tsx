import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 10,
        backgroundColor: '#EEE'
    },

    searchBar: {
        backgroundColor: '#5e45f7',
        //backgroundColor: '#FFF',
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 20,
            height: 50,
        },
        shadowOpacity: 0,
        shadowRadius: 30.00,

        elevation: 10,
    },

    input: {
        fontSize: 13,
        color: '#FFF',
        fontFamily: 'Roboto Light',
        flex: 1
    },

    search: {
        fontSize: 15,
        color: '#FFF'
    },

    movie: {
        flex: 1,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#D9D9D9',
        margin: 2,
        height: 120,
        justifyContent: 'center',
        alignItems: 'stretch'
    }
});