import React from "react";
import { Routes, Route } from 'react-router-dom';

import AdminHeader from "../components/AdminHeader";

import AdminTableEvents from "../components/AdminTableEvents";
import AdminFormEvent from "../components/AdminFormEvent";
import AdminFormSetUnits from "../components/AdminFormSetUnits";

import AdminTableSales from "../components/AdminTableSales";
import AdminFormSale from "../components/AdminFormSale";

import AdminRegister from "../components/AdminRegister";

const Admin = () => {

    return (
        <div className="App">
            <AdminHeader />
            <div className="container-lg d-flex justify-content-center">
                <Routes>
                    <Route path='/dashboard/events' element={<AdminTableEvents />} />
                    <Route path='/dashboard/add-event' element={<AdminFormEvent />} />
                    <Route path='/dashboard/edit-event/:id' element={<AdminFormEvent />} />
                    <Route path='/dashboard/edit-event/set-units/:id' element={<AdminFormSetUnits />} />
                    <Route path='/dashboard/sales' element={<AdminTableSales />} />
                    <Route path='/dashboard/sales/edit-sale/:id' element={<AdminFormSale />} />
                    <Route path='/dashboard/add_admin' element={<AdminRegister />} />
                </Routes>
            </div>
        </div>
    )

}

export default Admin