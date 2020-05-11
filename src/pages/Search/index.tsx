import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator, ImageBackground, TouchableHighlight } from "react-native";
import { useNavigation } from 'react-navigation-hooks';

import {  Octicons } from "@expo/vector-icons";

import styles from './styles';
import TabNavigator from '../../components/TabNavigator';
import { FlatList } from 'react-native-gesture-handler';
import { MovieDetailModel } from '../MovieDetail/types';
import api from '../../services/api';

export default () => {

    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<MovieDetailModel[]>([]);

    const numColumns = 3;
    const navigation = useNavigation();

    const WIDTH = Dimensions.get('window').width;
    const maxWidthMovie = (WIDTH - 20) / numColumns;

    async function onSearch(){
        if(!search)
            return;

        setLoading(true);

        await api.get(`/Search/${search}`)
        .then(
            (resp) => {
                setMovies(resp.data);
            },

            (reject) => {
                console.log("Erro ao carregar os filmes: ", reject.response.message, reject);
            }
        )
        .finally(() => setLoading(false));

    }

    function onPlay(movie: MovieDetailModel){
        navigation.navigate('MovieDetail', { movie: movie.id });
    }

    const renderMovie = (movie: MovieDetailModel) => 
        <TouchableHighlight
            key={movie.id}
            onPress={() => onPlay(movie)}
            style={[styles.movie, { maxWidth: maxWidthMovie }]}
        >
            <ImageBackground
                source={{
                    uri: `data:image/png;base64,${movie.cover}`
                }}
                style={{
                    flex: 1
                }}
                resizeMode="stretch"
                resizeMethod="resize"
            />
        </TouchableHighlight>

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#EEE" />
            {/* Barra de pesquisa */}
            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Pesquise um filme ..."
                    placeholderTextColor="#d9d9d9"
                    style={styles.input}
                    value={search}
                    onChangeText={(value) => setSearch(value)}
                />

                { loading
                ?
                    <ActivityIndicator size={20} color="#FFF" />
                :
                    <TouchableOpacity onPress={onSearch}>
                        <Octicons name="search" style={styles.search} />
                    </TouchableOpacity>
                }
            </View>

            {/* Lista de filmes */}
            <FlatList
                data={movies}
                renderItem={({ item }) => renderMovie(item)}
                keyExtractor={(item) => item.id.toString()}
                style={{
                    paddingHorizontal: 10
                }}
                //refreshing={true}
                numColumns={numColumns}
            />

            {/* Tab Navigation */}
            <TabNavigator />
        </View>
    )
}