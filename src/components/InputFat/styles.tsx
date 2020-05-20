import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
        flexWrap: "nowrap",
        //backgroundColor: "rgba( 255, 255, 255, .7 )",
        backgroundColor: '#222230'

    },

    icon: {
        color: "darkgray",
        fontSize: 15
    },

    input: {
        color: "#FFF",
        marginLeft: 10,
        fontSize: 14,
        flex: 1
    }
});