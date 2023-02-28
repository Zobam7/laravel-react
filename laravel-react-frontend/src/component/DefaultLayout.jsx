import React, { useEffect } from "react";
import { Link, Navigate, NavLink, Outlet, Router } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const DefaultLayout = () => {
    const { user, token, setUser, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);
    return (
        <div id="defaultLayout">
            <aside>
                <NavLink activeclassname="active" to={"/dashboard"}>
                    Dashboard
                </NavLink>
                <NavLink activeclassname="active" to={"/users"}>
                    Users
                </NavLink>
            </aside>

            <div className="content">
                <header>
                    <div className="">Header</div>
                    <div className="">
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

            {notification && <div className="notification">{notification}</div>}
        </div>
    );
};

export default DefaultLayout;
