import './task.css'
import FormTask from './formTask/formTask';
import { useState } from 'react';

export default function Task(){

    const [tasks, setTasks] = useState([]);

    const addTask = task =>{
       if(task){
        task.text = task.text.trim(); 
        setTasks([task, ...tasks]);
       }
    }

    const deleteTask = id  =>{
      setTasks(tasks.filter(task => task.id !== id));
    }

    const completeTaks = id => {
      const updatedTask = tasks.map(task => {
        if(tasks.id === id){
          tasks.completed = !tasks.completed;
        }
       return task;
      });
      setTasks(updatedTask);
    }


    return(<div className='container-task'>
   <FormTask addTask={addTask}></FormTask>
    </div>)
}