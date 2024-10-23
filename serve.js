const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa la conexión

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Obtener las clasificaciones únicas
app.get('/clasificaciones', (req, res) => {
    db.query('SELECT DISTINCT nombre FROM Clasificacion', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const clasificaciones = results.map(row => row.nombre);
        res.json(clasificaciones);
    });
});

// Endpoint para obtener productos con paginación y filtrado por clasificación
app.get('/productos', (req, res) => {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = 10;
    const clasificacion = req.query.clasificacion || ''; // Filtrar por clasificación
    const inicio = (pagina - 1) * limite;
    
    let query = 'SELECT * FROM Producto';
    let queryParams = [];

    // Filtrar productos por clasificación si se proporciona
    if (clasificacion) {
        query += ' WHERE clasificacion_id = (SELECT id FROM Clasificacion WHERE nombre = ?)';
        queryParams.push(clasificacion);
    }

    query += ' LIMIT ?, ?';
    queryParams.push(inicio, limite);

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error en la consulta de productos: ', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
