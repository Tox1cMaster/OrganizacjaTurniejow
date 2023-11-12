import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthUser from '../components/AuthUser';

export const TournamentEdit = () => {
    const {getToken} = AuthUser();
    // Stan dla formularza i listy gier
    const [formData, setFormData] = useState({
        TournamentName: '',
        GameID: '',
        Privacy: 'Publiczny',
        TournamentFormat: '1v1',
        Status: 0, // domyślnie nie rozpoczęty
        Prizepool: ''
    });
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Pobranie listy gier
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/games');
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = getToken(); // Pobranie tokena JWT z sessionStorage
            const response = await axios.post('http://localhost:8000/api/tournaments', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Tournament Created:', response.data);
            // Tutaj można dodać przekierowanie lub aktualizację stanu aplikacji
        } catch (error) {
            console.error('Error creating tournament:', error);
            // Tutaj można obsłużyć błędy, np. wyświetlając informacje dla użytkownika
        }
    };

    return (
        <div className='container'>
            <div className='box'>
                <h2>Edytuj turniej</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="TournamentName">Nazwa turnieju:</label>
                        <input
                            type="text"
                            name="TournamentName"
                            value={formData.TournamentName}
                            onChange={handleInputChange}
                            placeholder="Nazwa turnieju"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="GameID">Gra:</label>
                        <select name="GameID" onChange={handleInputChange} value={formData.GameID} required>
                            <option value="">Wybierz grę</option>
                            {games.map((game) => (
                                <option key={game.GameID} value={game.GameID}>
                                    {game.GameName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Privacy">Prywatność:</label>
                        <select name="Privacy" onChange={handleInputChange} value={formData.Privacy} required>
                            <option value="Publiczny">Publiczny</option>
                            <option value="Prywatny">Prywatny</option>
                        </select>
                    </div>w
                    <div>
                        <label htmlFor="Prizepool">Prizepool:</label>
                        <input
                            type="number"
                            name="Prizepool"
                            value={formData.Prizepool}
                            onChange={handleInputChange}
                            placeholder="Prizepool"
                            required
                        />
                    </div>
                    <input
                        type="hidden"
                        name="Status"
                        value={formData.Status} // Wartość domyślna, nie wyświetlana użytkownikowi
                    />
                    <button type="submit">Potwierdź zmiany</button>
                </form>
            </div>
        </div>
    );
}
