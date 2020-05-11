import React from 'react';

import { View, StyleSheet, Picker, StyleSheetProperties } from 'react-native';

import { AntDesign } from "@expo/vector-icons";

export interface Parameters{
    IconName: string,
    PropsPicker: any,
    Itens: [any],
    StyleContainer: StyleSheetProperties,
    StylePicker: StyleSheetProperties,
    StyleIcon: StyleSheetProperties,
}

export default function PickerIcon ({ IconName, PropsPicker, Itens, StyleContainer, StylePicker, StyleIcon }: any){

    const itensPicker : any = [];
    Itens.forEach( (item: any, index: Number) => {
        itensPicker.push(<Picker.Item {...item} key={index} />)
    })

    return(
        <View style={{ ...styles.container, ...StyleContainer }}>
            { IconName ? <AntDesign name={IconName} size={15} color="#70aff0" style={{ ...styles.icon, ...StyleIcon }} /> : [] }
            <Picker 
                {...PropsPicker}
                style={{ ...styles.picker, ...StylePicker }}
            >
                {itensPicker}
            </Picker>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "rgba( 255, 255, 255, .7 )",
        borderRadius: 100,
        overflow: "hidden",
        paddingHorizontal: 20,
    },

    picker:{
        fontSize: 14,
        borderWidth: 0,
        //backgroundColor: "red",
        color: "#70aff0",
        //marginLeft: -8,
        //height: 44,
        flex: 1,
    },

    icon:{
        //marginHorizontal: 10
    }

});