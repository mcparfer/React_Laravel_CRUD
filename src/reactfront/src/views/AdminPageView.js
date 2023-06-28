import React from "react";
import AdminEventTable from "../components/AdminEventTable";
import AdminHeader from "../components/AdminHeader";

const AdminPageView = () => {

    return (
        <div>
            <AdminHeader />
            <div className="container-lg">
                <AdminEventTable />
            </div>
        </div>

    )
}

export default AdminPageView