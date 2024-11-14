import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import CarDetail from './componets/CarDetail.jsx';
import MyCar from './pages/MyCar.jsx';
import Update from './pages/Update.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/mycars" element={<MyCar />} />
        <Route path="/update/:id" element={<Update />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
