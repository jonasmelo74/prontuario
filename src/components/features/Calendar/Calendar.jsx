import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "./Calendar.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    procedure: "",
    time: "",
    patient: "",
    professional: ""
  });
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState({ day: null, index: null });

  const daysInMonth = new Date(2023, currentMonth + 1, 0).getDate();

  const handleAddEvent = () => {
    if (!newEvent.name.trim() || !newEvent.procedure.trim() || !newEvent.time.trim() || !newEvent.patient.trim() || !newEvent.professional.trim()) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    setEvents((prevEvents) => ({
      ...prevEvents,
      [selectedDay]: [...(prevEvents[selectedDay] || []), newEvent],
    }));

    setNewEvent({ name: "", procedure: "", time: "", patient: "", professional: "" });
    setSelectedDay(null);
  };

  const handleDeleteEvent = () => {
    const { day, index } = eventToDelete;
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[day].splice(index, 1);
      if (updatedEvents[day].length === 0) {
        delete updatedEvents[day];
      }
      return updatedEvents;
    });
    setShowModal(false);
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth((prevMonth) => prevMonth + direction);
  };

  const filteredEvents = filter
    ? Object.keys(events).reduce((acc, day) => {
        const filteredDayEvents = events[day].filter(event => event.patient.includes(filter));
        if (filteredDayEvents.length) {
          acc[day] = filteredDayEvents;
        }
        return acc;
      }, {})
    : events;

  return (
    <div className="calendar-container">
      <span>*Cadastre seus agendamentos aqui:</span>
      <div className="month-navigation mt-2">
        <button onClick={() => handleMonthChange(-1)}>Anterior</button>
        <span>{new Date(2023, currentMonth).toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</span>
        <button onClick={() => handleMonthChange(1)}>Próximo</button>
      </div>
      <div className="filter-tabs">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className="nav-link active" onClick={() => setFilter("")}>Todos</button>
          </li>
          {Object.values(events).flat().map(event => event.patient).filter((value, index, self) => self.indexOf(value) === index).map(patient => (
            <li className="nav-item" key={patient}>
              <button className="nav-link" onClick={() => setFilter(patient)}>{patient}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              className="calendar-day"
              onClick={() => setSelectedDay(day)}
            >
              <span>{day}</span>
              {filteredEvents[day] && (
                <ul>
                  {filteredEvents[day].map((event, index) => (
                    <li clas key={index}>
                      {event.name} - {event.procedure} - {event.time} - {event.patient} - {event.professional}
                      <button
                        className="btn btn-link"
                        onClick={() => {
                          setEventToDelete({ day, index });
                          setShowModal(true);
                        }}
                      >
                        Excluir
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="event-popup">
          <h3>Adicionar Evento - Dia {selectedDay}</h3>
          <label htmlFor="eventName">Nome do Evento</label>
          <input
            id="eventName"
            type="text"
            placeholder="Nome do Evento"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <label htmlFor="procedure">Procedimento</label>
          <input
            id="procedure"
            type="text"
            placeholder="Procedimento"
            value={newEvent.procedure}
            onChange={(e) => setNewEvent({ ...newEvent, procedure: e.target.value })}
          />
          <label htmlFor="time">Hora</label>
          <input
            id="time"
            type="time"
            placeholder="Hora"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <label htmlFor="patient">Nome do Paciente</label>
          <input
            id="patient"
            type="text"
            placeholder="Nome do Paciente"
            value={newEvent.patient}
            onChange={(e) => setNewEvent({ ...newEvent, patient: e.target.value })}
          />
          <label htmlFor="professional">Nome do Profissional da Saúde</label>
          <input
            id="professional"
            type="text"
            placeholder="Nome do Profissional da Saúde"
            value={newEvent.professional}
            onChange={(e) => setNewEvent({ ...newEvent, professional: e.target.value })}
          />
          <button onClick={handleAddEvent}>Adicionar</button>
          <button onClick={() => setSelectedDay(null)}>Cancelar</button>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir este evento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteEvent}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;