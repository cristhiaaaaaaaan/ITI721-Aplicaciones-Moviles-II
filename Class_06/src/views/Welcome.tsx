import React from 'react';
import { View, Text } from 'react-native';
import style_01 from '../styles/style_01';

const Welcome = () => {
    return (
        <View style={style_01.container}>
            <Text style={style_01.title}>Welcome Screen</Text>
            <Text>{`Hello, ${'admin'}!`}</Text>
        </View>
    );
};

export default Welcome;
