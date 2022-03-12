import express from 'express';
import routerUser from './user';
import routerAuth from './auth';
import routerHospital from './hospital';
import routerDoctor from './doctor';

const app = express();

app.use('/user', routerUser);
app.use('/auth', routerAuth);
app.use('/hospital', routerHospital);
app.use('/doctor', routerDoctor);




export default app;