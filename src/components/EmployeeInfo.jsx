import React, { useState, useContext } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { RHContext } from '../App';

const EmployeeInfo = () => {
  const { contract, account, setAlert } = useContext(RHContext);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMyInfo = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const res = await contract.methods.getMyInfo().call({ from: account });
      setInfo(res);
    } catch (err) {
      setAlert({ open: true, message: 'Erreur : ' + err.message, severity: 'error' });
    }
    setLoading(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={fetchMyInfo} disabled={loading} sx={{ mb: 2 }}>
        {loading ? 'Chargement...' : 'Voir mes infos'}
      </Button>
      {info && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography>Nom : {info[0]}</Typography>
          <Typography>Poste : {info[1]}</Typography>
          <Typography>Salaire : {info[2]}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default EmployeeInfo; 