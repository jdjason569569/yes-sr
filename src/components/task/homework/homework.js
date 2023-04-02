import './homework.css'

export default function Homeworks({ id, text, completed, deleteTask, completeTask, taskDate, editTask }) {
    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet" />


            <div className={completed ? "task-container completed" : 'task-container'}>
                <div className="task-text" onClick={() => completeTask(id)}>
                    {text}
                    <div className='text-date '>{taskDate}</div>
                </div>
                <div className='icons' onClick={() => editTask(id)}>
                <i className="material-icons">edit</i>
                </div>
                <div className='icons' onClick={() => deleteTask(id)}>
                <i className="material-icons">delete</i>
                </div>
            </div>
        </div>
    )
}