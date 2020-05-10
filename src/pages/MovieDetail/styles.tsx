import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
    },

    cntLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        flex: 1,
        height: 400,
        flexDirection: "column",
        justifyContent: "center",
    },

    contentHeader: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        flexDirection: 'column'
    },

    optionsHeader: {
        paddingHorizontal: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    optHeader: {
        color: '#FFF',
        fontSize: 24,
        padding: 6
    },

    playHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50
    },

    play: {
        color: '#FFF',
        fontSize: 50
    },


    cntDetails: {
        flex: 1
    },

    nameMovie: {
        color: '#000',
        fontSize: 35,
        paddingHorizontal: 10,
        textAlign: 'center',
        marginTop: 15,
        fontFamily: 'Comfortaa Light'
    },

    classDuratMovie: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },

    itemClassDuratMovie: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15

    },

    labelClassDuratMovie: {
        color: 'gray',
        fontSize: 10,
        fontFamily: 'Roboto Light'
    },

    descriptionMovie: {
        color: '#000',
        fontSize: 13,
        textAlign: 'justify',
        fontFamily: 'Roboto Light',
        textAlignVertical: 'top',
        paddingHorizontal: 20
    }
});