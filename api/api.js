import fs from 'fs';
import express from 'express';
import { randomUUID } from 'crypto';
import sqlite3 from 'sqlite3';
import cors from 'cors';

var sql;
const sqlite = sqlite3.verbose();

fs.writeFile('uuids.db', '', { flag: 'wx' }, function (err) {
    if(!err) console.log('Created uuids.db file.');
});

const db = new sqlite.Database('uuids.db', sqlite.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);
})

sql = `CREATE TABLE uuids(uuid text PRIMARY KEY UNIQUE, data text NOT NULL, created int NOT NULL, last_used int NOT NULL);`;
db.run(sql, (err) => {
    if(!err) return console.log('[SQL] Created database table.');
});

const app = express();
const port = 3001;

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.post('/', (req, res) => {
    var data = JSON.stringify(req.body);
    var uuid = randomUUID().substring(0, 6);

    sql = `INSERT INTO uuids (uuid, data, created, last_used) VALUES (?, ?, ?, ?);`;
    db.run(sql, 
        [uuid, data, Date.now(), Date.now()],
        (err) => {
        if(err) return console.error(err.message);
    });

    res.send(JSON.stringify({'uuid':uuid}));
});

app.get('/:uuid', (req, res) => {
    var uuid = req.params.uuid;
    sql = `SELECT * FROM uuids WHERE uuid = ?;`;
    db.all(sql, [uuid], (err, rows) => {
        if(err) return console.error(err.message);
        if(rows.length > 0) {
            res.send(JSON.parse(rows[0]['data']));
        } else {
            res.sendStatus(404);
        }
    })
});

app.get('/stats', (req, res) => {
    var total = 0;
    db.all("SELECT COUNT(*) as 'count' FROM uuids;", (err, rows) => {
        total = rows[0].count;
        console.log(total)
    }).wait(() => {
        res.send({total: total});
    })
});

app.all('/', (req, res) => {
    res.sendStatus(404);
})

app.listen(port);
