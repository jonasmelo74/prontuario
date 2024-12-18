import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaskTable.css";

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "teste",
      responsible: "João",
      priority: "Médio",
      status: "Completa",
      date: "12/12/24",
      completed: true,
    },
    {
      id: 2,
      name: "não feita",
      responsible: "Joana",
      priority: "Médio",
      status: "Atrasada",
      date: "11/12/24",
      completed: false,
    },
    {
      id: 3,
      name: "teste",
      responsible: "Bruno",
      priority: "Médio",
      status: "Atrasada",
      date: "11/12/24",
      completed: false,
    },
    {
      id: 4,
      name: "Enviar o formulário pós consulta para o paciente Karoline Maestri Brito da Costa",
      responsible: "-",
      priority: "Alto",
      status: "Atrasada",
      date: "14/12/24",
      completed: false,
    },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [isTableVisible, setIsTableVisible] = useState(true);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <div className="table-container">
      <h5 onClick={toggleTableVisibility} className="toggle-header mt-5">
        Avisos e Lembretes
        <span className={`arrow ${isTableVisible ? "rotate" : ""}`}>&#9660;</span>
      </h5>
      <div className={`table-wrapper ${isTableVisible ? "visible" : "hidden"}`}>
        <table className="table table-striped">
          <thead style={{ backgroundColor: "#29889B" }}>
            <tr>
              <th onClick={() => requestSort("name")}>Nome</th>
              <th onClick={() => requestSort("responsible")}>Responsável</th>
              <th onClick={() => requestSort("priority")}>Prioridade</th>
              <th onClick={() => requestSort("status")}>Status</th>
              <th onClick={() => requestSort("date")}>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id} className={task.priority === "Alto" ? "high-priority" : ""}>
                <td>
                  <input type="checkbox" defaultChecked={task.completed} />
                  <span className="ms-2">{task.name}</span>
                </td>
                <td>{task.responsible}</td>
                <td className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.date}</td>
                <td>
                  <button className="btn btn-link" onClick={() => deleteTask(task.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;