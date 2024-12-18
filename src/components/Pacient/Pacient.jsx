import React, { useState } from 'react';
import './Pacient.css';

const Pacient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const rows = [
    { name: 'Karoline Maestri Brito da Costa', icon: '👤', error: false },
    { name: 'Alana Freitas', error: false,  icon: '👤' },
    { name: 'Ana Testee', icon: '👤', error: false },
    { name: 'Breno Auto', icon: '👤', error: false },
    { name: 'Duda Teste', icon: '👤', error: false },
    { name: 'Exames', error: false,  icon: '👤' },
    { name: 'Exames com Erros', icon: '👤', error: false },
    { name: 'Exames01', icon: '👤', error: false },
    { name: 'Ferdinando Hendrick da Silva Scheck...', icon: '👤', error: false },
  ];

  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="list-container">
      <header className="search-container py-2 d-flex justify-content-between">
        <h4>Pacientes</h4>
        <input
          id="search-input"
          type="text"
          placeholder="Busque por nome do paciente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>
      {filteredRows.map((row, index) => (
        <div key={index} className="list-item">
          <div className="icon">{row.icon}</div>
          <div className={`name ${row.error ? 'error' : ''}`}>{row.name}</div>
          <div className="tabs">
            <button className="btn btn-custom">Atendimentos</button>
            <button className="btn btn-custom">Relatórios</button>
            <button className="btn btn-custom">Informações</button>
          </div>
          <button className="start-button">▶ Iniciar Atendimento</button>
        </div>
      ))}
    </section>
  );
};

export default Pacient;