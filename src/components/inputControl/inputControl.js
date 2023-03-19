
import '../inputControl/inputControl.css';

export function InputControl(props) {
    return (
        <div className='container'>
            {props.label && <label>{props.label}</label>}
            <input type="text" {...props}></input>
        </div>
    )
}