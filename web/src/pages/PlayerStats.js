import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerStats = ({ playerId }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/stats/player/${playerId}`);
                setStats(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchStats();
    }, [playerId]);

    if (!stats) return <p>Cargando estadísticas...</p>;

    return (
        <div>
            <h2>Estadísticas del Jugador</h2>
            <p>Partidos Jugados: {stats.matchesPlayed}</p>
            <p>Partidos Ganados: {stats.matchesWon}</p>
            <p>Goles Totales: {stats.totalGoals}</p>
            <p>Goles por Partido: {stats.goalsPerMatch}</p>
        </div>
    );
};

export default PlayerStats;
