import React from "react";
import { Outlet } from "react-router-dom";

// <Outlet /> = A placeholder component used in react router to render the matching child route or components defined in the parent route configuration, allows rendering of child components and routes
//

function Users() {
    return (
        <div>
            Users
            <Outlet />
        </div>
    );
}

export default Users;
