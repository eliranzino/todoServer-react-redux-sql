import {sql} from './sql';
import { User } from './models/user';

export async function addUser(userName: string, password: string): Promise<number> {
    const [{insertId}] = await sql.execute('INSERT INTO users (UserName, Password) VALUES (?, ?)', [userName, password]);
    return insertId;
}

export async function getTheIdOfTheUsweName(userName: string, password: string): Promise<number> {
    const [userNameId] = await sql.execute('select id from users where username = ? and password =?', [userName, password]);
    return userNameId[0].id;
}

export async function checkUserExists(userName: string): Promise<boolean> {
    const [users] = await sql.execute('SELECT ID FROM users WHERE userName = ?', [userName]);
    return users.length > 0;
}

export async function checkUserPassword(password: string): Promise<boolean> {
    const [users] = await sql.execute('SELECT ID FROM users WHERE password = ?', [password]);
    return users.length > 0;
}

export async function getUsers(): Promise<User[]> {
    const [users] = await sql.execute('SELECT * FROM users');
    return users;
}

export async function searchUsers(keyword: string): Promise<User[]> {
    const [users] = await sql.execute(`SELECT * FROM users WHERE username LIKE ?`, [`%${keyword}%`]);
    return users;
}

