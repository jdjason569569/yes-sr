import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase"



export default function Home({ name }) {
    const navigate = useNavigate();

    const exit = () => {
        navigate("/");
        return auth.signOut();
    }


    return (
        <>
            <h2>{name ? `Bienvenido - ${name}` : "Inicia session"}</h2>
            {name && <button onClick={exit}>Salir</button>}
        </>
    )
}