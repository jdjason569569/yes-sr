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

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setName(user.email);
            } else {
                setName(null);
            }
        }, []);
    });

    const register = async () => {

        if (!values.name || !values.email || !values.pass) {
            setError("Diligencie todos los campos");
            return;
        }
        setError("");

        const responseRegister = await createUserWithEmailAndPassword(auth, values.email, values.pass);
        const user = responseRegister.user;
        await updateProfile(user, {
            displayName: values.name,
        });
        try {
            const responseFetch = await fetch('http://localhost:3001/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_firebase: user.uid,
                })
            });
            const response = responseFetch.json();
            console.log('respuesta',response);
        } catch (error) {
            console.log('error in createUserWithEmailAndPassword');
        }
        navigate("/");
        await auth.signOut();
    }



    return (
        <div className={name ? 'container-signup' : 'container-signup-only'}>
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
                    className="btn btn-light btn-sm rounded btn-style">Guardar</button>
                {!name && <p className='p_style'>
                    Si ya tienes una cuenta
                    <span style={{ marginLeft: '5px' }}>
                        <Link to="/">Login</Link>
                    </span>
                </p>}
            </div>
        </div>
    )
}