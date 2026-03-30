import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Welcome = () => {
	return (
		<View style={styles.Body}>
			<Text style={styles.Title}>Universidad Técnica Nacional</Text>
			<Text style={styles.SubTitle}>Introducción a React-Native</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	Body: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	Title: {
		fontSize: 22,
		fontWeight: '600',
		color: '#12155B',
	},
	SubTitle: {
		fontSize: 18,
		fontWeight: '500',
		color: '#000000',
	},
});

export default Welcome;
