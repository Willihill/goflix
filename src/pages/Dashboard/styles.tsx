import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch"
    },

    logo: {
        fontFamily: "Cream Cake", 
        fontSize: 60, 
        color: '#5e45f7', 
        textAlign: 'center',
        marginTop: 10
    },

    cntDestaque: {
        marginLeft: 20,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'center',
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 12,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 18,
    },

    cntList: {
        //flex: 1,
        //resizeMode: 's'
        //width: 240
        //paddingLeft: 20
    },

    titleList: {
        color: '#000'
    }
});