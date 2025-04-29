import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
function UserForm() {
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`users/${id}`).then((response) => {
            const { data } = response;

            console.log(data);
        });
    }, [id]);

    return (
        <>
            <h1>{id}</h1>
        </>
    );
}

export default UserForm;
