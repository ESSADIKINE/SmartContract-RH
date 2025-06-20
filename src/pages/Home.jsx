import React, { useContext } from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import { RHContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isOwner } = useContext(RHContext);
  const navigate = useNavigate();
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Bienvenue sur la DApp RH</Typography>
      <Typography variant="h6">Vous êtes {isOwner ? "l'admin RH" : 'un employé'}.</Typography>
      <Typography sx={{ mt: 2, mb: 3 }}>Utilisez la barre de navigation ou les boutons ci-dessous pour accéder aux fonctionnalités.</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {isOwner && <Button variant="contained" onClick={() => navigate('/employees')}>Liste employés</Button>}
        {isOwner && <Button variant="contained" onClick={() => navigate('/add')}>Ajouter employé</Button>}
        <Button variant="contained" onClick={() => navigate('/me')}>Mes infos</Button>
      </Box>
    </Paper>
  );
};

export default Home; 