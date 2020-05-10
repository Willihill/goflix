import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ImageBackground, ActivityIndicator } from 'react-native';

import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import ClassificationMovie from '../../components/ClassificationMovie';

import api from '../../services/api';

import { MovieDetailModel } from './types';
import styles from './styles';

export default ({ navigation } : any) => {

    const [movie, setMovie] = useState<MovieDetailModel>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            await loadDetail();
        })();
    }, []);

    async function loadDetail(){
        await api.get(`/Movie/${navigation.getParam('movie')}`)
        .then(
            (resp) => {
                setMovie({ ...resp.data, ...{ releaseDate: new Date(resp.data.releaseDate)}});
                setLoading(false);
            },

            (reject) => {
                alert('Ocorreu um erro ao carregar os dados do filme.');
                console.log('Erro ao pegar detalhes: ', reject, reject.response.message);
                navigation.pop();
            }
        )
    }

    function onPlay(){
        navigation.navigate('Player', { movie: navigation.getParam('movie') });
    }

    async function onChangeFavorite(){

    }

    return(
        <>
        {loading 
        ?
            <View style={styles.cntLoading}>
                <StatusBar barStyle="light-content" backgroundColor='#FFF' />
                <ActivityIndicator size={50} color='#59caef' />
            </View>
        :
        <ScrollView style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
            <ImageBackground 
                source={{
                    uri: `data:image/png;base64,${movie?.cover}`
                }}
                resizeMode="stretch"
                resizeMethod="resize"
                style={{
                    flex: 1
                }} 
                >
                {/* Header */}
                <View style={styles.header}>
                    <View style={[styles.contentHeader, { paddingTop: StatusBar.currentHeight }]}>
                        {/* Opções do cabeçalho */}
                        <View style={styles.optionsHeader}>
                            <TouchableOpacity onPress={() => navigation.pop()}>
                                <Ionicons name="ios-arrow-back" style={styles.optHeader} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onChangeFavorite}>
                                <Ionicons name="ios-heart-empty" style={styles.optHeader} />
                            </TouchableOpacity>
                        </View>

                        {/* Playe */}
                        <View style={styles.playHeader}>
                            <TouchableOpacity onPress={onPlay}>
                                <SimpleLineIcons name="control-play" style={styles.play} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            
            {/* Dados do filme */}
            <View style={styles.cntDetails}>
                {/* Nome do filme */}
                <Text style={styles.nameMovie}>{movie?.name}</Text>

                {/* Classificação, Duração e Lançamento*/}
                <View style={styles.classDuratMovie}>
                    {/* Classificação */}
                    <View style={styles.itemClassDuratMovie}>
                        <Text style={styles.labelClassDuratMovie}>Classificação</Text>
                        <ClassificationMovie classification={movie?.classification} />
                    </View>

                    {/* Duração */}
                    <View style={styles.itemClassDuratMovie}>
                        <Text style={styles.labelClassDuratMovie}>Duração</Text>
                        <Text style={{fontSize: 22}}>{`${movie?.duration.hours}h ${movie?.duration.minutes}m`}</Text>
                    </View>

                    {/* Lançamento */}
                    <View style={styles.itemClassDuratMovie}>
                        <Text style={styles.labelClassDuratMovie}>Lançamento</Text>
                        <Text style={{fontSize: 22}}>{movie?.releaseDate.getFullYear()}</Text>
                    </View>
                </View>

                {/* Descrição do filme */}
                <Text style={styles.descriptionMovie}>{movie?.description}</Text>


            </View>
        </ScrollView>
        }
        </>
    )
}