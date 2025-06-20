import React from 'react';
import { Typography, Paper } from '@mui/material';
import EmployeeInfo from '../components/EmployeeInfo';

const MyInfo = () => (
  <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
    <Typography variant="h5" gutterBottom>Mes informations</Typography>
    <EmployeeInfo />
  </Paper>
);

export default MyInfo; 