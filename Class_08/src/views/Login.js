import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
	auth().signInWithEmailAndPassword(email, password)
	  .then(() => console.log('Usuario autenticado'))
	  .catch(error => alert(error.message));
  };

  return (
	<View style={styles.container}>
	  <Text style={styles.title}>Iniciar Sesión</Text>
	  <TextInput placeholder="Email" onChangeText={setEmail} style={styles.input} />
	  <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} style={styles.input} />
	  <Button title="Entrar" onPress={handleLogin} />
	  <Button title="¿No tienes cuenta? Regístrate" onPress={() => navigation.navigate('Register')} />
	</View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 5 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' }
});

export default Login;
