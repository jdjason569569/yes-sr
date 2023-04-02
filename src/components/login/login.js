import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useState } from 'react';

import { InputControl } from '../shared/inputControl/inputControl';
import '../login/login.css';
import logo from '../../assets/yesSr.png';


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
            setError("Datos incompletos");
            return;
        }
        setSubmitButtonDisabled(true);
        await signInWithEmailAndPassword(auth, values.email, values.pass).then(() => {
            setSubmitButtonDisabled(false);
            navigate("/home");
        }).catch(error => {
            setSubmitButtonDisabled(false);
            setError(error.message);
        });
        await setPersistence(auth, browserSessionPersistence);
    }

    const handleEmail = (event) => {
        setValues({ ...values, email: event.target.value });
    }
    const handlePass = (event) => {
        setValues({ ...values, pass: event.target.value });
    }
    return (
        <>
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
                    <button type="submit" onClick={authUser} className="btn btn-light btn-sm rounded btn-style">Iniciar sesión</button>
                    <div>
                        <Link to="/signup" className='create-font'>Crear cuenta</Link>
                    </div>
                </div>
            </div>
        </>
    );
}