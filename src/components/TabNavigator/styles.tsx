import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: "row",
        paddingVertical: 10,
        //paddingBottom: 10,
        paddingHorizontal: 5,
        borderRadius: 100,
        //backgroundColor: "rgba( 255, 255, 255, .7 )",
        //backgroundColor: "rgba( 0, 0, 0, .7 )",
        //backgroundColor: "#59caef",
        backgroundColor: "#FFF",
        //marginBottom: 10,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        marginHorizontal: 20,
        shadowOffset: {
            width: 20,
            height: 10
          },
        shadowOpacity: 0.5,
        height: 50,
        shadowRadius: 1,
        shadowColor: 'black',
        elevation: 10,
    },

    icon: {
        color: "gray",
        fontSize: 20,
        marginHorizontal: 20
    },

    iconActive: {
        fontSize: 20,
        color: '#FFF',
        backgroundColor: '#5e45f7',
        borderRadius: 100,
        padding: 12,
        marginHorizontal: 10,
        marginBottom: 35,
        shadowRadius: 10,
        elevation: 10
    }
});