import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './formTask.css';
import { dateFormat } from "../../../utils/dateFormat";

export default function FormTask({ addTask, taskEdit }) {

    const [input, setInput] = useState(null);
    const [isEnabledButton, setIsEnabledButton] = useState(true);
    const [isEditTask, setIsEditTask] = useState(false);

    useEffect(() => {
        if (taskEdit) {
            setInput(taskEdit.text);
            setIsEnabledButton(false);
            setIsEditTask(true);
        }
    }, [taskEdit])

    const handleEvent = e => {
        setInput(e.target.value);
        if (input) {
            setIsEnabledButton(false);
        }
    }

    const handleSend = e => {
        e.preventDefault();
        if (input !== '') {
            addTask(createTask());
            setInput('');
            setIsEnabledButton(true);

        }
    }

    const createTask = () => {
        if (isEditTask) {
            return {
                name: input,
                completed: false,
            }
        } else {
            return {
                name: input,
                completed: false,
            }
        }
    }

    return (
        <form className="task-form" onSubmit={handleSend}>
            <input
                className='task-input'
                type='text'
                placeholder='Escribe una tarea'
                name='texto'
                autoComplete="off"
                value={input ?? ''}
                onChange={handleEvent}
            />
            <button hidden={isEnabledButton} className="btn-sm rounded task-botton" >
                {taskEdit ? 'Editar Tarea' : 'Agregar Tarea'}
            </button>
        </form>
    )
}