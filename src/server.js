const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

// Configurar pasta publica
app.use(express.static("public"));

// Habilitar o uso do req.body na nossa aplicação
app.use(express.urlencoded({ extended: true }));

// Pegar o banco de dados
const db = require('./database/db.js');

// Utilizando template engine
nunjucks.configure("src/views", {
    express: app,
    noCache: true,
});

app.get('/list', (req, res) => {
    // Consulta no banco
    db.all('SELECT * FROM records', function(err, rows){
        if(err){
            return console.log(err);
        }

        const total = rows.length;

        // Mostrar a página HTML com os dados do banco de dados
        return res.render('list.html', { records: rows });
    });
});

app.get('/create-record', (req, res) => {
    return res.render('create-record.html');
});

app.post('/save-record', (req, res) => {

   const query = `
         INSERT INTO records
         (name, telephone1, telephone2, email, city, state)
         VALUES
         (?,?,?,?,?,?);
     `;

     const values = [
        req.body.name,
        req.body.telephone1,
        req.body.telephone2,
        req.body.email,
        req.body.city,
        req.body.state,
     ];

     function afterInsertData(err) {
        if(err){
            console.log(err);
            return res.send("Erro no cadastro!");
        }

        console.log('Cadastrado com sucesso');
        console.log(this);

        return res.render('create-record.html');
    }

     db.run(query, values, afterInsertData);
});

/*app.delete('/delete-record', (req, res) => {
    return res.json('Rota de inativação OK');
});*/

app.listen(3333);