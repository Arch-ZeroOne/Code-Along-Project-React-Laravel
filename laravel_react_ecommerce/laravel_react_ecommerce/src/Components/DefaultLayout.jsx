import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";
function DefaultLayout() {
    const { user, token, setToken, setUser } = useStateContext();

    //* Checks if the user is authenticated
    //* If not authenticated redirect the user to the login page
    //* This conditions need to be returned
    if (token === null) {
        return <Navigate to={"/login"} />;
    }
    const onLogout = (e) => {
        e.preventDefault();
        axiosClient
            .get("/logout")
            .then(() => {
                setUser(null);
                setToken(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>{user.name}</div>
                    <a href="#" onClick={onLogout} className="btn btn-logout">
                        Logout
                    </a>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
