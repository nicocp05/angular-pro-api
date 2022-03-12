import express from 'express';
import routerUser from './user';
import routerAuth from './auth';
import routerHospital from './hospital';
import routerDoctor from './doctor';
import routerSearch from './search';

const app = express();

app.use('/user', routerUser);
app.use('/auth', routerAuth);
app.use('/hospital', routerHospital);
app.use('/doctor', routerDoctor);
app.use('/search', routerSearch);




export default app;