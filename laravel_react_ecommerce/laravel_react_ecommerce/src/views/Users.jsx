import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import Swal from "sweetalert2";

// <Outlet /> = A placeholder component used in react router to render the matching child route or components defined in the parent route configuration, allows rendering of child components and routes
//

function Users() {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDeleteClick = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient
                    .delete(`users/${user.id}`)
                    .then(() => {
                        getUsers();
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success",
                        });
                    })

                    .catch(() => {
                        Swal.fire({
                            title: "Unsuccessfull!",
                            text: "User deletion failed",
                            icon: "error",
                        });
                    });
            } else {
                return;
            }
        });
    };

    return (
        <div>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>Users</h1>
                    <Link className="btn-add" to="/users/new">
                        Add new
                    </Link>
                </div>
                <div className="card animated fadeInDown">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading && (
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!loading && (
                            <tbody>
                                {users &&
                                    users.map((u) => (
                                        <tr key={u.id}>
                                            <td>{u.id}</td>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <Link
                                                    className="btn-edit"
                                                    to={`/users/${u.id}`}
                                                >
                                                    Edit
                                                </Link>
                                                &nbsp;
                                                <button
                                                    className="btn-delete"
                                                    onClick={(ev) =>
                                                        onDeleteClick(u)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;
