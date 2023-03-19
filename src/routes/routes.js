import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/home/home';
import Login from '../components/login/login';
import SignUp from '../components/signUp/signUp';

import { useEffect, useState } from 'react';
import { auth } from '../firebase';


export function MyRoutes() {

    const [userName, setUserName] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
            } else {
                setUserName("");
            }
        });
    }, [])


    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home name={userName}/>}></Route>
                <Route exact path='/login' element={<Login />}></Route>
                <Route exact path='/signup' element={<SignUp />}></Route>
            </Routes>
        </Router>
    );
}