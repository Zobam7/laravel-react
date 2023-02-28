import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./component/DefaultLayout";
import GuestLayout from "./component/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Notfound from "./views/Notfound";
import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to={'/users'} />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key={'usercreate'}/>,
            },
            {
                path: "/users/:id",
                element: <UserForm key={'userupdate'}/>,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },

            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "*",
        element: <Notfound />,
    },
]);

export default router;
