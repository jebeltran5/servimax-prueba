const mysql = require('mysql2');

//crear la conexion

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tienda_mascotas',
    port: 3306
});

//conecta a la base de datos
connection.connect((err) => {
    if(err){
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('conectado a la base de datos como id' + connection.threadId);
});

module.exports = connection;
