import './task.css'
import FormTask from './formTask/formTask';
import { useState } from 'react';
import Homeworks from './homework/homework';

export default function Task() {

  const [tasks, setTasks] = useState([]);

  const addTask = task => {
    if (task) {
      task.text = task.text.trim();
      setTasks([task, ...tasks]);
    }
  }

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const completeTask = id => {
    const updatedTask = tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTask);
  }


  return (
    <div className='container-task'>
      <FormTask addTask={addTask}></FormTask>

      <div className='task-list-content'>
        {
          tasks.map((task) =>
            <Homeworks
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              deleteTask={deleteTask}
              completeTask={completeTask} />)
        }
      </div>
    </div>)
}