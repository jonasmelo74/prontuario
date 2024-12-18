import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import "./Agendamentos.css";

const agendamentosExemplo = [
  { id: 1, nome: "Maria Silva", procedimento: "Consulta", profissional: "Dr. João", data: "10/01/2023", feito: false },
  { id: 2, nome: "Pedro Souza", procedimento: "Exame de Sangue", profissional: "Dr. Ana", data: "11/02/2023", feito: false },
  { id: 3, nome: "Evento: Palestra Saúde", procedimento: "Palestra", profissional: "Dr. João", data: "20/02/2001", feito: false },
  { id: 4, nome: "Ana Clara", procedimento: "Check-up", profissional: "Dr. Carlos", data: "01/02/2023", feito: false },
];

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState(agendamentosExemplo);
  const [busca, setBusca] = useState("");
  const [filtroProfissional, setFiltroProfissional] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentAgendamento, setCurrentAgendamento] = useState(null);

  const agendamentosFiltrados = agendamentos.filter((item) => {
    return (
      (item.nome.toLowerCase().includes(busca.toLowerCase()) ||
        item.procedimento.toLowerCase().includes(busca.toLowerCase())) &&
      (filtroProfissional === "" || item.profissional === filtroProfissional)
    );
  });

  const profissionais = [...new Set(agendamentos.map((item) => item.profissional))];

  const marcarComoFeito = (id) => {
    setAgendamentos(agendamentos.map(item => 
      item.id === id ? { ...item, feito: !item.feito } : item
    ));
  };

  const editarAgendamento = (agendamento) => {
    setCurrentAgendamento(agendamento);
    setShowModal(true);
  };

  const salvarAgendamento = () => {
    setAgendamentos(agendamentos.map(item => 
      item.id === currentAgendamento.id ? currentAgendamento : item
    ));
    setShowModal(false);
  };

  const excluirAgendamento = (id) => {
    setAgendamentos(agendamentos.filter(item => item.id !== id));
  };

  return (
    <div className="container mt-3 p-0">
      <h4>Agendamentos</h4>

      <div className="d-flex gap-3 my-4">
        <input
          type="text"
          placeholder="Buscar por paciente ou procedimento..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="form-control"
        />

        <select
          value={filtroProfissional}
          onChange={(e) => setFiltroProfissional(e.target.value)}
          className="form-select"
        >
          <option value="">Todos os Profissionais</option>
          {profissionais.map((profissional) => (
            <option key={profissional} value={profissional}>
              {profissional}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>Procedimento</th>
            <th>Profissional</th>
            <th>Data</th>
            <th>Feito</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentosFiltrados.length > 0 ? (
            agendamentosFiltrados.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.procedimento}</td>
                <td>{item.profissional}</td>
                <td>{item.data}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={item.feito}
                    onChange={() => marcarComoFeito(item.id)}
                  />
                </td>
                <td className="text-center">
                  <button
                    onClick={() => editarAgendamento(item)}
                    className="btn btn-link me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirAgendamento(item.id)}
                    className="btn btn-link"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhum agendamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {currentAgendamento && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Agendamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={currentAgendamento.nome}
                  onChange={(e) => setCurrentAgendamento({ ...currentAgendamento, nome: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Procedimento</Form.Label>
                <Form.Control
                  type="text"
                  value={currentAgendamento.procedimento}
                  onChange={(e) => setCurrentAgendamento({ ...currentAgendamento, procedimento: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Profissional</Form.Label>
                <Form.Control
                  type="text"
                  value={currentAgendamento.profissional}
                  onChange={(e) => setCurrentAgendamento({ ...currentAgendamento, profissional: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  value={currentAgendamento.data}
                  onChange={(e) => setCurrentAgendamento({ ...currentAgendamento, data: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={salvarAgendamento}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Agendamentos;
