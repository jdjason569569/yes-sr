import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from "../firebase";
import { useEffect, useState } from 'react';


import Home from '../components/home/home';
import Login from '../components/login/login';
import SignUp from '../components/signUp/signUp';
import { ProtectedRoute } from '../components/shared/protectedRoute';




export function MyRoutes() {

    const [userName, setUserName] = useState();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.email);
            } else {
                setUserName("");
            }
        });
    }, []);

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Login />}></Route>
                <Route element={<ProtectedRoute name={userName} />}>
                    <Route exact path='/home' element={<Home name={userName} />}></Route>
                </Route>
                <Route exact path='/signup' element={<SignUp />}></Route>
            </Routes>
        </Router>
    );
}

