import React from 'react';
import { Typography, Paper } from '@mui/material';
import EmployeeForm from '../components/EmployeeForm.jsx';

const AddEmployee = () => (
  <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
    <Typography variant="h5" gutterBottom>Ajouter un employé</Typography>
    <EmployeeForm />
  </Paper>
);

export default AddEmployee; 