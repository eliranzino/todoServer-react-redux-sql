import { SECRET } from "./secret";
import express from "express";
import jwt from "jsonwebtoken";
import { addUser, checkUserExists, checkUserPassword, getTheIdOfTheUsweName, searchUsers, getUsers } from '../userQueries';
import { userSchema } from '../schemas/user';

const router = express.Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        const users = name ? await searchUsers(name as string) : await getUsers();
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users', async (req, res) => {
    const { userName, password } = req.body;
    const { error } = userSchema.validate({ userName, password });
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    if (await checkUserExists(userName)) {
        res.status(400).send('User already exists');
        return;
    }
    const userId = await addUser(userName, password);
    res.send({ userId });
});

router.post('/register', async (req, res) => {
    const { userName, password } = req.body;
    console.log({ userName, password })
    const { error } = userSchema.validate({ userName, password });
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    if (await checkUserExists(userName)) {
        res.status(400).send('User already exists');
        return;
    }
    const userId = await addUser(userName, password);
    const token = generateToken(userId);

    res.send({ success: true, msg: 'welcome!', token });
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    const { error } = userSchema.validate({ userName, password });
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    if (!await checkUserExists(userName)) {
        res.status(400).send('User name dont match');
        return;
    }
    if (!await checkUserPassword(password)) {
        res.status(400).send('Password dont match');
        return;
    }
    const userNameId = await getTheIdOfTheUsweName(userName, password);
    const token = generateToken(userNameId);
    res.send({ success: true, msg: 'welcome back!', token });
});

function generateToken(userId: number) {
    return jwt.sign({ id: userId }, SECRET);
}

export { router as users };