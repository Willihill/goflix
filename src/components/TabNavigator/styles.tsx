import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 5,
        borderRadius: 100,
        //backgroundColor: "rgba( 255, 255, 255, .7 )",
        //backgroundColor: "rgba( 0, 0, 0, .7 )",
        backgroundColor: "#59caef",
        marginBottom: 10
    },

    icon: {
        color: "#FFF",
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },

    input: {
        color: "#3f7cbb",
        marginLeft: 10,
        fontSize: 14,
        flex: 1
    }
});