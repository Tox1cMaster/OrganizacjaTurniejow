import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Functions(){
    const [tournaments, setTournaments] = useState([]);
    const [games, setGames] = useState([]);

    const getGameName = (gameID) => {
        const game = games.find(g => g.GameID === gameID);
        return game ? game.GameName : 'Unknown Game';
    };

    // Funkcja do zamiany statusu na nazwę
    const getStatusName = (status) => {
        const statusNames = ['Nie rozpoczęty', 'W trakcie rozgrywki', 'Zakończony'];
        return statusNames[status] || 'Nieznany status';
    };

    useEffect(() => {
        // Pobieranie gier
        const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/games');
            setGames(response.data); // Ustawienie stanu games na dane otrzymane z API
        } catch (error) {
            console.error('Error fetching games:', error);
        }
        };

        // Pobieranie turniejów
        const fetchTournaments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/tournaments');
            setTournaments(response.data);
        } catch (error) {
            console.error('Error fetching tournaments:', error);
        }
        };

        fetchGames();
        fetchTournaments();
    }, 
    []);

    return {
        getStatusName,
        getGameName
    }
}