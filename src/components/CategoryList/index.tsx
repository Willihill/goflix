import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ImageBackground, Image, TouchableHighlight } from "react-native";

import styles from './styles';
import { CategoryType } from "../../pages/Dashboard/types";
import api from "../../services/api";
import { MovieDetailModel } from "../../pages/MovieDetail/types";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

export type CategoryListProps = {
    category: CategoryType,
    navigation: any
}

export default ({ category, navigation }: CategoryListProps) => {

    const [movies, setMovies] = useState<MovieDetailModel[]>([{id: 1}, {id: 2}, {id: 3}])
    const [loading, setLoading] = useState<boolean>(true)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            // Carregando os filmes
            await loadMovies();
        })();

    },[]);

    async function loadMovies(){
        await api.get(`Category/${category.id}/Movies`)
        .then(
            (resp) => {
                let mvs = resp.data;

                if(mvs.length === 0){
                    setIsEmpty(true);
                }else{
                    setIsEmpty(false);
                }

                setMovies(mvs);
                setLoading(false);
            },

            (reject) => {
                console.log("Erro ao carregar os filme da categoria: ", category.id);
            }
        )

    }

    function onPlay(movie: MovieDetailModel){
        if(movie.id > 0)
            navigation.navigate('MovieDetail', { movie: movie.id });
    }

    const renderMovie = (movie : MovieDetailModel) => 
        <TouchableHighlight
            key={movie.id}
            onPress={() => onPlay(movie)} 
            style={styles.cntMovie}
        >
                <Image
                    source={{
                        uri: `data:image/png;base64,${movie.cover}`
                    }}
                    style={{
                        flex: 1
                    }}
                    resizeMode="stretch"
                    resizeMethod="resize"
                    width={120}
                    height={150}
                />
        </TouchableHighlight>

    const renderMovieLoading = (index: number) =>
        <View style={styles.cntMovie} key={index}>
            <ActivityIndicator size={25} />
        </View>

    return(
        <View style={[styles.container, { display: (isEmpty ? 'none' : 'flex') }]}>
            <Text style={styles.title}>{category.name}</Text>
            <FlatList
                keyExtractor={(item, index) => item?.id.toString()}
                data={movies}
                renderItem={(item) => loading ? renderMovieLoading(item.index) : renderMovie(item.item)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}