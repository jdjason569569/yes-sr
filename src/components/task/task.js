import { auth } from '../../firebase';

import './task.css'
import FormTask from './formTask/formTask';
import { useEffect, useState } from 'react';
import Homeworks from './homework/homework';
import { ToastContainer, toast } from 'react-toastify';

export default function Task() {

  const [tasks, setTasks] = useState([]);
  const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API);
  const [taskEdit, setTaskEdit] = useState(null);
  const [idFirebaseUser, setIdFirebaseUser] = useState(null);
  const [taskResponse, setTaskResponse] = useState(null);

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
        console.log(apiUrl);
        const idUser = await getUserById();
        const responseTaskByUser = await fetch(`${apiUrl}/tasks/${idUser}`);
        const responseTaskByUserJson = await responseTaskByUser.json();
        setTasks(responseTaskByUserJson);
      } catch (error) {
        //console.error(error);
      }
    }
    getTaskById();
  }, [idFirebaseUser, taskResponse]);


  /**
   * Allow return an user by firebase code
   */
  const getUserById = async () => {
    const respGetUserById = await fetch(`${apiUrl}/user/${idFirebaseUser}`);
    const { id_users } = await respGetUserById.json();
    return id_users;
  }

  /**
   * Allow save task by user
   */
  const saveTaskByUser = async (task) => {
    const responseAddTask = await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return await responseAddTask.json();
  }


  const addTask = async (task) => {
    if (task) {
      if (taskEdit) {
        taskEdit.name = task.name;
        const UpdateTask = await fetch(`${apiUrl}/tasks/${taskEdit.id_task}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskEdit)
        });
        const responseUpdateTask = UpdateTask.json();
        setTaskResponse(responseUpdateTask);
        toast.warning('Editaste una tarea', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
        setTaskEdit(null);
      } else {
        const idUser = await getUserById();
        task.id_users = idUser;
        const responseTask = await saveTaskByUser(task);
        setTaskResponse(responseTask);
        toast.success('Agregaste una tarea', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }

  const deleteTask = async (id) => {
    const deleteTask = await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseDeleteTask = deleteTask.json();
    setTaskResponse(responseDeleteTask);
    toast.error('Eliminaste una tarea', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
  }

  const completeTask = async (id) => {
    const task = tasks.find(task => task.id_task === id);
    task.completed = !task.completed;

    const UpdateTask = await fetch(`${apiUrl}/tasks/${task.id_task}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const responseUpdateTask = UpdateTask.json();
    setTaskResponse(responseUpdateTask);
    toast.success('Completaste una tarea', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
  }

  const editTask = id => {
    const task = tasks.find(task => task.id_task === id);
    setTaskEdit(task);
  }

  return (
    <div className='container-task'>
      <FormTask addTask={addTask} taskEdit={taskEdit}></FormTask>
      <ToastContainer />
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