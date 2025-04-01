import React, { useEffect, useState } from "react";
import Sidebar1 from "./Sidebar1";
import Mainboard from "./Mainboard";
import Create_Edit_Biodata from "./User/Create_Edit_Biodata";
import View_Biodata from "./User/View_Biodata";
import My_Contact_Request from "./User/My_Contact_Request";
import Favourite_Biodata from "./User/Favourite_Biodata";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ManageUsers from "./Admin/ManageUsers";
import Approve_Contact_Request from "./Admin/Approve_Contact_Request";
import Approve_Premium from "./Admin/Approve_Premium";
import Admin_Dashboard from "./Admin/Admin_Dashboard";
import Main_Dashboard from "./User/Main_Dashboard";
import useAdmin from "../Hooks/useAdmin";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
 


  const [activeComponent, setActiveComponent] = useState("Main_Dashboard");
  useEffect(() => {
    // When the admin status is determined, update the active component accordingly.
    if (isAdmin) {
      setActiveComponent("Admin_Dashboard");
    } else {
      setActiveComponent("Main_Dashboard");
    }
  }, [isAdmin]);

  return (
    
    //className="flex h-[calc(100vh-2rem)] mt-20"
    <div className="flex flex-col md:flex-row items-center md:h-[calc(100vh-2rem)] mt-20">
      <Helmet>
        <title>{isAdmin ? "Bliss Bonds - Admin Dashboard" : "Bliss Bonds - User Dashboard"}</title>
      </Helmet>

      {/* Sidebar Section */}
      <div className="md:w-1/4 w-10/12 h-full">
        <Sidebar1 setActiveComponent={setActiveComponent} />
      </div>
      {/* Content Section */}
      <div className="md:w-3/4 w-full h-full overflow-y-auto px-8 shadow-lg mx-2 rounded-xl">

        {activeComponent === "Main_Dashboard" && <Main_Dashboard />}
        {activeComponent === "Create_Edit_Biodata" && <Create_Edit_Biodata />}
        {activeComponent === "View_Biodata" && <View_Biodata />}
        {activeComponent === "My_Contact_Request" && <My_Contact_Request />}
        {activeComponent === "Favourite_Biodata" && <Favourite_Biodata />}

        {activeComponent === "Admin_Dashboard" && <Admin_Dashboard />}
        {activeComponent === "ManageUsers" && <ManageUsers />}
        {activeComponent === "Approve_Contact_Request" && <Approve_Contact_Request />}
        {activeComponent === "Approve_Premium" && <Approve_Premium />}

      </div>
    </div>
  );
};

export default Dashboard;
