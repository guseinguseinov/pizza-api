import http from 'http';
import { app, admin } from './app.js';

const server = http.createServer(app);
const adminServer = http.createServer(admin);

server.listen(8080, () => {
    console.log('Server listen to http://localhost:8080');
});

adminServer.listen(8083, () => {
    console.log('Admin listen to http://localhost:8083');
});