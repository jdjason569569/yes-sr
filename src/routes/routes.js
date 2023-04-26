import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from "../firebase";
import { useEffect, useState } from 'react';

import Home from '../components/home/home';
import Login from '../components/login/login';
import SignUp from '../components/signUp/signUp';
import { ProtectedRoute } from '../components/shared/protectedRoute';
import Task from '../components/task/task';
import NavigationComponent from '../components/navigation/navigation-component';
import Image from '../components/image/image';


export function MyRoutes() {

    const [userName, setUserName] = useState(null);
    const TIMEOUT = 3600000; 

    useEffect(() => {

        let timer = setTimeout(() => {
            auth.signOut();
          }, TIMEOUT);

    
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
            } else {
                setUserName(null);
            }
        }, []);

        return () => {
            clearTimeout(timer);
        }
    });

    return (
         <Router>
              {userName  &&  <NavigationComponent/>}
             <Routes>
                 <Route exact path='/' element={<Login />}></Route>
                 <Route element={<ProtectedRoute name={userName} />}>
                     <Route exact path='/home' element={<Home name={userName} />}></Route>
                     <Route exact path='/home/task' element={<Task/>}></Route>
                     <Route exact path='/home/image' element={<Image/>}></Route>
                 </Route>
                 <Route exact path='/signup'  element={<SignUp />}></Route>
             </Routes>
         </Router>
    );
}

