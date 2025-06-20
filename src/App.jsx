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
import { RHContext } from './App';

// Adresse et ABI du contrat RH (copiés depuis RHContract.json, network 5777)
const CONTRACT_ADDRESS = '0x5521e386a612621420f58D045CA956504bd434FA';
const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_addr", "type": "address" },
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_poste", "type": "string" },
      { "internalType": "uint256", "name": "_salaire", "type": "uint256" }
    ],
    "name": "addEmployee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyInfo",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllEmployees",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "addr", "type": "address" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "poste", "type": "string" },
          { "internalType": "uint256", "name": "salaire", "type": "uint256" }
        ],
        "internalType": "struct RHContract.Employee[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contexte pour partager web3, le compte, le contrat, le rôle
export const RHContext = createContext();

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