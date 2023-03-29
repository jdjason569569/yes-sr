import { useEffect, useState } from 'react';
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
    const [name, setName] = useState(null);
    const [error, setError] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setName(user.email);
            } else {
                setName(null);
            }
        }, []);
    });

    const register = () => {
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
            navigate("/");
            await auth.signOut();
        }).catch(error => {
            setSubmitButtonDisabled(false);
            setError(error.message);

        });

    }

    return (
        <div className={name ? 'container-signup': 'container-signup-only'}>
            <h1 className=''>Registro</h1>
            <div className='signup-form'>
                <InputControl placeholder="Nombre"
                    onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))} />
            </div>
            <div className='signup-form'>
                <InputControl placeholder="Email"
                    onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))} />
            </div>
            <div className='signup-form'>
                <InputControl placeholder="Password"
                    onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))} />
            </div>
            <div className=''>
                <b className=''>{error}</b>
                <button onClick={register}
                    className="btn btn-light btn-sm rounded btn-style"
                    disabled={submitButtonDisabled}>Guardar</button>
                {!name && <p className='p_style'>
                    Si ya tienes una cuenta
                    <span style={{marginLeft: '5px'}}>
                        <Link to="/">Login</Link>
                    </span>
                </p>}
            </div>
        </div>
    )
}