import React from "react";
import { Routes, Route } from 'react-router-dom';

import GuestHeader from "../components/GuestHeader";
import GuestFooter from "../components/GuestFooter";

import AdminLogin from "../components/AdminLogin";
import GuestHome from "../components/GuestHome";
import GuestTicket from "../components/GuestTicket";

const Guest = () => {

    return (
        <div className="App">
            <GuestHeader />
            <div className="container-lg d-flex justify-content-center">
                <Routes>
                    <Route path='/' element={<GuestHome />} />
                    <Route path='/login' element={<AdminLogin />} />
                    <Route path='/ticket/:id' element={<GuestTicket />} />
                </Routes>
            </div>
            <GuestFooter />
        </div>
    )

}

export default Guest