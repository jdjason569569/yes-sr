import '../home/home.css';


import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

/**
 * Component that gives input to the application
 */

export default function Home({ name }) {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        toast.success('Home', { autoClose: 500 }, { position: toast.POSITION.TOP_CENTER });
    }, []);


    const exit = () => {
        navigate("/");
        return auth.signOut();
    }

    return (
        <>
            <ToastContainer />
            <div className="container-home">
                <div>
                    <h2>{name ? `Bienvenido  ${name}` : "Inicia session"}</h2>
                </div>
                <div>
                    {name && <button className="btn btn-light btn-sm rounded btn-style" onClick={exit}>Salir</button>}
                </div>
            </div>
        </>
    )
}