import React from 'react';
import { View } from 'react-native';

import TabNavigator from '../../components/TabNavigator';

import styles from './styles';

export default () => {
    return(
        <View style={styles.container}>

            {/* Tab navigator */}
            <TabNavigator />            
        </View>
    )
}