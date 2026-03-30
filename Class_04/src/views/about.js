import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {style_01} from '../styles/style_01';

const About = () => {
    return(
        <SafeAreaView style={style_01.cont}>
            <View>
                <Text style={style_01.h1}>About View</Text>
            </View>
        </SafeAreaView>
    );
};

export default About;
