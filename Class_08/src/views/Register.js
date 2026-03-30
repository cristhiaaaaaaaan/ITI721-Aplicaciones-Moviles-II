import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
	if (!name || !email || !job || !password) {
	  Alert.alert("Error", "Por favor completa todos los campos");
	  return;
	}

	try {
	  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
	  const user = userCredential.user;

	  await db().collection('users').doc(user.uid).set({
		iduser: user.uid,
		name: name,
		email: email,
		job: job,
	  });

	  console.log('¡Cuenta de usuario creada e iniciada!');
	  Alert.alert("Éxito", "Usuario registrado correctamente");

	} catch (error) {
	  if (error.code === 'auth/email-already-in-use') {
		Alert.alert("Error", "Ese correo ya está en uso");
	  } else if (error.code === 'auth/invalid-email') {
		Alert.alert("Error", "El correo electrónico es inválido");
	  } else {
		Alert.alert("Error", error.message);
	  }
	}
  };

  return (
	<ScrollView contentContainerStyle={styles.container}>
	  <Text style={styles.title}>Crear Nueva Cuenta</Text>

	  <TextInput
		placeholder="Nombre Completo"
		style={styles.input}
		onChangeText={setName}
		value={name}
	  />

	  <TextInput
		placeholder="Correo Electrónico"
		style={styles.input}
		keyboardType="email-address"
		autoCapitalize="none"
		onChangeText={setEmail}
		value={email}
	  />

	  <TextInput
		placeholder="Puesto / Trabajo"
		style={styles.input}
		onChangeText={setJob}
		value={job}
	  />

	  <TextInput
		placeholder="Contraseña"
		style={styles.input}
		secureTextEntry
		onChangeText={setPassword}
		value={password}
	  />

	  <TouchableOpacity style={styles.button} onPress={handleRegister}>
		<Text style={styles.buttonText}>Registrar Usuario</Text>
	  </TouchableOpacity>

	  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
		<Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
	  </TouchableOpacity>
	</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#4A90E2', padding: 18, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#4A90E2', textAlign: 'center', marginTop: 20, fontSize: 14 }
});

export default Register;
