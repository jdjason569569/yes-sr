import { useNavigate } from "react-router-dom"
import '../home/home.css';
import logo from '../../assets/yesSr.png';
import { auth } from "../../firebase";



export default function Home({ name }) {
    const navigate = useNavigate();


    const exit = () => {
        navigate("/");
        return auth.signOut();
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet" />

            <div class="menu">
                <input hidden type="checkbox" id="toggle" />
                <label id="show-menu" for="toggle">
                    <div class="_btn">
                        <img className="image menu_btn" src={logo} />
                    </div>
                    <div className="_btn">
                        <i class="material-icons md-36">photo_camera</i>
                    </div>
                    <div className="_btn">
                        <i class="material-icons md-36">photo</i>
                    </div>
                    <div className="_btn">
                        <i class="material-icons md-36">music_note</i>
                    </div>
                    <div className="_btn">
                        <i class="material-icons md-36">chat_bubble</i>
                    </div>
                    <div className="_btn">
                        <i class="material-icons md-36">settings</i>
                    </div>
                    <div className="_btn">
                        <i class="material-icons md-36">phone</i>
                    </div>
                    <div className="_btn">
                        <i class="material-icons md-36">settings</i>
                    </div>
                    <div className="_btn">
                        <i class="material-icons md-36">phone</i>
                    </div>
                </label>
            </div>
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