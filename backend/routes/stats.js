const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener estadísticas de un jugador
router.get('/player/:id', async (req, res) => {
    const playerId = req.params.id;

    try {
        // Total de partidos jugados
        const [playedMatches] = await db.query(
            `SELECT COUNT(*) AS total FROM partidos_jugadores WHERE jugador_id = ?`,
            [playerId]
        );

        // Partidos ganados
        const [wonMatches] = await db.query(
            `SELECT COUNT(*) AS wins FROM partidos_jugadores pj
             JOIN partidos p ON pj.partido_id = p.id
             WHERE pj.jugador_id = ? AND p.ganador = pj.equipo`,
            [playerId]
        );

        // Total de goles
        const [totalGoals] = await db.query(
            `SELECT SUM(goles) AS goles FROM partidos_jugadores WHERE jugador_id = ?`,
            [playerId]
        );

        // Goles por partido
        const goalsPerMatch = (totalGoals[0].goles / playedMatches[0].total).toFixed(2);

        // Respuesta
        res.json({
            playerId,
            matchesPlayed: playedMatches[0].total,
            matchesWon: wonMatches[0].wins,
            totalGoals: totalGoals[0].goles || 0,
            goalsPerMatch: isNaN(goalsPerMatch) ? 0 : goalsPerMatch,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
