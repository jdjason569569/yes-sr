
import './inputControl.css';

export function InputControl(props) {
    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <input className='input' type={props.type} {...props}></input>
        </div>
    );
}