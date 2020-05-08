import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        flexWrap: "nowrap",
        backgroundColor: "rgba( 255, 255, 255, .7 )"
    },

    icon: {
        color: "#70aff0",
        fontSize: 15
    },

    input: {
        color: "#3f7cbb",
        marginLeft: 10,
        fontSize: 14,
        flex: 1
    }
});