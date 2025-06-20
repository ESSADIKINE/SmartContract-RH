import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import RHContext from '../RHContext';

const Navbar = () => {
  const { account, isOwner } = useContext(RHContext);
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DApp RH
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/" disabled={location.pathname === '/'}>Accueil</Button>
          <Button color="inherit" component={Link} to="/employees" disabled={location.pathname === '/employees'}>Liste employés</Button>
          <Button color="inherit" component={Link} to="/add" disabled={location.pathname === '/add'}>Ajouter employé</Button>
          <Button color="inherit" component={Link} to="/me" disabled={location.pathname === '/me'}>Mes infos</Button>
        </Box>
        <Box sx={{ ml: 4, textAlign: 'right' }}>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {isOwner ? 'Admin' : 'Employé'}<br />
            {account && account.slice(0, 6) + '...' + account.slice(-4)}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 