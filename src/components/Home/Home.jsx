import React from 'react';
import Calendar from '../features/Calendar/Calendar';
import TaskTable from '../features/Task-Table/TaskTable';


const Home = () => {
  return (
    <div>
      <Calendar />
      <TaskTable />
    </div>
  );
};

export default Home;