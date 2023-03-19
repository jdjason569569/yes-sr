import { Link, Navigate, useNavigate } from "react-router-dom"
import { auth } from "../../firebase"



export default function Home({name}) {
    const navigate = useNavigate();

    const exit = ()=>{
        return auth.signOut();
        navigate("/")
    }

    
    return (
        <>
            <div>
                <h1><Link to="/login">Login</Link></h1>
                <br />
                <h1><Link to="/signup">SingUp</Link></h1>
            </div>
            <h2>{name? `Bienvenido - ${name}`:"Inicia session"}</h2>
            {name && <button onClick={exit}>Salir</button>}
        </>
    )
}