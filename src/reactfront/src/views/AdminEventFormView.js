import React from "react";
import AdminEventForm from "../components/AdminEventForm";
import AdminHeader from "../components/AdminHeader";
import AdminLogin from "../components/AdminLogin";

const AdminEventFormView = () => {

    return (
        <div>
            <AdminHeader />
            <div className="container d-flex justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11">
                    <AdminEventForm />
                </div>
            </div>
        </div>

    )
}

export default AdminEventFormView