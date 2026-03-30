import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

import Matricula from './src/views/Matricula';
import ConfigureStore from './src/components/Store';

const App = () => {
	const store = ConfigureStore();
	return (
		<Provider store={store}>
			<View style={{flex: 1}}>
				<Matricula />
			</View>
		</Provider>
	);
};

export default App;
