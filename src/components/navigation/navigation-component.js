import '../navigation/navigation-component.css';

import logo from '../../assets/yesSr.png';
import { Link, useLocation } from "react-router-dom"

export default function NavigationComponent(){
    let  {pathname}= useLocation();

    return (
        <>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet" />

            <div className="menu">
                <input hidden type="checkbox" id="toggle" />
                <label id="show-menu" htmlFor="toggle">
                    <div className="_btn">
                        <img className="image menu_btn" src={logo} />
                    </div>
                    <div className="_btn">
                        <Link to={`${pathname}/task`}>
                            <i className="material-icons md-36">add_task</i>
                        </Link>
                    </div>
                    <div className="_btn">
                        <i className="material-icons md-36">photo</i>
                    </div>
                    <div className="_btn">
                        <i className="material-icons md-36">music_note</i>
                    </div>
                    <div className="_btn">
                        <i className="material-icons md-36">chat_bubble</i>
                    </div>
                    <div className="_btn">
                        <i className="material-icons md-36">settings</i>
                    </div>
                    <div className="_btn">
                        <i className="material-icons md-36">phone</i>
                    </div>
                    <div className="_btn">
                        <i className="material-icons md-36">settings</i>
                    </div>
                    <div className="_btn">
                        <i className="material-icons md-36">phone</i>
                    </div>
                </label>
            </div>
        </>
    )
}