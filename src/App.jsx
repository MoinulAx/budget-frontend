import React, { useEffect } from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionForm from './Componets/transactionForm/TransactionForm';
import TransactionLog from './Componets/transactionsLog/TransactionLog';
import HomePage from './Componets/Home/HomePage';
import Navbar from './Componets/Navbar/Navbar';
import './App.css'


const App = () => {
  const [data , setData] = useState()
  const API = import.meta.env.VITE_BASE_URL
   useEffect(() => {
      fetch(API)
      .then(response => response.json())
      .then(response => setData(response))
      .catch(error => console.error(error));
   }, [API])
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logs" element={<TransactionLog data = {data}/>} />
        <Route path="/forms" element={<TransactionForm data = {data}
        setData ={setData}/>} />
      </Routes>
    </Router>
  );
};

export default App;
