import { createBrowserRouter } from "react-router-dom";
import Main_Layout from "../Layout/Main_Layout";
import Home from "../Components/Pages/Home";
import Biodatas from "../Components/Pages/Biodatas";
import AboutUs from "../Components/Pages/AboutUs";
import ContactUs from "../Components/Pages/ContactUs";
import Dashboard from "../Components/Dashboard/Dashboard";
import Signup from "../Components/Pages/Signup";
import Login from "../Components/Pages/Login";
import ManageUsers from "../Components/Dashboard/Admin/ManageUsers";
import Biodata_Details from "../Components/Pages/Biodata_Details";
import Create_Edit_Biodata from "../Components/Dashboard/User/Create_Edit_Biodata";
import CheckOut from "../Components/Pages/CheckOut";
import PrivateRoute from "../Components/Private/PrivateRoute";
// import Favourite_Biodata from "../Components/Dashboard/User/Favourite_Biodata";
// import CheckOut from "../Components/Pages/CheckOut";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_Layout></Main_Layout>,
    children: [
      {
        
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "dashboard",
        element: <PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute> ,
      },
      {
        path: "biodatas",
        element: <Biodatas></Biodatas>,
      },
      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
      },

      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path:"manageusers",
        element:<ManageUsers></ManageUsers>
      },
      {
        path: "biodata-details/:biodataId",  // Accepts a dynamic `id`
        element: <Biodata_Details></Biodata_Details>,
      },
      {
        path:"create-edit-biodata",
        element:<Create_Edit_Biodata></Create_Edit_Biodata>
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      // {
      //   path:"fav-biodata",
      //   element:<Favourite_Biodata></Favourite_Biodata>
      // }

    ],
  },


]);