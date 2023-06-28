import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

import AuthUser from "./AuthUser";
import logo from "../images/logo.png";

const AdminHeader = () => {
    const { logout } = AuthUser();
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => logoutUser()
    const [, setCookie, removeCookie] = useCookies(['expireTime']);

    const checkForInactivity = () => {
        const expireTime = Cookies.get('expireTime');

        if (expireTime < Date.now()) {
            removeCookie('expireTime');
            handleShow();
        }
    };

    const updateExpireTime = () => {
        const expireTime = Date.now() + 30000
        setCookie('expireTime', expireTime, { path: '/' })
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkForInactivity()
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        updateExpireTime();

        window.addEventListener('click', updateExpireTime);
        window.addEventListener('keypress', updateExpireTime);
        window.addEventListener('scroll', updateExpireTime);
        window.addEventListener('mousemove', updateExpireTime);

        return () => {
            window.removeEventListener('click', updateExpireTime);
            window.removeEventListener('keypress', updateExpireTime);
            window.removeEventListener('scroll', updateExpireTime);
            window.removeEventListener('mousemove', updateExpireTime);
        };
    }, []);

    const logoutUser = () => {
        removeCookie('expireTime');
        logout();
    };

    return (
        <>
            <div>
                <header>
                    <div className="px-3 py-2 miku">
                        <div className="d-flex flex-wrap">
                            <div className="d-flex align-items-center my-2 my-lg-0 me-lg-auto">
                                <img
                                    src={logo}
                                    className="mx-3"
                                    width="200px"
                                    alt="Project SEKAI Wiki"
                                ></img>
                                <h5 className="fs-4 fw-bold mt-2">Project SEKAI Dashboard</h5>
                            </div>

                            <ul className="align-items-center nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                                <li>
                                    <Link to="/dashboard/events" className="nav-link text-black fw-bold">
                                        Future Events
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/sales" className="nav-link text-black fw-bold">
                                        Ticket Sellings
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/add_admin" className="nav-link text-black fw-bold">
                                        Add Admin
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="nav-link text-white ms-3 btn danger-color"
                                        onClick={logoutUser}
                                    >
                                        LogOut
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Oops!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your session has timed out due to inactivity. Please log in again.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminHeader;