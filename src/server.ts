import express from 'express';
import cors from 'cors';
import { SECRET } from "./routers/secret";
import { todos } from "./routers/todoRouter";
import {users} from './routers/userRouter'
import expressJwt from 'express-jwt';
const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(expressJwt({ secret: SECRET }).unless({ path: ['/users/register', '/users/login'] }));


app.use('/users', users);
app.use('/todos', todos);

app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.listen(PORT, () => console.log(`Server is up at ${PORT}`));