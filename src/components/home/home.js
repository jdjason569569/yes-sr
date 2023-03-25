import '../home/home.css';
import {  Routes, Route } from 'react-router-dom';

import { auth } from "../../firebase";
import NavigationComponent from "../navigation/navigation-component";
import { useNavigate } from 'react-router-dom';
import Task from '../task/task';


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