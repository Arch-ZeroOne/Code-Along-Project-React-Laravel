import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";

// <Outlet /> = A placeholder component used in react router to render the matching child route or components defined in the parent route configuration, allows rendering of child components and routes
//

function Users() {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);
    const { setToken, setUser } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data.user);
                setToken(data.token);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    return (
        <div>
            Users
            <Outlet />
        </div>
    );
}

export default Users;
