const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
    const { email, nombre, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    try {
        await db.query(
            'INSERT INTO usuarios (nombre, email, contraseña, registrado) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, true]
        );
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
