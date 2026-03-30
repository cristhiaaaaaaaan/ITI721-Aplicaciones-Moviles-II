import { SELECCIONAR_CURSO, DESELECCIONAR_CURSO } from '../actions/TaskActionTypes';

const cursosIniciales = [
	{
		codigo: 'ITI-421',
		nombre: 'Programación III',
		nivel: 4,
		creditos: 3
	},
	{
		codigo: 'ITI-422',
		nombre: 'Bases de Datos Avanzadas',
		nivel: 4,
		creditos: 3
	},
	{
		codigo: 'ITI-423',
		nombre: 'Redes de Computadoras',
		nivel: 4,
		creditos: 4
	},
	{
		codigo: 'ITI-424',
		nombre: 'Ingeniería de Software',
		nivel: 4,
		creditos: 3
	},
	{
		codigo: 'ITI-425',
		nombre: 'Seguridad Informática',
		nivel: 4,
		creditos: 3
	}
];

const INITIAL_STATE = {
	cursosDisponibles: cursosIniciales,
	cursosSeleccionados: [],
};

const TaskReducer = (state = INITIAL_STATE, action) => {
	let curso, newState;

	switch (action.type) {
		case SELECCIONAR_CURSO:
			curso = action.payload;
			newState = {
				cursosDisponibles: state.cursosDisponibles.filter(c => c.codigo !== curso.codigo),
				cursosSeleccionados: [...state.cursosSeleccionados, curso],
			};
			return newState;

		case DESELECCIONAR_CURSO:
			curso = action.payload;
			newState = {
				cursosDisponibles: [...state.cursosDisponibles, curso],
				cursosSeleccionados: state.cursosSeleccionados.filter(c => c.codigo !== curso.codigo),
			};
			return newState;

		default:
			return state;
	}
};

export default TaskReducer;
