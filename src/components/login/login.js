import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useState } from 'react';

import { InputControl } from '../shared/inputControl/inputControl';
import '../login/login.css';
import logo from '../../assets/yesSr.png';
import { ToastContainer, toast } from 'react-toastify';


export default function Login() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        pass: ""
    });
    const [error, setError] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const authUser = async () => {
        if (!values.email || !values.pass) {
            toast.error("Datos incompletos",{autoClose:2000} ,{position: toast.POSITION.TOP_CENTER});
            return;
        }
        setSubmitButtonDisabled(true);
        await signInWithEmailAndPassword(auth, values.email, values.pass).then(() => {
            setSubmitButtonDisabled(false);
            navigate("/home");
        }).catch(error => {
            toast.error(error.message,{autoClose:2000} ,{position: toast.POSITION.TOP_CENTER});
        });
    }

    const handleEmail = (event) => {
        setValues({ ...values, email: event.target.value });
    }
    const handlePass = (event) => {
        setValues({ ...values, pass: event.target.value });
    }
    return (
        <>
         <ToastContainer/>
            <div style={{ marginTop: '200px' }} className='container'>
                <div className="login-form">
                    <div className='image-container' >
                        <img className="image" src={logo} />
                    </div>
                    <div className="form-group">
                        <InputControl
                            type="text"
                            placeholder="Tu correo"
                            onChange={handleEmail}>

                        </InputControl>
                    </div>
                    <div className="form-group">
                        <InputControl
                            type="password"
                            placeholder="Contraseña"
                            onChange={handlePass}>

                        </InputControl>
                    </div>
                    <button type="submit" onClick={authUser} className="btn btn-light btn-sm rounded btn-style">Iniciar sesión cambio</button>
                    <div>
                        <Link to="/signup" className='create-font'>Crear cuenta</Link>
                    </div>
                </div>
            </div>
        </>
    );
}