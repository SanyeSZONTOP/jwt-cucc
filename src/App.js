import React, { useState } from 'react';
import axios from 'axios';
import {Button, TextField, Typography} from "@mui/material";


function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [data, setData] = useState('');


    const handleLogin = async() => {
        try {
            const response = await axios.post('https://jwt.sulla.hu/login', { username, password });
            setToken(response.data.token);
        } catch (error) {
            console.error("Hitelesítés sikertelen: ", error);
        }
    };
    const fetchData = async() => {
        try {
            const response = await axios.get('https://jwt.sulla.hu/termekek', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Adatok lekérése sikertelen: ", error);
        }
    };
    return (
        <div>
            <h1>Bejelentkezés</h1>
            <Typography>Felhasználónév:</Typography>
             <TextField
            type="text"
            placeholder="felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)} /><br />
            <Typography>Jelszó: </Typography> <TextField
            type="password"
            placeholder="jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <Button variant={'contained'}
                onClick={handleLogin}>Bejelentkezés</Button>
            {token &&(
                <div>
                    <h2>Védett végpont</h2>
                    <Button variant={'outlined'} onClick={fetchData}>Végpont lekerdezés</Button>
                    {data && (
                        <ul>
                            { data.map((item) => (
                                <li key={item.id}>{item.name} - {item.price}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;