import express from 'express';
import router from './routes/index.routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { dbConnection } from './database/config';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

dbConnection();

app.use(router);
app.use(express.json());
app.use(morgan('dev'));

app.listen( port, () => {
    console.log( `Server on port ${port}` );
});