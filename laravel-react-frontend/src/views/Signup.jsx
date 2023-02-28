import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                const response = error.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <form action="" onSubmit={onSubmit}>
            <h1 className="title">Signup for free</h1>
            {errors && (
                <div className="alert" role="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <input ref={nameRef} type="text" placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Password Confirmation"
            />
            {loading ? (
                <button className="btn btn-block disabled">Loading...</button>
            ) : (
                <button className="btn btn-block disabled">Signup</button>
            )}

            <p className="message">
                Already Registered? <Link to={"/login"}>Sign in</Link>
            </p>
        </form>
    );
};

export default Signup;
