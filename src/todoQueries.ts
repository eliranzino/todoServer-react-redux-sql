import {sql} from './sql';
import { Todo } from './models/todo';


export async function addTodo(Description: string, date: string, userId: number): Promise<number> {
    const [{insertId}] = await sql.execute('INSERT INTO todos (Description, date, UserId) VALUES (?, ?, ?)', [Description, date, userId]);
    return insertId;
}

export async function getTodos(userId: number): Promise<Todo[]> {
    const [todos] = await sql.execute('SELECT * FROM todos WHERE userId = ?', [userId]);
    return todos;
}

export async function toggleComplete(todoId: number, userId: number): Promise<boolean> {
    const [result] = await sql.execute('UPDATE todos SET Complete = NOT Complete WHERE id = ? AND userId = ?', [todoId, userId]);
    return result.affectedRows > 0;
}

export async function deleteTodo(todoId: number, userId: number): Promise<boolean> {
    const [{affectedRows}] = await sql.execute('DELETE FROM todos WHERE id = ? AND userId = ?', [todoId, userId])
    return affectedRows > 0
}