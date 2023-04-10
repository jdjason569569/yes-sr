import { auth } from '../../firebase';

import './task.css'
import FormTask from './formTask/formTask';
import { useEffect, useState } from 'react';
import Homeworks from './homework/homework';

export default function Task() {

  const [tasks, setTasks] = useState([]);
  const apiUrl = process.env.REACT_APP_API;
  const [taskEdit, setTaskEdit] = useState(null);
  const [idFirebaseUser, setIdFirebaseUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
          setIdFirebaseUser(user.uid);
        } else {
          setIdFirebaseUser(null);
        }
    }, []);
});


  const addTask =async (task) => {
    if (task) {
      const taskEdit = tasks.find(taskElement => taskElement.id === task.id)
      if (taskEdit) {
        taskEdit.text = task.text;
        const updateTask = tasks.map(taskElement => (taskElement.id === task.id ? taskEdit : taskElement));
        setTasks([...updateTask]);
        setTaskEdit(null);
      } else {
        const responseFetch = await fetch(`${apiUrl}/user/${idFirebaseUser}`);
        const response = await responseFetch.json();
        task.text = task.text.trim();
        setTasks([task, ...tasks]);
      }
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

  const editTask = id => {
    const task = tasks.find(task => task.id === id);
    setTaskEdit(task);
  }

  return (
    <div className='container-task'>
      <FormTask addTask={addTask} taskEdit={taskEdit}></FormTask>

      <div className='task-list-content'>
        {
          tasks.map((task) =>
            <Homeworks
              key={task.id}
              id={task.id}
              text={task.text}
              taskDate={task.taskDate}
              completed={task.completed}
              deleteTask={deleteTask}
              completeTask={completeTask}
              editTask={editTask} />)
        }
      </div>
    </div>)
}