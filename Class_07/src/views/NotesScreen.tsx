import React, {useCallback, useEffect, useState} from 'react';
import {
	Alert,
	FlatList,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import {Note} from '../models/Note';
import {
	createTable,
	deleteAllNotes,
	deleteNote,
	getConnection,
	getNotes,
	insertNote,
	searchNotesByTitle,
	updateNote,
} from '../components/notesDB';

const COLORS = ['#FFEB3B', '#81D4FA', '#A5D6A7', '#FFAB91', '#CE93D8', '#FFFFFF'];

const NotesScreen = () => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [search, setSearch] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [editingNote, setEditingNote] = useState<Note | null>(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [selectedColor, setSelectedColor] = useState(COLORS[0]);

	const loadNotes = useCallback(async () => {
		const db = await getConnection();
		const data = await getNotes(db);
		setNotes(data || []);
	}, []);

	useEffect(() => {
		const init = async () => {
			const db = await getConnection();
			await createTable(db);
			await loadNotes();
		};
		init();
	}, [loadNotes]);

	const handleSearch = async (text: string) => {
		setSearch(text);
		const db = await getConnection();
		if (text.trim() === '') {
			const data = await getNotes(db);
			setNotes(data || []);
		} else {
			const data = await searchNotesByTitle(db, text);
			setNotes(data || []);
		}
	};

	const openNewNote = () => {
		setEditingNote(null);
		setTitle('');
		setContent('');
		setSelectedColor(COLORS[0]);
		setModalVisible(true);
	};

	const openEditNote = (note: Note) => {
		setEditingNote(note);
		setTitle(note.title);
		setContent(note.content);
		setSelectedColor(note.color);
		setModalVisible(true);
	};

	const saveNote = async () => {
		if (title.trim() === '') {
			Alert.alert('Error', 'El título no puede estar vacío.');
			return;
		}
		const db = await getConnection();
		if (editingNote) {
			await updateNote(db, {...editingNote, title, content, color: selectedColor});
		} else {
			const now = new Date().toISOString();
			await insertNote(db, {id: -1, title, content, color: selectedColor, created_at: now});
		}
		setModalVisible(false);
		loadNotes();
	};

	const handleDelete = (id: number) => {
		Alert.alert('Eliminar nota', '¿Estás seguro?', [
			{text: 'Cancelar', style: 'cancel'},
			{
				text: 'Eliminar',
				style: 'destructive',
				onPress: async () => {
					const db = await getConnection();
					await deleteNote(db, id);
					loadNotes();
				},
			},
		]);
	};

	const handleDeleteAll = () => {
		Alert.alert('Limpiar todas las notas', '¿Eliminar todas las notas?', [
			{text: 'Cancelar', style: 'cancel'},
			{
				text: 'Limpiar',
				style: 'destructive',
				onPress: async () => {
					const db = await getConnection();
					await deleteAllNotes(db);
					loadNotes();
				},
			},
		]);
	};

	const formatDate = (iso: string) => {
		const d = new Date(iso);
		return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Sticky Notes</Text>

			<TextInput
				style={styles.searchInput}
				placeholder="Buscar por título..."
				value={search}
				onChangeText={handleSearch}
			/>

			<FlatList
				data={notes}
				keyExtractor={item => item.id.toString()}
				renderItem={({item}) => (
					<TouchableOpacity
						style={[styles.noteCard, {backgroundColor: item.color}]}
						onPress={() => openEditNote(item)}>
						<Text style={styles.noteTitle}>{item.title}</Text>
						<Text style={styles.noteContent} numberOfLines={3}>{item.content}</Text>
						<Text style={styles.noteDate}>{formatDate(item.created_at)}</Text>
						<TouchableOpacity
							style={styles.deleteBtn}
							onPress={() => handleDelete(item.id)}>
							<Text style={styles.deleteBtnText}>Eliminar</Text>
						</TouchableOpacity>
					</TouchableOpacity>
				)}
				ListEmptyComponent={<Text style={styles.empty}>No hay notas.</Text>}
			/>

			<View style={styles.bottomButtons}>
				<TouchableOpacity style={styles.addBtn} onPress={openNewNote}>
					<Text style={styles.addBtnText}>+ Nueva nota</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.clearBtn} onPress={handleDeleteAll}>
					<Text style={styles.clearBtnText}>Limpiar todo</Text>
				</TouchableOpacity>
			</View>

			<Modal visible={modalVisible} animationType="slide" transparent>
				<View style={styles.modalOverlay}>
					<ScrollView contentContainerStyle={styles.modalContent}>
						<Text style={styles.modalTitle}>
							{editingNote ? 'Editar nota' : 'Nueva nota'}
						</Text>
						<TextInput
							style={styles.input}
							placeholder="Título"
							value={title}
							onChangeText={setTitle}
						/>
						<TextInput
							style={[styles.input, styles.textArea]}
							placeholder="Contenido"
							value={content}
							onChangeText={setContent}
							multiline
						/>
						<Text style={styles.colorLabel}>Color:</Text>
						<View style={styles.colorRow}>
							{COLORS.map(c => (
								<TouchableOpacity
									key={c}
									style={[
										styles.colorCircle,
										{backgroundColor: c},
										selectedColor === c && styles.colorSelected,
									]}
									onPress={() => setSelectedColor(c)}
								/>
							))}
						</View>
						<TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
							<Text style={styles.saveBtnText}>Guardar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cancelBtn}
							onPress={() => setModalVisible(false)}>
							<Text style={styles.cancelBtnText}>Cancelar</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {flex: 1, padding: 16, backgroundColor: '#f5f5f5'},
	header: {fontSize: 26, fontWeight: 'bold', marginBottom: 12, textAlign: 'center'},
	searchInput: {
		borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
		paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12,
		backgroundColor: '#fff',
	},
	noteCard: {
		borderRadius: 10, padding: 14, marginBottom: 10,
		elevation: 2,
	},
	noteTitle: {fontSize: 16, fontWeight: 'bold', marginBottom: 4},
	noteContent: {fontSize: 14, color: '#444', marginBottom: 6},
	noteDate: {fontSize: 11, color: '#888', marginBottom: 8},
	deleteBtn: {alignSelf: 'flex-end', backgroundColor: '#e53935', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4},
	deleteBtnText: {color: '#fff', fontSize: 12},
	empty: {textAlign: 'center', color: '#aaa', marginTop: 40},
	bottomButtons: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 10},
	addBtn: {flex: 1, backgroundColor: '#1976D2', borderRadius: 8, padding: 12, marginRight: 6, alignItems: 'center'},
	addBtnText: {color: '#fff', fontWeight: 'bold'},
	clearBtn: {flex: 1, backgroundColor: '#e53935', borderRadius: 8, padding: 12, marginLeft: 6, alignItems: 'center'},
	clearBtnText: {color: '#fff', fontWeight: 'bold'},
	modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center'},
	modalContent: {backgroundColor: '#fff', margin: 20, borderRadius: 12, padding: 20},
	modalTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 14},
	input: {borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12},
	textArea: {height: 100, textAlignVertical: 'top'},
	colorLabel: {fontWeight: 'bold', marginBottom: 8},
	colorRow: {flexDirection: 'row', marginBottom: 16},
	colorCircle: {width: 32, height: 32, borderRadius: 16, marginRight: 8, borderWidth: 1, borderColor: '#ccc'},
	colorSelected: {borderWidth: 3, borderColor: '#333'},
	saveBtn: {backgroundColor: '#1976D2', borderRadius: 8, padding: 12, alignItems: 'center', marginBottom: 8},
	saveBtnText: {color: '#fff', fontWeight: 'bold'},
	cancelBtn: {borderRadius: 8, padding: 12, alignItems: 'center'},
	cancelBtnText: {color: '#888'},
});

export default NotesScreen;
