import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/home';
import Pacient from './components/Pacient/Pacient';
import Agendamentos from './components/Agendamentos/Agendamentos';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/pacient" element={<Pacient />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;