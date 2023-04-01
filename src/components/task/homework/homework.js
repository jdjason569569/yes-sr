import { AiOutlineCloseCircle } from 'react-icons/ai';
import './homework.css'

export default function Homeworks({ id, text, completed, deleteTask, completeTask, taskDate }) {
    return (
        <div>
            <div className={completed ? "task-container completed" : 'task-container'}>
                <div className="task-text" onClick={() => completeTask(id)}>
                    {text}
                    <div className='text-date '>{taskDate}</div>
                </div>
                <div onClick={() => deleteTask(id)}>
                    <AiOutlineCloseCircle className="task-icon" />
                </div>
            </div>
        </div>
    )
}