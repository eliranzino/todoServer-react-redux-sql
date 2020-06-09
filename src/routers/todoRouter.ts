import express from "express";
import { addTodo, getTodos, toggleComplete, deleteTodo } from '../todoQueries'
import { todoSchema } from "../schemas/todo";


const router = express.Router();

router.post('/', async (req, res) => {
    //@ts-ignore
    const { id: userId } = req.user;
    console.log('this is req user',userId);
    const { Description, date } = req.body;
    console.log(Description, date, userId)

    const result = todoSchema.validate({userId,Description,date });
    console.log(Description, date, userId)
    if(result.error){
        res.status(400).send(JSON.stringify({success: false, msg: result.error}));
        return;
    }

    const ID = await addTodo(Description, date, userId);

    const newTask = {ID, Description, date, userId, complete: false}

    if(ID){
        res.send(newTask)
    }else{
        res.status(500).send(JSON.stringify({success: false, msg: 'Please try again later.'}))
    }
});

router.get('/', async (req, res) => {
    //@ts-ignore
    const { id } = req.user;
    console.log('the req user is:', id)
    if (isNaN(Number(id))) {
        res.status(400).send('userId must be a number');
        return;
    }
    try {
        const todos = await getTodos(Number(id));
        res.send(todos);
    } catch (e) {
        res.status(500).send('Server is unavailable, please try again later');
    }
});

router.put('/:id/toggleComplete', async (req, res) => {
    //@ts-ignore
    const { id: userId } = req.user;
    console.log('THIS IS the userId', userId)
    const { id } = req.params;
    console.log('this is the ID', id)
    if (isNaN(Number(userId))) {
        res.status(400).send('userId must be a number');
        return;
    }

    if (isNaN(Number(id))) {
        res.status(400).send('id must be a number');
        return;
    }
    const result = await toggleComplete(Number(id), Number(userId));
    res.send(
        JSON.stringify({ success: true, msg: "Todo toggled successfully.", id })
      );
});

router.delete('/:id', async (req, res) => {
    //@ts-ignore
    const { id: userId } = req.user;
    console.log('the req user is-', userId);
    const { id } = req.params;
    if (isNaN(Number(userId))) {
        res.status(400).send('userId must be a number');
        return;
    }

    if (isNaN(Number(id))) {
        res.status(400).send('id must be a number');
        return;
    }
    const result = await deleteTodo(Number(id), Number(userId));
    res.send({result, id});
});


export { router as todos };