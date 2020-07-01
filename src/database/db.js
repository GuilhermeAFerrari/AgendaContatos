const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database.db');
module.exports = db;

// Scripts de criação das tabelas
db.serialize(() => {
     // Criar uma tabela com comandos SQL
     db.run(`
         CREATE TABLE IF NOT EXISTS records(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             telephone1 TEXT,
             telephone2 TEXT,
             email TEXT,
             city TEXT,
             state TEXT
           );`);
});