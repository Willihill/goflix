import { StyleSheet } from "react-native";

export default StyleSheet.create({
    containerControl: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, .7)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    backPage: {
        color: '#FFF',
        fontSize: 25,
        padding: 5,
    },

    playPause: {
        color: '#FFF', 
        fontSize: 40, 
        ///paddingVertical: 22, 
        ///paddingLeft: 27,
        //paddingRight: 20,
        ///borderRadius: 100, 
        //backgroundColor: 'rgba(0, 0, 0, .5)',
        //borderWidth: .5,
        //borderColor: '#FFF',
        marginHorizontal: 30
    },

    pause: {
        color: '#FFF', 
        fontSize: 40, 
        // paddingVertical: 22, 
        // paddingHorizontal: 23,
        // borderRadius: 100, 
        backgroundColor: 'rgba(0, 0, 0, .5)',
        //borderWidth: .5,
        //borderColor: '#FFF',
        marginHorizontal: 30
    },

    ward: {
        fontSize: 30,
        color: '#FFF'
    }
});