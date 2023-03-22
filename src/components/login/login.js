import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import { InputControl } from '../shared/inputControl/inputControl';
import '../login/login.css';




export default function Login() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        pass: ""
    });
    const [error, setError] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const authUser = () => {
        if (!values.email || !values.pass) {
            setError("Datos incompletos");
            return;
        }
        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass).then((response) => {
            setSubmitButtonDisabled(false);
            navigate("/home");
        }).catch(error => {
            setSubmitButtonDisabled(false);
            setError(error.message);
        });
    }

    const handleEmail = (event) => {
        setValues({ ...values, email: event.target.value });
    }
    const handlePass = (event) => {
        setValues({ ...values, pass: event.target.value });
    }
    return (
        <div className='container'>
            <div className='innerBox'>
                <h1 className='heading'>Login</h1>
                <InputControl label="Email"
                    placeholder="Ingrese su correo"
                    onChange={handleEmail}></InputControl>

                <InputControl label="Password"
                    placeholder="Ingrese su contraseña"
                    onChange={handlePass}></InputControl>

                <div className='footer'></div>
                <b className='error'>{error}</b>
                <button className="btn btn-primary" onClick={authUser} disabled={submitButtonDisabled}>login btn</button>
                <p>
                    Crear cuenta
                    <span>
                        <Link to="/signup">Ir</Link>
                    </span>
                </p>

            </div>
        </div>
    );
}