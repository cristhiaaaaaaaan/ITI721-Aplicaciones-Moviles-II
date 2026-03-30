import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {style_01} from '../styles/style_01';

const MyNavigator = ({navigation}) => {
  const navi = useNavigation();
  return (
    <View style={style_01.row}>
      <TouchableOpacity style={style_01.btn_Home} onPress={() => { navi.navigate('Home'); }}>
        <Text style={style_01.btn_Label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style_01.btn_Details} onPress={() => { navi.navigate('Details'); }}>
        <Text style={style_01.btn_Label}>Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style_01.btn_About} onPress={() => { navi.navigate('About'); }}>
        <Text style={style_01.btn_Label}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyNavigator;
