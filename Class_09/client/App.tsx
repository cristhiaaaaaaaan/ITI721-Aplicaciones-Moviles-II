import React from 'react';
import AccSocket from './src/components/accSocket';
import {View} from 'react-native';

export const ws = new WebSocket('ws://<ip_address>:<port>');
const App = () => {
  ws.onopen = () => {
	ws.send('Conectando al servidor');
	ws.send('Usuario: <nickName>');
  };
  return (
	<View style={{flex: 1}}>
	  <AccSocket />
	</View>
  );
};
export default App;
