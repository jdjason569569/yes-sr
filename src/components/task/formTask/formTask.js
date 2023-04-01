import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './formTask.css';

export default function ({ addTask }) {

    const [input, setInput] = useState(null);
    const [isEnabledButton, setIsEnabledButton] = useState(true);


    const handleEvent = e => {
        setInput(e.target.value);
        if(input){
            setIsEnabledButton(false);
        }
    }

    const handleSend = e => {
        e.preventDefault();
        if(input !== ''){
            addTask(createTask());
            setInput('');
            setIsEnabledButton(true);
        }
        
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
          autocomplete="off"
          value={input}
          onChange={handleEvent}
        />
        <button  hidden={isEnabledButton} className="btn-sm rounded task-botton" >
         Agregar Tarea
        </button>
     </form>
    )
}