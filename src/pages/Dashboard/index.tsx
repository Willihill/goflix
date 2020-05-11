import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, TouchableHighlight, StatusBar, AsyncStorage, Image, Dimensions, Animated, ImageBackground, Easing } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import SideSwipe from 'react-native-sideswipe'
//import { Card, Badge } from 'react-native-elements';

import InputFat from '../../components/InputFat';
import ButtonFat from '../../components/ButtonFat';
import CategoryList from '../../components/CategoryList';
import TabNavigator from '../../components/TabNavigator';

import api from '../../services/api';
import { SaveUser } from '../../services/user';

import { HighlightsType, CategoryType } from './types';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { timing } from 'react-native-reanimated';

export default ({ navigation } : any) => {

    const dispatch = useDispatch();

    const [indexFeatured, setIndexFeatured] = useState<number>(0);
    const [highlights, setHighlights] = useState<HighlightsType[]>([]);
    const [categorys, setCategorys] = useState<CategoryType[]>([]);

    const fadeOpacityIn = useRef(new Animated.Value(1)).current
    const fadeOpacityOut = useRef(new Animated.Value(0.5)).current

    const fadeHeightIn = useRef(new Animated.Value(1)).current
    const fadeHeightOut = useRef(new Animated.Value(.9)).current

    const { width } = Dimensions.get('window');
    const widthFeatured = width-80;

    useEffect(() => {
        // Carregando os conteudos iniciais
        (async () => {
            // Carregando os destaques
            await loadHighlights();

            // Carregando as categorias
            await loadCategorys();

            //navigation.navigate('MovieDetail', { movie: 1 });
        })()

    }, []);

    async function loadHighlights(){
        await api.get('/Highlights')
        .then(
            (resp) => {
                //alert('ok')
                //console.log(resp.data)
                setHighlights(resp.data);
            },

            (reject) => {
                console.log('Erro ao buscar os destaques: ', reject)
            }
        )
    }

    async function loadCategorys(){
        await api.get('/Category')
        .then(
            (resp) => {
                setCategorys(resp.data);
            },
            (reject) => {
                console.log('Erro ao buscar as categorias: ', reject)
            }
        );

    }

    function handleFade(index: number){
        setIndexFeatured(index);

        // Fades de opacidade
        fadeOpacityIn.setValue(0.5);
        Animated.timing(fadeOpacityIn, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();

        fadeOpacityOut.setValue(1);
        Animated.timing(fadeOpacityOut, {
            toValue: 0.5,
            duration: 450,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();

        // Fades de tamanho
        fadeHeightIn.setValue(.9);
        Animated.timing(fadeHeightIn, {
            toValue: 1,
            duration: 500,
            easing: Easing.elastic(1),
            useNativeDriver: true
        }).start();
    }

    function handleFeatured(id: number){
        // Fades de tamanho
        fadeHeightIn.setValue(.9);
        Animated.timing(fadeHeightIn, {
            toValue: 1,
            duration: 500,
            easing: Easing.elastic(2),
            useNativeDriver: true
        }).start(() => navigation.navigate('MovieDetail', { movie: id }));
    }

    return(
        <View
          //colors={['#FFF', '#FFF']}
          style={styles.container}
        >
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

            <ScrollView style={{ flex: 1 }}>
                {/* Logo */}
                <Text style={styles.logo}>GoFlix</Text>

                {/* Destaques */}
                <SideSwipe
                    index={indexFeatured}
                    itemWidth={widthFeatured}
                    style={{ width, minHeight: 400}}
                    threshold={widthFeatured/4}
                    useNativeDriver={true}
                    data={highlights}
                    onIndexChange={index => handleFade(index)}
                    renderItem={(params: any) => {
                        return(
                            <Animated.View
                                key={params.itemIndex}
                                //currentIndex={params.currentIndex}
                                //animatedValue={params.animatedValue}
                                style={[styles.cntDestaque, 
                                    {
                                    width: widthFeatured,
                                    height: 400,
                                    transform: [
                                        {
                                            scale: (params.currentIndex === params.itemIndex ? fadeHeightIn : fadeHeightOut),
                                        }
                                    ],
                                    marginRight: (params.itemIndex+1 == highlights.length ? 20 : 0),
                                    opacity: (params.currentIndex === params.itemIndex ? fadeOpacityIn : fadeOpacityOut),
                                }]}
                            >
                                <TouchableHighlight style={{flex: 1}} onPress={() => handleFeatured(params.item.movieId)}>
                                    <ImageBackground 
                                        source={{
                                            uri: `data:image/png;base64,${params.item.cover}`
                                        }}
                                        resizeMode="stretch"
                                        resizeMethod="resize"
                                        style={{
                                            flex: 1
                                        }} 
                                    />
                                </TouchableHighlight>
                            </Animated.View>
                        )}
                    }
                />

                {/* Categorias */}
                <View style={styles.cntList}>
                    {categorys.map((category) => 
                        <CategoryList
                            key={category.id}
                            category={category}
                            navigation={navigation}
                        />
                    )}
                </View>

            </ScrollView>

            {/* Tab navigator control */}
            <TabNavigator />
        </View>
    )
}