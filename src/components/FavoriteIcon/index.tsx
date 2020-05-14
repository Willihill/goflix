import React, { useState } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';

export type FavoriteIconType = {
    movie: number,
    isFavorite: boolean,
    size?: number,
    color?: string,
    onChangeFavorite?: (value: boolean) => void
}

export default ({ isFavorite, movie, onChangeFavorite, size, color }:FavoriteIconType) => {

    const [loading, setLoading] = useState<boolean>(false);

    async function onPressFavorite(){
        if(!movie){
            console.error("Id do filme não informado");
            return;
        }

        setLoading(true);
        await api.post(`/Favorite/${movie}`)
        .then(
            () => {
                setLoading(false);
                onChangeFavorite?.call(true, !isFavorite);
            },

            (reject) => {
                setLoading(false);
                console.log("Erro ao remover favorito: ", reject.response.data.message, reject);
            }
        )
    }


    return(
        <>
            { loading
            ?
                <ActivityIndicator size={size ?? 18} color="#5e45f7" />
            :
                <TouchableOpacity onPress={onPressFavorite}>
                    <AntDesign name={(isFavorite ? "heart" : "hearto")} size={size ?? 18} color={color ?? 'red'} style={styles.icon} />
                </TouchableOpacity>                
            }
        </>
    )
}