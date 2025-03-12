const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rutas
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/matches');
const statsRoutes = require('./routes/stats');

app.use('/api/stats', statsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
