import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCalendarAlt, FaBars,  } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <button className="toggle-button" size={24} onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="list-group mt-5">
          <li className="list-group-item py-3">
            <Link to="/home" className="text-decoration-none d-flex align-items-center">
              <FaHome className="me-2" size={24} />
              <span>Home</span>
            </Link>
          </li>
          <li className="list-group-item py-3">
          <Link to="/pacient" className="text-decoration-none d-flex align-items-center">
            <FaUser className="me-2" size={24} />
            <span>Pacientes</span>
          </Link>
          </li>
          <li className="list-group-item py-3">
          <Link to="/agendamentos" className="text-decoration-none d-flex align-items-center">
            <FaCalendarAlt className="me-2" size={24}  />
            <span>Agendamentos</span>
          </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;