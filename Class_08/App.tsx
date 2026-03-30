import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import Login from './src/views/Login';
import Register from './src/views/Register';
import Gallery from './src/views/Gallery';
import CameraUpload from './src/components/collections/CameraUpload';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function onAuthStateChanged(user: any) {
	setUser(user);
	if (initializing) {
	  setInitializing(false);
	}
  }

  useEffect(() => {
	const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
	return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) return null;

  return (
	<NavigationContainer>
	  <Stack.Navigator screenOptions={{ headerShown: false }}>
		{user ? (
		  <>
			<Stack.Screen name="Gallery" component={Gallery} options={{ title: 'Pasarela de Fotos' }}/>
			<Stack.Screen name="PhotoCapture" component={CameraUpload} options={{ title: 'Subir nueva foto' }}/>
		  </>
		) : (
		  <>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
		  </>
		)}
	  </Stack.Navigator>
	</NavigationContainer>
  );
};

export default App;
