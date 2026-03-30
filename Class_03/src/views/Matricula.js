import React from 'react';
import { Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { style_01 } from '../styles/style_01';
import { seleccionarCursoAction, deseleccionarCursoAction } from '../components/actions/TaskAction';

const COSTO_CREDITO = 12000;

const Matricula = ({ Cursos }) => {
	const dispatch = useDispatch();

	const onSeleccionarCurso = (curso) => {
		dispatch(seleccionarCursoAction(curso));
	};

	const onDeseleccionarCurso = (curso) => {
		dispatch(deseleccionarCursoAction(curso));
	};

	const totalCreditos = Cursos.cursosSeleccionados.reduce((sum, curso) => sum + curso.creditos, 0);
	const costoMatricula = totalCreditos * COSTO_CREDITO;

	const formatearMonto = (monto) => {
		return monto.toLocaleString('es-CR');
	};

	return (
		<View style={{flex: 1}}>
			<View style={style_01.titleBar}>
				<Image source={require('../imgs/logos/logo_universidad.png')} />
				<Text style={style_01.title}>Matrícula</Text>
			</View>

			<ScrollView style={style_01.scrollContainer}>
				<View style={style_01.body}>
					{/* Lista de cursos disponibles (celeste) */}
					<Text style={style_01.seccionTitulo}>Cursos Disponibles</Text>
					{Cursos.cursosDisponibles.length === 0 ? (
						<Text style={style_01.textSmall}>No hay cursos disponibles</Text>
					) : (
						Cursos.cursosDisponibles.map((curso) => (
							<TouchableOpacity
								key={curso.codigo}
								style={style_01.cursoDisponible}
								onPress={() => onSeleccionarCurso(curso)}>
								<Text style={style_01.text}>Código: {curso.codigo}</Text>
								<Text style={style_01.textSmall}>Nombre: {curso.nombre}</Text>
								<Text style={style_01.textSmall}>Nivel: {curso.nivel} | Créditos: {curso.creditos}</Text>
							</TouchableOpacity>
						))
					)}

					{/* Lista de cursos seleccionados (verde claro) */}
					<Text style={style_01.seccionTitulo}>Cursos a Matricular</Text>
					{Cursos.cursosSeleccionados.length === 0 ? (
						<Text style={style_01.textSmall}>No hay cursos seleccionados</Text>
					) : (
						Cursos.cursosSeleccionados.map((curso) => (
							<TouchableOpacity
								key={curso.codigo}
								style={style_01.cursoSeleccionado}
								onPress={() => onDeseleccionarCurso(curso)}>
								<Text style={style_01.text}>Código: {curso.codigo}</Text>
								<Text style={style_01.textSmall}>Nombre: {curso.nombre}</Text>
								<Text style={style_01.textSmall}>Nivel: {curso.nivel} | Créditos: {curso.creditos}</Text>
							</TouchableOpacity>
						))
					)}

					{/* Total de créditos y costo */}
					<View style={style_01.totalContainer}>
						<Text style={style_01.totalText}>Total de créditos: {totalCreditos}</Text>
						<Text style={style_01.totalDestacado}>
							Costo de matrícula: ₡{formatearMonto(costoMatricula)}
						</Text>
						<Text style={style_01.textSmall}>(₡12,000 por crédito)</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const mapStateToProps = ({ Cursos }) => {
	return { Cursos };
};

export default connect(mapStateToProps)(Matricula);
