import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { InputControl } from '../shared/inputControl/inputControl';
import '../signUp/signUp.css';


export default function SignUp() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: ""
    });
    const [error, setError] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const registro = () => {
        if (!values.name || !values.email || !values.pass) {
            setError("Diligencie todos los campos");
            return;
        }
        setError("");
        setSubmitButtonDisabled(true);

        createUserWithEmailAndPassword(auth, values.email, values.pass).then(async (response) => {
            setSubmitButtonDisabled(false);
            const user = response.user;
            await updateProfile(user, {
                displayName: values.name,
            });
            navigate("/login");
        }).catch(error => {
            setSubmitButtonDisabled(false);
            setError(error.message);

        });

    }

    return (
        <div className='container'>
            <div className='innerBox'>
                <h1 className='heading'>Registro</h1>

                <InputControl label="Name" placeholder="Ingrese un nombre"
                    onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))} />

                <InputControl label="Email" placeholder="Ingrese un email"
                    onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))} />

                <InputControl label="Password" placeholder="Ingrese un password"
                    onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))} />

                <div className='footer'>
                    <b className='error'>{error}</b>
                    <button onClick={registro} disabled={submitButtonDisabled}>Guardar</button>
                    <p>
                        Si ya tienes una cuenta
                        <span>
                          <Link to="/">Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}