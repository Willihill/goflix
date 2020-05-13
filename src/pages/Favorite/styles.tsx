import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE'
    },

    header: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    titlePage: {
        fontFamily: 'Comfortaa Medium',
        fontSize: 30,
        color: "#5e45f7",
        //5e45f7
        textShadowOffset: { height: 3, width: 3 },
        textShadowColor: 'rgba(0, 0, 0, .3)',
        textShadowRadius: 5
    },

    favorite: {
        backgroundColor: '#FFF',
        marginBottom: 5,
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        elevation: 2
    },

    cover: {
        width: 50,
        height: 50,
        borderRadius: 100,
        overflow: 'hidden'
    },

    play: {
        fontSize: 20,
        color: "#FFF",
        textShadowOffset: { height: 1, width: 1 },
        textShadowColor: '#000',
        textShadowRadius: 3
    },

    cntName: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20,
    },

    name: {
        fontSize: 15,
        fontFamily: 'Lato-Light',
    },

    heart: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

    icon: {
        color: 'red',
        fontSize: 18
    }
});