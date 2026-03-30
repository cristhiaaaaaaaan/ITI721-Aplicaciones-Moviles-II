import {StyleSheet} from 'react-native';

// crea paleta de colores
const principal = '#1B2E66';
const naranja = '#FF9900';
const blanco = '#FFFFFF';
const celeste = '#87CEEB';
const verdeClaro = '#90EE90';
const gris_1 = '#B2BDD5';

// crea la hoja de estilos
export const style_01 = StyleSheet.create({
	body: {
		margin: 7,
		padding: 5,
	},
	text: {
		fontSize: 14,
		fontWeight: 'bold',
		color: principal,
	},
	textSmall: {
		fontSize: 12,
		color: principal,
	},
	cursoDisponible: {
		backgroundColor: celeste,
		borderRadius: 10,
		margin: 5,
		padding: 10,
	},
	cursoSeleccionado: {
		backgroundColor: verdeClaro,
		borderRadius: 10,
		margin: 5,
		padding: 10,
	},
	seccionTitulo: {
		fontSize: 16,
		fontWeight: 'bold',
		color: principal,
		marginTop: 10,
		marginBottom: 5,
		marginLeft: 5,
	},
	totalContainer: {
		backgroundColor: blanco,
		borderRadius: 10,
		margin: 5,
		padding: 15,
		marginTop: 10,
	},
	totalText: {
		fontSize: 14,
		color: principal,
		marginBottom: 5,
	},
	totalDestacado: {
		fontSize: 16,
		fontWeight: 'bold',
		color: naranja,
	},
	titleBar: {
		backgroundColor: principal,
		padding: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
	},
	title: {
		marginLeft: 15,
		fontSize: 22,
		fontWeight: 'bold',
		color: naranja,
	},
	scrollContainer: {
		backgroundColor: gris_1,
		flex: 1,
	},
});
