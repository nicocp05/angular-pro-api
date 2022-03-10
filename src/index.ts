import express, { Application } from 'express';
import router from './routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './database/config';
dotenv.config();

const app: Application = express();
const port: string | number = process.env.PORT || 3000;

dbConnection();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api', router);


app.listen( port, () => {
    console.log( `Server on port ${port}` );
});