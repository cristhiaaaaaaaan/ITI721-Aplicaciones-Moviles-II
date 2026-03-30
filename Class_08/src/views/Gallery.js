import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Gallery = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
	// Escuchamos la base de datos
	const subscriber = firestore()
	  .collection('photos')
	  .orderBy('createdAt', 'desc')
	  .onSnapshot(querySnapshot => {
		const list = [];
		querySnapshot.forEach(doc => {
		  list.push({ ...doc.data(), id: doc.id });
		});
		setPhotos(list);
	  });
	return () => subscriber();
  }, []);

  return (
	<View style={styles.container}>
	  {/* Botón para cerrar sesión (Paso 22 de tu guía) */}
	  <Button title="Cerrar Sesión" onPress={() => auth().signOut()} color="red" />

	  <FlatList
		data={photos}
		keyExtractor={item => item.id}
		renderItem={({ item }) => (
		  <View style={styles.card}>
			<Image source={{ uri: item.url }} style={styles.image} />
			<Text style={styles.info}>{item.user} - {item.date}</Text>
			<Text style={styles.comment}>{item.comment}</Text>
		  </View>
		)}
	  />

	  <TouchableOpacity
		style={styles.fab}
		onPress={() => navigation.navigate('PhotoCapture')}
	  >
		<Text style={styles.fabIcon}>+</Text>
	  </TouchableOpacity>
	</View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  card: { backgroundColor: '#fff', margin: 10, borderRadius: 8, elevation: 3, overflow: 'hidden' },
  image: { width: '100%', height: 250 },
  info: { padding: 5, fontWeight: 'bold', fontSize: 12 },
  comment: { padding: 5, color: '#444' },
  fab: {
	position: 'absolute', right: 20, bottom: 20,
	backgroundColor: '#007AFF', width: 60, height: 60,
	borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5
  },
  fabIcon: { color: 'white', fontSize: 30, fontWeight: 'bold' }
});

export default Gallery;
