import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import RHContext from '../RHContext';

const EmployeeForm = () => {
  const { contract, account, setAlert } = useContext(RHContext);
  const [form, setForm] = useState({ addr: '', name: '', poste: '', salaire: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!contract) return;
    setLoading(true);
    try {
      await contract.methods.addEmployee(form.addr, form.name, form.poste, form.salaire).send({ from: account });
      setAlert({ open: true, message: 'Employé ajouté !', severity: 'success' });
      setForm({ addr: '', name: '', poste: '', salaire: '' });
    } catch (err) {
      setAlert({ open: true, message: 'Erreur : ' + err.message, severity: 'error' });
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField label="Adresse Ethereum" name="addr" value={form.addr} onChange={handleChange} required fullWidth />
      <TextField label="Nom" name="name" value={form.name} onChange={handleChange} required fullWidth />
      <TextField label="Poste" name="poste" value={form.poste} onChange={handleChange} required fullWidth />
      <TextField label="Salaire" name="salaire" value={form.salaire} onChange={handleChange} required type="number" />
      <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Ajout...' : 'Ajouter'}</Button>
    </Box>
  );
};

export default EmployeeForm; 