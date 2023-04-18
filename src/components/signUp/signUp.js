import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { InputControl } from '../shared/inputControl/inputControl';
import '../signUp/signUp.css';
import { ToastContainer, toast } from 'react-toastify';


export default function SignUp() {

    const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API);
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
        try {
            const responseRegister = await createUserWithEmailAndPassword(auth, values.email, values.pass);
            const user = responseRegister.user;
            await updateProfile(user, {
                displayName: values.name,
            });

            if(apiUrl){
                const responseFetch = await fetch(`${apiUrl}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Referrer-Policy': 'strict-origin-when-cross-origin'
                    },
                    body: JSON.stringify({
                        id_firebase: user.uid,
                    })
                });
                const response = await responseFetch.json();
                console.log(response);
            }
            
        } catch (error) {
            console.log(error);
        }
        navigate("/");
        await auth.signOut();
    }



    return (
        <div className={name ? 'container-signup' : 'container-signup-only'}>
            <ToastContainer />
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