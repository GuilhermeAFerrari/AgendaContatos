const express = require('express');
const app = express();

// Configurar pasta publica
app.use(express.static("public"));

// Habilitar o uso do req.body na nossa aplicação
app.use(express.urlencoded({ extended: true }));

// Pegar o banco de dados
const db = require('./database/db.js');

app.get('/list', (req, res) => {
    return res.render('list.html');
});

app.post('/create-record', (req, res) => {

    const query = `
         INSERT INTO records (
             name,
             telephone1,
             telephone2,
             email,
             city,
             state,
         ) VALUES (?,?,?,?,?,?);
     `;

     const values = [
        req.body.name,
        req.body.telephone1,
        req.body.telephone2,
        req.body.email,
        req.body.city,
        req.body.state,
     ];

     db.run(query, values);

});

app.delete('/delete-record', (req, res) => {
    return res.json('rota de inativação OK');
});

app.listen(3333);