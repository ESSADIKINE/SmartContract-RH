import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CssBaseline, Container, CircularProgress, Snackbar, Alert, Paper, Typography, Box, Button } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Employees from './pages/Employees';
import AddEmployee from './pages/AddEmployee';
import MyInfo from './pages/MyInfo';
import Web3 from 'web3';
import './App.css';
import RHContext from './RHContext';
import RHContract from '../build/contracts/RHContract.json';

const CONTRACT_ADDRESS = '0xCd60650e205cb49C2746Ba6ff68994a9019B6e7C';
const CONTRACT_ABI = RHContract.abi;

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const rh = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
          setContract(rh);
          const owner = await rh.methods.owner().call();
          setIsOwner(accounts[0].toLowerCase() === owner.toLowerCase());
        } catch (err) {
          setAlert({ open: true, message: 'Erreur MetaMask : ' + err.message, severity: 'error' });
        }
      } else {
        setAlert({ open: true, message: 'Veuillez installer MetaMask.', severity: 'error' });
      }
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
        <div>Connexion à MetaMask...</div>
      </Container>
    );
  }

  return (
    <RHContext.Provider value={{ web3, account, contract, isOwner, setAlert }}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/me" element={<MyInfo />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
          <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Router>
    </RHContext.Provider>
  );
}

export default App; 