import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import {Note} from '../models/Note.ts';

enablePromise(true);
const tableName = 'Notes';

export const getConnection = () => {
	return openDatabase({name: 'notesDB.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
	await db.transaction((tx: any) => {
		tx.executeSql(
			`create table if not exists ${tableName}(
				id integer primary key autoincrement,
				title text,
				content text,
				color text,
				created_at text
			);`
		);
	}).then(() => {
		console.log('Notes table created successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};

export const insertNote = async (db: SQLiteDatabase, note: Note) => {
	await db.transaction((tx: any) => {
		tx.executeSql(
			`insert into ${tableName}(title, content, color, created_at) VALUES (?, ?, ?, ?);`,
			[note.title, note.content, note.color, note.created_at]
		);
	}).then(() => {
		console.log('Note inserted successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};

export const getNotes = async (db: SQLiteDatabase) => {
	try {
		const results = await db.executeSql(
			`select * from ${tableName} order by created_at desc;`, []
		);
		let notes: Note[] = [];
		results.forEach(result => {
			for (let i = 0; i < result.rows.length; i++) {
				notes.push(result.rows.item(i));
			}
		});
		return notes;
	} catch (error: any) {
		console.log(error);
		return [];
	}
};

export const searchNotesByTitle = async (db: SQLiteDatabase, title: string) => {
	try {
		const results = await db.executeSql(
			`select * from ${tableName} where title like ? order by created_at desc;`,
			[`%${title}%`]
		);
		let notes: Note[] = [];
		results.forEach(result => {
			for (let i = 0; i < result.rows.length; i++) {
				notes.push(result.rows.item(i));
			}
		});
		return notes;
	} catch (error: any) {
		console.log(error);
		return [];
	}
};

export const updateNote = async (db: SQLiteDatabase, note: Note) => {
	await db.transaction((tx: any) => {
		tx.executeSql(
			`update ${tableName} set title = ?, content = ?, color = ? where id = ?;`,
			[note.title, note.content, note.color, note.id]
		);
	}).then(() => {
		console.log('Note updated successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};

export const deleteNote = async (db: SQLiteDatabase, id: number) => {
	await db.transaction((tx: any) => {
		tx.executeSql(`delete from ${tableName} where id = ?;`, [id]);
	}).then(() => {
		console.log('Note deleted successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};

export const deleteAllNotes = async (db: SQLiteDatabase) => {
	await db.transaction((tx: any) => {
		tx.executeSql(`delete from ${tableName};`);
	}).then(() => {
		console.log('All notes deleted successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};
