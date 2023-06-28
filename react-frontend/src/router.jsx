import { Children } from "react";
import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm.jsx";
import Dashboard from "./views/Dashboard.jsx";
import { Navigate } from "react-router-dom";


const router = createBrowserRouter([

    {
        path : '/',
        element:<DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/users"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            }
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children:[

            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },

    {
        path: '*',
        element: <NotFound />
    }

])

export default router;