import { Children } from "react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({children, name}) =>{

    // if(!name){
    //     return <Navigate to='/'/>
    // }
    return children ? children : <Outlet/>;
    
}