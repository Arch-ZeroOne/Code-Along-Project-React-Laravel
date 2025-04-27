//This layout is for unauthenticated users

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

// <Outlet /> = A placeholder component used in react router to render the matching child route or components defined in the parent route configuration, allows rendering of child components and routes
//
function GuestLayout() {
    const { token } = useStateContext();

    //* If there is a token redirect the user to the homepage
    //* This conditions need to be returned
    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default GuestLayout;
