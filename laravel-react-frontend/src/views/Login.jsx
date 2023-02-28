import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                const response = error.response;
                if (response && response.status == 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };
    return (
        <form action="" onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            {errors && (
                <div className="alert" role="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            {loading ? (
                <button className="btn btn-block disabled">Loading...</button>
            ) : (
                <button className="btn btn-block disabled">Login</button>
            )}

            <p className="message">
                Not Registered? <Link to={"/signup"}>Create an Account</Link>
            </p>
        </form>
    );
};

export default Login;
