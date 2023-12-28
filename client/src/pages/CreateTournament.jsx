import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthUser from '../components/AuthUser';

export const CreateTournament = () => {
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
                const response = await axios.get('/api/games');
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
            const response = await axios.post('/api/tournaments', formData, {
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
            <div className='box py-4'>
                <h2 className='my-4 xs:text-center'>Utwórz turniej</h2>
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="flex md:flex-row justify-center items-center xs:flex-col xs:w-full md:w-6/12">
                        <div className='md:mr-5 xs:mr-0 md:w-6/12 xs:w-full'>
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
                        <div className='py-2 md:w-6/12 xs:w-full'>
                            <label htmlFor="GameID">Game:</label>
                            <select name="GameID" onChange={handleInputChange} value={formData.GameID} required>
                                <option value="">Wybierz grę</option>
                                {games.map((game) => (
                                    <option key={game.GameID} value={game.GameID}>
                                        {game.GameName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex md:flex-row justify-center items-center xs:flex-col xs:w-full md:w-6/12">
                            <div className='md:mr-5 xs:mr-0 md:w-6/12 xs:w-full'>
                                <label htmlFor="Privacy">Prywatność:</label>
                                <select name="Privacy" onChange={handleInputChange} value={formData.Privacy} required>
                                    <option value="Publiczny">Publiczny</option>
                                    <option value="Prywatny">Prywatny</option>
                                </select>
                            </div>
                            <div className='py-2 md:w-6/12 xs:w-full'>
                                <label htmlFor="TournamentFormat">Format:</label>
                                <select name="TournamentFormat" onChange={handleInputChange} value={formData.TournamentFormat} required>
                                    <option value="1v1">1v1</option>
                                    <option value="2v2">2v2</option>
                                    <option value="5v5">5v5</option>
                                </select>
                            </div>
                    </div>
                    <div className="flex md:flex-row justify-center items-center xs:flex-col xs:w-full md:w-6/12">
                        <div className='md:mr-5 xs:mr-0 md:w-6/12 xs:w-full'>
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
                        <div className='py-2 md:w-6/12 xs:w-full'>

                        </div>
                    </div>
                    
                    <input
                        type="hidden"
                        name="Status"
                        value={formData.Status} // Wartość domyślna, nie wyświetlana użytkownikowi
                    />
                     <button className='my-2' type="submit">Create Tournament</button>
                </form>
               
            </div>
        </div>
    );
};
