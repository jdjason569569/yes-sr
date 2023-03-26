import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from "../firebase";
import { useEffect, useState } from 'react';


import Home from '../components/home/home';
import Login from '../components/login/login';
import SignUp from '../components/signUp/signUp';
import { ProtectedRoute } from '../components/shared/protectedRoute';
import Task from '../components/task/task';
import NavigationComponent from '../components/navigation/navigation-component';


export function MyRoutes() {

    const [userName, setUserName] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.email);
            } else {
                setUserName(null);
            }
            console.log(userName);
        }, []);
    });

    

    return (
        <Router>
             {userName && <NavigationComponent/>}
            <Routes>
                <Route exact path='/' element={<Login />}></Route>
                <Route element={<ProtectedRoute name={userName} />}>
                    <Route exact path='/home' element={<Home name={userName} />}></Route>
                    <Route  path='/home/task' element={<Task/>}></Route>
                </Route>
                <Route exact path='/signup'  element={<SignUp />}></Route>
            </Routes>
        </Router>
    );
}

