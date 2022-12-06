import express, { Express } from 'express';
import dotenv from 'dotenv';

import { init } from './db/connection';
import { pingRouter } from './routes/ping';
import { userRouter } from './routes/user';
import { IDB_CONFIG } from './types.d';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
// const DB = process.env.DB;
if (!DB_HOST) {
    throw new Error('DB_HOST not found in .env file');
}
if (!DB_PORT) {
    throw new Error('DB_PORT not found in .env file');
}
if (!DB_USER) {
    throw new Error('DB_USER not found in .env file');
}
if (!DB_PASS) {
    throw new Error('DB_PASS not found in .env file');
}
// if (!DB) {
//     throw new Error('DB not found in .env file');
// }

const DB_CONFIG: IDB_CONFIG = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    // database: DB
}




const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/ping', pingRouter);
app.use('/user', userRouter);

app.listen(PORT, async () => {
    init(DB_CONFIG);
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});