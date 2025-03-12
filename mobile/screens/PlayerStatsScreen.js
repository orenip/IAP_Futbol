import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PlayerStatsScreen = ({ route }) => {
    const { playerId } = route.params;
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

    if (!stats) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estadísticas del Jugador</Text>
            <Text>Partidos Jugados: {stats.matchesPlayed}</Text>
            <Text>Partidos Ganados: {stats.matchesWon}</Text>
            <Text>Goles Totales: {stats.totalGoals}</Text>
            <Text>Goles por Partido: {stats.goalsPerMatch}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default PlayerStatsScreen;
