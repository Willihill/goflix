import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, ActivityIndicator, ImageBackground, TouchableOpacityBase } from 'react-native';

import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import TabNavigator from '../../components/TabNavigator';

import styles from './styles';
import { FavoriteType } from './types';
import api from '../../services/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default ({ navigation }: any) => {

    const [favorites, setFavorites] = useState<FavoriteType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [movieLoadingHandler, setMovieLoadingHandler] = useState<number>(0);

    useEffect(() => {

        (async () => {
            await loadFavorites();
        })()
        
    }, []);

    async function loadFavorites(){
        setLoading(true);

        await api.get('/Favorite')
        .then(
            (resp) => {
                setFavorites(resp.data);
                setLoading(false);
            },

            (reject) => {
                console.error("Erro ao buscar os favoritos: ", reject.response.message, reject);
            }
        )
    }

    async function onPressHeart(id: number){
        const movie = favorites.find((value, index, itens) => value.id === id)?.movie.id;

        if(!movie)
            return;

        setMovieLoadingHandler(id);
        await api.post(`/Favorite/${movie}`)
        .then(
            () => {
                const newFavorites = favorites.filter((value, index, itens) => value.id !== id);
                setFavorites(newFavorites);
                setMovieLoadingHandler(0);
            },

            (reject) => {
                console.error("Erro ao remover favorito: ", reject.response.message, reject);
            }
        )

    }

    const renderFavorite = (favorite: FavoriteType) => 
        <View key={favorite.id.toString()} style={styles.favorite}>
            {/* Capa do filme */}
            <TouchableOpacity 
                onPress={() => navigation.navigate("MovieDetail", { movie: favorite.movie.id })}
                style={styles.cover}
            >
                <ImageBackground
                    source={{
                        uri: `data:image/png;base64,${favorite.movie.cover}`
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    resizeMode="stretch"
                    resizeMethod="resize"
                >
                    <SimpleLineIcons name="control-play" style={styles.play} />   
                </ImageBackground>
            </TouchableOpacity>

            {/* Nome do filme */}
            <View style={styles.cntName}>
                <Text style={styles.name}>{favorite.movie.name}</Text>
            </View>

            {/* Heart */}
            <View style={styles.heart}>
                { movieLoadingHandler === favorite.id
                ?
                    <ActivityIndicator size={18} color="#5e45f7" />
                :
                    <TouchableOpacity onPress={() => onPressHeart(favorite.id)}>
                        <AntDesign name="heart" style={styles.icon} />
                    </TouchableOpacity>                
                }
            </View>
        </View>

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#EEE" />

            {/* Header */}
            <View style={styles.header} >
                <Text style={styles.titlePage}>
                    Favoritos
                </Text>
            </View>

            {/* Lista de favoritos */}
            {loading
            ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 }}>
                    <ActivityIndicator size={60} color="#5e45f7" />
                </View>
            :
                <FlatList
                    data={favorites}
                    renderItem={({item}) => renderFavorite(item)}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={true}
                />
            }
            
            {/* Tab navigator */}
            <TabNavigator />
        </View>
    )
}