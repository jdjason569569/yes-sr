import '../navigation/navigation-component.css';

import logo from '../../assets/yesSr.png';
import { Link, useLocation } from "react-router-dom"

export default function NavigationComponent() {
    let { pathname } = useLocation();
    var checkMenu = document.getElementById('toggle');
    

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
                        <Link to={'/home'}>
                            <i className="material-icons md-36">home</i>
                        </Link>
                    </div>
                    <div className="_btn">
                        <Link to={`${pathname}/task`}>
                            <i className="material-icons md-36">add_task</i>
                        </Link>
                    </div>
                    <div className="_btn">
                        <Link to={'/signup'}>
                            <i className="material-icons md-36">create</i>
                        </Link>
                    </div>
                    <div className="_btn">
                        <Link to={`${pathname}/task`}>
                            <i className="material-icons md-36">close</i>
                        </Link>
                    </div>
                    <div className="_btn">
                        <Link to={`${pathname}/task`}>
                            <i className="material-icons md-36">close</i>
                        </Link>
                    </div>
                    <div className="_btn">
                        <Link to={`${pathname}/task`}>
                            <i className="material-icons md-36">close</i>
                        </Link>
                    </div>
                    <div className="_btn">
                        <Link to={`${pathname}/task`}>
                            <i className="material-icons md-36">close</i>
                        </Link>
                    </div>
                    <div className="_btn">
                        <Link to={`${pathname}/task`}>
                            <i className="material-icons md-36">close</i>
                        </Link>
                    </div>
                </label>
            </div>
        </>
    )
}