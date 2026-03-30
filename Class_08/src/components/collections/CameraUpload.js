import React, { useState } from 'react';
import { View, Button, Image, TextInput } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CameraUpload = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [comment, setComment] = useState('');

  const takePhoto = () => {
	launchCamera({ mediaType: 'photo', quality: 0.5 }, (response) => {
	  if (!response.didCancel) setImageUri(response.assets[0].uri);
	});
  };

  const uploadData = async () => {
	const user = auth().currentUser;
	const fileName = `photos/${user.uid}_${Date.now()}.jpg`;

	// 1. Subir a Storage
	const reference = storage().ref(fileName);
	await reference.putFile(imageUri);
	const url = await reference.getDownloadURL();

	// 2. Registrar en Firestore [cite: 118, 120]
	await firestore().collection('photos').add({
	  url: url,
	  comment: comment,
	  user: user.email,
	  date: new Date().toLocaleDateString(),
	  time: new Date().toLocaleTimeString(),
	  userId: user.uid,
	  createdAt: firestore.FieldValue.serverTimestamp(),
	});

	alert('¡Imagen compartida!');
	setImageUri(null);
	setComment('');
	alert('¡Imagen subida con éxito!');
	navigation.goBack();
  };

  return (
	<View>
	  <Button title="Tomar Foto" onPress={takePhoto} />
	  {imageUri && (
		<>
		  <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
		  <TextInput placeholder="Añadir comentario..." onChangeText={setComment} />
		  <Button title="Subir a la Galería" onPress={uploadData} />
		</>
	  )}
	</View>
  );
};

export default CameraUpload;
