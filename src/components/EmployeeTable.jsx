import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmployeeTable = ({ employees }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom</TableCell>
          <TableCell>Poste</TableCell>
          <TableCell>Adresse</TableCell>
          <TableCell>Salaire</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees.map((emp, i) => (
          <TableRow key={i}>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.poste}</TableCell>
            <TableCell>{emp.addr}</TableCell>
            <TableCell>{emp.salaire}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default EmployeeTable; 