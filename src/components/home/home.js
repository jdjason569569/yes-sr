import '../home/home.css';


import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';


export default function Home({ name }) {
    const navigate = useNavigate();


    const exit = () => {
        navigate("/");
        return auth.signOut();
    }

    return (
        <>
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