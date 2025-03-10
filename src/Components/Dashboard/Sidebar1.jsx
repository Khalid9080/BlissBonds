import React, { useContext } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

import {
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

// Local/asset icons
import UserDashboard from "../../assets/UserDashboard_icons/icons8-dashboard-64.png";
import edit from "../../assets/UserDashboard_icons/icons8-edit-row-64.png";
import view from "../../assets/UserDashboard_icons/icons8-call-male-64.png";
import cv from "../../assets/UserDashboard_icons/icons8-cv-64.png";
import fav from "../../assets/UserDashboard_icons/icons8-fire-64.png";
import user from "../../assets/UserDashboard_icons/icons8-user-64.png";
import admin from "../../assets/UserDashboard_icons/icons8-admin-64.png";
import Admin from "../../assets/AdminDashboard/icons8-admin.png";
import Manage from "../../assets/AdminDashboard/icons8-checklist-64.png";
import Premium from "../../assets/AdminDashboard/icons8-premium-64.png";
import Request from "../../assets/AdminDashboard/icons8-contact-64.png";
import { AuthContext } from "../../Providers/AuthProvider";

function SidebarLight({ setActiveComponent }) {
  const [isAdmin] = useAdmin();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // Common hover/focus/active list-item styles
  const LIST_ITEM_STYLES =
    "   w-full flex items-center gap-4 px-4 py-3 rounded-md transition-colors " +
    "hover:bg-indigo-50 focus:bg-indigo-50 active:bg-indigo-100 " +
    "hover:text-indigo-900 focus:text-indigo-900 active:text-indigo-900 " +
    "text-gray-600 cursor-pointer ";

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Logout Failed:", error));
  };

  return (
    <Card className="h-full w-full p-5 flex flex-col bg-white shadow-lg rounded-xl">
      {/* Header / Logo / Title Section */}
      <div className="flex items-center gap-4 p-4 border-b gilda-display-regular">
        <img
          src={isAdmin ? admin : user}
          alt="Profile Icon"
          className="w-10 h-10"
        />
        <Typography variant="h6" className=" text-xl gilda-display-regular   text-black">
          {isAdmin ? "Admin" : "User"} Dashboard
        </Typography>
      </div>

      {/* Main Menu Items */}
      <div className="flex-grow overflow-y-auto py-4 ">
        <List className="p-0 space-y-5" >
          {isAdmin ? (
            <>
              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("Admin_Dashboard")}
              >
                <img src={Admin} alt="Admin Dashboard"  className="w-8 h-8" />
                <span className="font-medium text-lg gilda-display-regular   text-black">Admin Dashboard</span>
              </ListItem>

              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("ManageUsers")}
              >
                <img src={Manage} alt="Manage Users"  className="w-8 h-8" />
                <span className="font-medium text-lg gilda-display-regular  text-black">Manage Users</span>
              </ListItem>

              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("Approve_Premium")}
              >
                <img src={Premium} alt="Approve Premium" className="w-8 h-8" />
                <span className="font-medium text-lg gilda-display-regular text-black ">Approve Premium</span>
              </ListItem>

              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("Approve_Contact_Request")}
              >
                <img
                  src={Request}
                  alt="Approve Contact Request"
                   className="w-8 h-8"
                />
                <span className="font-medium text-lg gilda-display-regular text-black">Approve Contact</span>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("Main_Dashboard")}
              >
                <img
                  src={UserDashboard}
                  alt="Main Dashboard"
                  className="w-6 h-6"
                />
                <span className="font-medium text-lg gilda-display-regular  text-black">Main Dashboard</span>
              </ListItem>

              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("Create_Edit_Biodata")}
              >
                <img src={edit} alt="Edit Biodata"  className="w-8 h-8" />
                <span className="font-medium text-xl gilda-display-regular  text-black">Edit Biodata</span>
              </ListItem>

              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("View_Biodata")}
              >
                <img src={view} alt="View Biodata"  className="w-8 h-8" />
                <span className="font-medium text-lg gilda-display-regular  text-black">View Biodata</span>
              </ListItem>

              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("My_Contact_Request")}
              >
                <img src={cv} alt="My Contact Request"  className="w-8 h-8" />
                <span className="font-medium text-lg gilda-display-regular  text-black">My Contact Request</span>
              </ListItem>

              <ListItem
                className={LIST_ITEM_STYLES}
                onClick={() => setActiveComponent("Favourite_Biodata")}
              >
                <img src={fav} alt="Favourite Biodata"  className="w-8 h-8" />
                <span className="font-medium text-lg gilda-display-regular  text-black">Favourite Biodata</span>
              </ListItem>
            </>
          )}
        </List>
      </div>

      {/* Sign Out Section */}
      <div className="border-t p-4">
        <List>
          <ListItem className={LIST_ITEM_STYLES} onClick={handleSignOut}>
            <ListItemPrefix>
              <ArrowLeftStartOnRectangleIcon
                strokeWidth={2.5}
                className="h-5 w-5 text-red-500"
              />
            </ListItemPrefix>
            <span className="font-medium text-lg gilda-display-regular text-black">Sign Out</span>
          </ListItem>
        </List>
      </div>
    </Card>
  );
}

export default SidebarLight;


/*


import React from "react";
import {
  List,
  Card,
  Alert,
  Avatar,
  ListItem,
  Accordion,
  Typography,
  AccordionBody,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  TicketIcon,
  UserGroupIcon,
  Square2StackIcon,
  RectangleGroupIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

function SidebarDark() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const LIST_ITEM_STYLES =
    "text-gray-500 hover:text-white focus:text-white active:text-white hover:bg-opacity-20 focus:bg-opacity-20 active:bg-opacity-20";

  return (
    <Card
      color="gray"
      className="h-[calc(100vh-2rem)] w-full max-w-[20rem] mx-auto p-6 shadow-md"
    >
      <div className="mb-2 flex items-center gap-4 p-4">
        <img
          src="https://www.material-tailwind.com/logos/mt-logo.png"
          alt="brand"
          className="h-9 w-9"
        />
        <Typography className="text-lg font-bold text-gray-300">
          Material Tailwind
        </Typography>
      </div>
      <hr className="my-2 border-gray-800" />
      <List>
        <Accordion open={open === 1}>
          <ListItem
            selected={open === 1}
            data-selected={open === 1}
            onClick={() => handleOpen(1)}
            className="p-3 hover:bg-opacity-20 text-gray-500 select-none focus:bg-opacity-20 active:bg-opacity-20 data-[selected=true]:bg-gray-50/20 hover:text-white focus:text-white active:text-white data-[selected=true]:text-white"
          >
            <ListItemPrefix>
              <Avatar
                size="sm"
                src="https://www.material-tailwind.com/img/avatar1.jpg"
              />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal text-inherit">
              Brooklyn Alice
            </Typography>
            <ChevronDownIcon
              strokeWidth={3}
              className={`ml-auto text-gray-500 h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                My Profile
              </ListItem>
              <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                Settings
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-gray-800" />
        <Accordion open={open === 2}>
          <ListItem
            selected={open === 2}
            data-selected={open === 2}
            onClick={() => handleOpen(2)}
            className="px-3 py-[9px] hover:bg-opacity-20 text-gray-500 select-none focus:bg-opacity-20 active:bg-opacity-20 data-[selected=true]:bg-gray-50/20 hover:text-white focus:text-white active:text-white data-[selected=true]:text-white"
          >
            <ListItemPrefix>
              <RectangleGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal text-inherit">
              Dashboard
            </Typography>
            <ChevronDownIcon
              strokeWidth={3}
              className={`ml-auto text-gray-500 h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                Analytics
              </ListItem>
              <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                Sales
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <Square2StackIcon className="h-5 w-5" />
          </ListItemPrefix>
          Products
        </ListItem>
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <TicketIcon className="h-5 w-5" />
          </ListItemPrefix>
          Orders
        </ListItem>
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Customers
        </ListItem>
      </List>
      <hr className="my-2 border-gray-800" />
      <List>
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
          </ListItemPrefix>
          Help & Support
        </ListItem>
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <ArrowLeftStartOnRectangleIcon
              strokeWidth={2.5}
              className="h-5 w-5"
            />
          </ListItemPrefix>
          Sign Out
        </ListItem>
      </List>
      <Alert
        open={openAlert}
        className="mt-auto bg-gray-800"
        variant="ghost"
      >
        <Typography
          variant="small"
          color="white"
          className="mb-1 font-bold"
        >
          New Version Available
        </Typography>
        <Typography variant="small" color="white" className="font-normal">
          Update your app and enjoy the new features and improvements.
        </Typography>
        <div className="mt-4 flex gap-4">
          <Typography
            as="a"
            href="#"
            variant="small"
            color="white"
            className="font-normal"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography
            as="a"
            href="#"
            variant="small"
            color="white"
            className="font-medium"
          >
            Upgrade Now
          </Typography>
        </div>
      </Alert>
      <Typography
        variant="small"
        className="mt-5 font-medium text-gray-400 flex justify-center"
      >
        mt v2.1.2
      </Typography>
    </Card>
  );
}

export default SidebarDark;



*/