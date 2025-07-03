import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

export default function Login({ onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          if (onLoggedIn) onLoggedIn();
        } else {
          alert('Falha no login');
        }
      })
      .catch(() => alert('Erro ao logar'));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button variant="contained" type="submit">Entrar</Button>
      </Box>
    </Container>
  );
}
