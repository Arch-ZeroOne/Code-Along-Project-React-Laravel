import { createBrowserRouter } from "react-router-dom";
import Login from "../src/views/Login";
import Register from "../src/views/Register";
import DefaultLayout from "./Components/DefaultLayout";
import GuestLayout from "./Components/GuestLayout";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key="UserCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="UserUpdate" />,
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
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
