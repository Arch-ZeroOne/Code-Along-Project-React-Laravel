import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import Swal from "sweetalert2";
import { useStateContext } from "../context/ContextProvider";

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { setToken, setUser } = useStateContext();
    const Submit = (e) => {
        e.preventDefault();

        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/login", payLoad)
            .then((response) => {
                const { message } = response.data;
                const { token } = response.data;
                const { user } = response.data;

                setUser(user);
                setToken(token);

                Swal.fire({
                    icon: "success",
                    text: message,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    text: "Account not found",
                });
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Login To Your Account</h1>
                <form onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to={"/register"}>Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
