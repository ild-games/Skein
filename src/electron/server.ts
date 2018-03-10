import * as express from 'express';

const app = express();
app.use(express.static(__dirname + '/spool'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.listen(4200, () => console.log('Spool server listening on port 4200!'));
