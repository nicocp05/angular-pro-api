import express from 'express';
import routerUser from './user';
import routerAuth from './auth';

const app = express();

app.use('/user', routerUser);
app.use('/auth', routerAuth);




export default app;