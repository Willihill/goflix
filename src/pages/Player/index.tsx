import React, { useEffect, useRef } from 'react';
import { View, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { OrientationLock } from 'expo-screen-orientation';

export default ({ navigation } : any) => {

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
    });

    return(
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <StatusBar hidden={true} />
            <Video
                source={{
                    uri: `https://goflix.azurewebsites.net/api/Player/${navigation.getParam('movie')}/index.m3u8`
                }}
                style={{
                    flex: 1,
                    backgroundColor: 'green'
                }}
                ref={playerRef}
                shouldPlay={true}
                useNativeControls={true}
                resizeMode={Video.RESIZE_MODE_STRETCH}
                hasTVPreferredFocus={true}
                sca
            />
            
            

        </View>
    )
}