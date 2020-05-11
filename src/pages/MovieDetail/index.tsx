import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ImageBackground, ActivityIndicator, Image } from 'react-native';

import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import ClassificationMovie from '../../components/ClassificationMovie';

import api from '../../services/api';

import { MovieDetailModel, MovieActorModel } from './types';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';

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
        navigation.navigate('Player', { movie: navigation.getParam('movie'), nameMovie: movie?.name });
    }

    async function onChangeFavorite(){

    }

    const renderActor = (actor: MovieActorModel) => 
        <View key={actor.id.toString()} style={styles.cntActor}>
            {/* Picture */}
            <Image
                source={{
                    uri: `data:image/png;base64,${actor.picture}`
                }}
                style={{ borderRadius: 200 }}
                width={80}
                height={80}
            />
            <Text style={styles.nameActor}>{actor.name}</Text>
            <Text style={styles.typeActor}>{actor.type}</Text>
        </View>

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
                
                {/* Elenco */}
                <View style={{ flexDirection: 'column', marginVertical: 40 }}>
                    <Text style={{ color: 'gray', fontSize: 20, paddingLeft: 20, marginBottom: 10, fontFamily: 'Lato-Light' }}>Elenco</Text>
                    <FlatList
                        keyExtractor={(item) => item.id.toString()}
                        data={movie?.actors}
                        renderItem={(item) => renderActor(item.item)}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

            </View>
        </ScrollView>
        }
        </>
    )
}