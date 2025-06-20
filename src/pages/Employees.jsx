import React, { useEffect, useState, useContext } from 'react';
import { Typography, Button } from '@mui/material';
import RHContext from '../RHContext';
import EmployeeTable from '../components/EmployeeTable';

const Employees = () => {
  const { contract, account, setAlert } = useContext(RHContext);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const list = await contract.methods.getAllEmployees().call({ from: account });
      setEmployees(list);
    } catch (err) {
      setAlert({ open: true, message: 'Erreur : ' + err.message, severity: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, [contract]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Liste des employés</Typography>
      <Button variant="outlined" onClick={fetchEmployees} sx={{ mb: 2 }} disabled={loading}>
        {loading ? 'Chargement...' : 'Rafraîchir'}
      </Button>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default Employees; 