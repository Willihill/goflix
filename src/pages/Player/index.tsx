import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, TouchableOpacity, Slider, Text, TouchableWithoutFeedback } from 'react-native';

import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { OrientationLock } from 'expo-screen-orientation';
import { Ionicons, SimpleLineIcons, Entypo } from "@expo/vector-icons";

import styles from './styles';

export default ({ navigation } : any) => {

    const [positionMiliseconds, setPositionMiliseconds] = useState<number>(0);
    const [totalMiliseconds, setTotalMiliseconds] = useState<number>(0);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [controlShowing, setControlShowing] = useState<boolean>(true);

    const playerRef = useRef<Video>();

    useEffect(() => {

        (async () => {
            /***** Setando orientação *****/
            // Caso seja diferente de LANDSCAPE, seta a LANDSCAPE_LEFT
            await ScreenOrientation.lockAsync(OrientationLock.DEFAULT).then(async () => {                
                await ScreenOrientation.getOrientationAsync().then(async (orientation) => {
                    if(orientation !== 3 && orientation !== 4)
                        await ScreenOrientation.lockAsync(OrientationLock.LANDSCAPE_RIGHT);
                })
            })
        })()

        // Voltando a orientação normal, quando saí da página
        return () => {
            ScreenOrientation.lockAsync(OrientationLock.PORTRAIT);
        }        
    }, []);

    function onLoadMovie(data: any){
        setTotalMiliseconds(data.durationMillis);
    }

    function getTimeFromMilliseconds(millis: number){
        const totalSeconds = millis / 1000
        const seconds = String(Math.floor(totalSeconds % 60))
        const minutes = String(Math.floor(totalSeconds / 60))

        return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }

    async function onPlayPause(){
        if(!isPlaying){
            // Caso ja acabou a reprodução, faz o replay
            if(isFinished)
                await playerRef.current?.replayAsync();
            
            await playerRef.current?.playAsync();
        }
        else
            await playerRef.current?.pauseAsync();

        setIsPlaying(!isPlaying);
        setIsFinished(false);
    }

    async function onPlaybackStatusUpdate(status: any){
        setPositionMiliseconds(status.positionMillis);

        if(positionMiliseconds > 0 && positionMiliseconds === totalMiliseconds)
        {
            setIsPlaying(false);
            setIsFinished(true);
            await playerRef.current?.stopAsync();
        }
    }

    async function handlerSlider(value: number){
        await playerRef.current?.setPositionAsync(value);
    }

    async function onBackward(){
        if((positionMiliseconds === 0 || isFinished))
            return;

        await playerRef.current?.setPositionAsync(positionMiliseconds-(10*100));
    }

    async function onForward(){
        if(positionMiliseconds+(10*100) >= totalMiliseconds)
            return;

        await playerRef.current?.setPositionAsync(positionMiliseconds+(10*100));
    }

    function onChangeControl(){
        setControlShowing(!controlShowing);
    }

    return(
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, .5)' }}>
            <StatusBar hidden={true} />
            <Video
                source={{
                    uri: `https://goflix.azurewebsites.net/api/Player/${navigation.getParam('movie')}/index.m3u8`
                }}
                style={{
                    flex: 1
                }}
                ref={playerRef}
                useNativeControls={false}
                resizeMode={Video.RESIZE_MODE_STRETCH}
                onLoad={onLoadMovie}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            />

            {/* Container Controls */}
            <View style={[styles.containerControl, { opacity: controlShowing ? 1 : 0 }]}>
                <TouchableOpacity onPress={onChangeControl} style={{ flex: 1 }} activeOpacity={0}>
                    <>
                        {/* Header */}
                        <View style={{
                            //marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity onPress={() => navigation.pop()}>
                                <Ionicons name="ios-arrow-back" style={styles.backPage} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', fontSize: 12, color: '#FFF' }}>{navigation.getParam('nameMovie')}</Text>
                        </View>

                        {/* Body */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                        }}>
                            {/* Backward */}
                            <TouchableOpacity onPress={onBackward}>
                                <Entypo 
                                    name="controller-fast-backward" 
                                    style={[styles.ward,{ 
                                        color: ((positionMiliseconds > 0 && !isFinished) ? '#FFF' : 'rgba(255, 255, 255, .3)') 
                                    }]} 
                                />
                            </TouchableOpacity>

                            {/* Play / Pause / Retry */}
                            <TouchableOpacity onPress={onPlayPause}>
                                <SimpleLineIcons name="control-play" style={styles.playPause} />
                            </TouchableOpacity>

                            {/* Forward */}
                            <TouchableOpacity onPress={onForward}>
                                <Entypo 
                                    name="controller-fast-forward" 
                                    style={[styles.ward,{ 
                                        // Tem que desabilitar os 10 segundos antes do fim
                                        color: ((positionMiliseconds+(10*100) < totalMiliseconds) ? '#fff' : 'rgba(255, 255, 255, .3)') 
                                    }]} 
                                />
                            </TouchableOpacity>

                        </View>

                        {/* Footer */}
                        <View style={{
                            flexDirection: 'row',
                            paddingRight: 20
                        }}>
                            <Text style={{ color: '#FFF' }}>{getTimeFromMilliseconds(positionMiliseconds)}</Text>
                            <Slider
                                value={positionMiliseconds}
                                onValueChange={handlerSlider}
                                style={{ flex: 1 }}
                                maximumValue={totalMiliseconds}
                                minimumValue={0}
                            />
                            <Text style={{ color: '#FFF' }}>{getTimeFromMilliseconds(totalMiliseconds)}</Text>
                        </View>
                    </>
                </TouchableOpacity>
            </View>
        </View>
    )
}