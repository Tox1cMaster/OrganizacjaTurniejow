import React, { useState } from 'react';
import axios from 'axios';

export const CreateGame = () => {
    const [gameName, setGameName] = useState('');

    const handleGameNameChange = (e) => {
        setGameName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Przy założeniu, że istnieje endpoint API '/api/games' do tworzenia gier
            const response = await axios.post('http://localhost:8000/api/games', { GameName: gameName }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Dołącz token JWT, jeśli jest wymagane uwierzytelnienie
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            // Po pomyślnym utworzeniu gry
            console.log('Game Created:', response.data);
            setGameName(''); // Opcjonalnie można wyczyścić pole formularza
            // Możesz dodać tutaj przekierowanie lub inne działania po utworzeniu gry
        } catch (error) {
            console.error('Error creating game:', error.response.data);
            // Obsłuż błędy, np. wyświetlając informacje dla użytkownika
        }
    };

    return (
        <div className='container'>
            <div className='box'>
            <h2>Stwórz grę</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="gameName">Nazwa gry:</label>
                    <input
                        id="gameName"
                        type="text"
                        value={gameName}
                        onChange={handleGameNameChange}
                        placeholder="Nazwa gry"
                        required
                    />
                </div>
                <button type="submit">Utwórz grę</button>
            </form>
            </div>
        </div>
    );
};