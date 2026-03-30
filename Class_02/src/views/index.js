import React from 'react';
import { Image, ScrollView, Text, View} from 'react-native';
import {style_01} from '../styles/style_01';

const signos = [
	{
		id: 1,
		nombre: 'Acuario',
		fechas: '20 de Enero - 18 de Febrero',
		elemento: 'Aire',
		astro: 'Urano',
		piedra: 'Amatista',
		imagen: require('../imgs/zodiaco/01_Acuario.png')
	},
	{
		id: 2,
		nombre: 'Piscis',
		fechas: '19 de Febrero - 20 de Marzo',
		elemento: 'Agua',
		astro: 'Neptuno',
		piedra: 'Aguamarina',
		imagen: require('../imgs/zodiaco/02_Pisis.png')
	},
	{
		id: 3,
		nombre: 'Aries',
		fechas: '21 de Marzo - 19 de Abril',
		elemento: 'Fuego',
		astro: 'Marte',
		piedra: 'Diamante',
		imagen: require('../imgs/zodiaco/03_Aries.png')
	},
	{
		id: 4,
		nombre: 'Tauro',
		fechas: '20 de Abril - 20 de Mayo',
		elemento: 'Tierra',
		astro: 'Venus',
		piedra: 'Esmeralda',
		imagen: require('../imgs/zodiaco/04_Tauro.png')
	},
	{
		id: 5,
		nombre: 'Géminis',
		fechas: '21 de Mayo - 20 de Junio',
		elemento: 'Aire',
		astro: 'Mercurio',
		piedra: 'Perla',
		imagen: require('../imgs/zodiaco/05_Geminis.png')
	},
	{
		id: 6,
		nombre: 'Cáncer',
		fechas: '21 de Junio - 22 de Julio',
		elemento: 'Agua',
		astro: 'Luna',
		piedra: 'Rubí',
		imagen: require('../imgs/zodiaco/06_Cancer.png')
	},
	{
		id: 7,
		nombre: 'Leo',
		fechas: '23 de Julio - 22 de Agosto',
		elemento: 'Fuego',
		astro: 'Sol',
		piedra: 'Peridoto',
		imagen: require('../imgs/zodiaco/07_Leo.png')
	},
	{
		id: 8,
		nombre: 'Virgo',
		fechas: '23 de Agosto - 22 de Septiembre',
		elemento: 'Tierra',
		astro: 'Mercurio',
		piedra: 'Zafiro',
		imagen: require('../imgs/zodiaco/08_Virgo.png')
	},
	{
		id: 9,
		nombre: 'Libra',
		fechas: '23 de Septiembre - 22 de Octubre',
		elemento: 'Aire',
		astro: 'Venus',
		piedra: 'Ópalo',
		imagen: require('../imgs/zodiaco/09_Libra.png')
	},
	{
		id: 10,
		nombre: 'Escorpio',
		fechas: '23 de Octubre - 21 de Noviembre',
		elemento: 'Agua',
		astro: 'Plutón',
		piedra: 'Topacio',
		imagen: require('../imgs/zodiaco/10_Escorpio.png')
	},
	{
		id: 11,
		nombre: 'Sagitario',
		fechas: '22 de Noviembre - 21 de Diciembre',
		elemento: 'Fuego',
		astro: 'Júpiter',
		piedra: 'Turquesa',
		imagen: require('../imgs/zodiaco/11_Sagitario.png')
	},
	{
		id: 12,
		nombre: 'Capricornio',
		fechas: '22 de Diciembre - 19 de Enero',
		elemento: 'Tierra',
		astro: 'Saturno',
		piedra: 'Granate',
		imagen: require('../imgs/zodiaco/12_Capricornio.png')
	}
];

const getElementoStyle = (elemento) => {
	switch(elemento) {
		case 'Fuego': return style_01.elementoFuego;
		case 'Tierra': return style_01.elementoTierra;
		case 'Aire': return style_01.elementoAire;
		case 'Agua': return style_01.elementoAgua;
		default: return style_01.signoTexto;
	}
};

const Index = () => {
	return(
		<View>
			<View style={style_01.divHeader}>
				<Image source={require('../imgs/logos/logo_universidad.png')} />
			</View>

			<View style={style_01.divMain}>
				<Text style={style_01.h1}>Signos del Zodiaco</Text>
				<Text style={style_01.p1}>Los doce signos zodiacales con sus características, elementos, astros y piedras preciosas asociadas.</Text>

				<ScrollView style={{marginTop:8}}>
					{signos.map(signo => (
						<View style={style_01.tarjeta} key={signo.id}>
							<Image source={signo.imagen} style={style_01.tarjetaImagen} />
							<View style={style_01.tarjetaInfo}>
								<Text style={style_01.signoNombre}>{signo.nombre}</Text>
								<Text style={style_01.signoTexto}>{signo.fechas}</Text>
								<Text style={[style_01.signoTexto, getElementoStyle(signo.elemento)]}>
									Elemento: {signo.elemento}
								</Text>
								<Text style={style_01.signoTexto}>Astro: {signo.astro}</Text>
								<Text style={style_01.signoTexto}>Piedra: {signo.piedra}</Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>

			<View style={style_01.divFooter}>
				<Text style={style_01.textFooter}>Carrera de Tecnologías de Información</Text>
				<Text style={style_01.textFooter}>Sede del Pacífico</Text>
			</View>
		</View>
	);
}

export default Index;
