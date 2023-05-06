import '../navigation/navigation-component.css';

import logo from '../../assets/yesSr.png';
import { Link, useLocation } from "react-router-dom"
import { useEffect } from 'react';


export default function NavigationComponent() {

    useEffect(() => {
        const checkbox = document.querySelector('#toggle');
        const isActive = document.querySelector('#toggle').checked;
        if(!isActive){
            checkbox.click();     
        }
    })
    
 
    const { pathname } = useLocation();
    return (
        <>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet" />

                <div className="menu">
                    <input  hidden type="checkbox" id="toggle" />
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
                            <Link to={'home/task'}>
                                <i className="material-icons md-36">add_task</i>
                            </Link>
                        </div>
                        <div className="_btn">
                            <Link to={pathname !== 'home' ? `/signup` : 'home/signup'}>
                                <i className="material-icons md-36">create</i>
                            </Link>
                        </div>
                        <div className="_btn">
                            <Link to={`home/image`}>
                                <i className="material-icons md-36">image</i>
                            </Link>
                        </div>
                    </label>
                </div>
            </>
    );
}