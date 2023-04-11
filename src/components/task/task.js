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
    });
  }, []);

  useEffect(() => {

    const getTaskById = async () => {
      try {
        const responseFetch = await fetch(`${apiUrl}/user/${idFirebaseUser}`);
        const response = await responseFetch.json();
        const responseTask = await fetch(`${apiUrl}/tasks/${response.id_users}`);
        const responseJson = await responseTask.json();
        setTasks(responseJson);
      } catch (error) {
        console.error(error);
      }
    }
    getTaskById();
  }, [idFirebaseUser])


  const addTask = async (task) => {
    if (task) {
      //const taskEdit = tasks.find(taskElement => taskElement.id === task.id)
      if (taskEdit) {
        taskEdit.text = task.text;
        const updateTask = tasks.map(taskElement => (taskElement.id === task.id ? taskEdit : taskElement));
        setTasks([...updateTask]);
        setTaskEdit(null);
      } else {
        const responseFetch = await fetch(`${apiUrl}/user/${idFirebaseUser}`);
        const response = await responseFetch.json();
        task.id_users = response.id_users;

        const responseFetchTask = await fetch(`${apiUrl}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });
        const responseTask = await responseFetchTask.json();
        console.log(responseTask);


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
              key={task.id_task}
              id={task.id_task}
              text={task.name}
              taskDate={task.date_register}
              completed={task.completed}
              deleteTask={deleteTask}
              completeTask={completeTask}
              editTask={editTask} />)
        }
      </div>
    </div>)
}