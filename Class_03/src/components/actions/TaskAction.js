import { SELECCIONAR_CURSO, DESELECCIONAR_CURSO } from './TaskActionTypes';

export const seleccionarCursoAction = curso => ({
	type: SELECCIONAR_CURSO,
	payload: curso,
});

export const deseleccionarCursoAction = curso => ({
	type: DESELECCIONAR_CURSO,
	payload: curso,
});
