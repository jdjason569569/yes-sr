import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './formTask.css';

export default function ({ addTask }) {

    const [input, setInput] = useState('');

    const handleEvent = e => {
        setInput(e.target.value);
    }

    const handleSend = e => {
        e.preventDefault();
        addTask(createTask());
    }

    const createTask = () => {
        return {
            id: uuidv4(),
            text: input,
            completed: false
        }
    }

    return (
        <form  className="task-form" onSubmit={handleSend}>
        <input  
          className='task-input'
          type='text'
          placeholder='Escribe una tarea'
          name='texto'
          onChange={handleEvent}
        />
        <button className="btn-sm rounded task-botton" >
         Agregar Tarea
        </button>
     </form>
    )
}