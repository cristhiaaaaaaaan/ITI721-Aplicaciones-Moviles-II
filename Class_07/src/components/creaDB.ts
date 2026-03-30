import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import {User} from '../models/Users.ts';

enablePromise(true);
const tableName = 'Users';

export const createTable = async (db: SQLiteDatabase) => {
	await db.transaction((tx: any) => {
	   tx.executeSql(`create table if not exists ${tableName}(id integer primary key autoincrement , name text, email text);`);
	}).then(() => {
		console.log('Table created successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};

export const getConnection = () => {
	return openDatabase({name: 'myDB.db', location: 'default'});
};

export const insertUser = async (db: SQLiteDatabase, user: User) => {
	await db.transaction((tx: any) => {
		tx.executeSql(`insert into ${tableName}(name, email) VALUES (?, ?);`, [user.name, user.email]);
	}).then(() => {
		console.log('User inserted successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};

export const getUsers = async (db: SQLiteDatabase) => {
	try{
		const results = await db.executeSql(`select * from ${tableName};`, []);
		let users: User[] = [];
		results.forEach(result => {
			for (let i = 0; i < result.rows.length; i++) {
				users.push(result.rows.item(i));
			}
		});
		return users;
	}catch(error: any){
		console.log(error);
	}
};

export const getUser = async (db: SQLiteDatabase, id: number) => {
   try{
	   const results = await db.executeSql(`select * from ${tableName} where id = ?;`, [id]);
	   return results[0].rows.item(0);
   }catch(error: any){
		console.log(error);
	}
};

export const updateUser = async (db: SQLiteDatabase, user: User) => {
	await db.transaction((tx: any) => {
		tx.executeSql(`update ${tableName} set name = ?, email = ? where id = ?;`, [user.name, user.email, user.id]);
	}).then(() => {
		console.log('User updated successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};

export const deleteUser = async (db: SQLiteDatabase, id: number) => {
	await db.transaction((tx: any) => {
		tx.executeSql(`delete from ${tableName} where id = ?;`, [id]);
	}).then(() => {
		console.log('User deleted successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};

export const deleteTable = async (db: SQLiteDatabase) => {
	await db.transaction((tx: any) => {
		tx.executeSql(`drop table ${tableName};`);
	}).then(() => {
		console.log('Table deleted successfully');
	}).catch((error: any) => {
		console.log(error);
	});
};
