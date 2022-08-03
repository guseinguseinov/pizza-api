import http from 'http';
import app from './app.js';

const server = http.createServer(app);
const adminServer = http.createServer(admin);

server.listen(8080, () => {
    console.log('Server listen to http://localhost:8080');
});
