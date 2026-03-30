import React from 'react';
import {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Textarea from 'react-native-textarea';
import {ws} from '../../App';
import {style_01} from '../styles/style_01';

const AccSocket = () => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState('');

  ws.onmessage = e => {
	// a message was received
	const texto = mensajes + '\n' + e.data;
	setMensajes(texto);
	console.log(e.data);
	console.log(texto);
  };

  ws.onerror = e => {
	// an error occurred
	console.log(e.message);
  };

  const enviarMensaje = () => {
	ws.send(mensaje);
	setMensaje('');
  };

  const cerrarSesion = () => {
	ws.onclose = e => {
	  // connection closed
	  console.log(e.code, e.reason);
	};
  };

  return (
	<View>
	  <Text style={style_01.tit_01}>Acceso al Socket</Text>
	  <View style={style_01.banda}>
		<TextInput
		  value={mensaje}
		  style={style_01.texto}
		  multiline={true}
		  placeholder={'Write yours comment...'}
		  onChangeText={newValue => {
			setMensaje(newValue);
		  }}
		/>
		<TouchableOpacity
		  style={style_01.btnEnviar}
		  onPress={() => enviarMensaje()}>
		  <Text style={style_01.tit_04}> SEND </Text>
		</TouchableOpacity>
	  </View>
	  <View style={style_01.container}>
		<Textarea
		  containerStyle={style_01.textareaContainer}
		  style={style_01.textarea}
		  defaultValue={mensajes}
		  multiline={true}
		  numberOfLines={10}
		  editable={false}
		/>
	  </View>
	  <View style={style_01.banda}>
		<TouchableOpacity
		  style={style_01.btnCerrar}
		  onPress={() => cerrarSesion()}>
		  <Text style={style_01.tit_04}> CLOSE SESSION </Text>
		</TouchableOpacity>
	  </View>
	</View>
  );
};

export default AccSocket;
