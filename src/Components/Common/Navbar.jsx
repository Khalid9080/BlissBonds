import React, { useContext, useState } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-100.png";
import { AuthContext } from "../../Providers/AuthProvider";

export function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const [activeLink, setActiveLink] = useState(null); // State to track the active link
  const { user, logOut } = useContext(AuthContext);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (linkId) => setActiveLink(linkId);

  const handleLogout = () => {
    logOut()
      .then(() => { })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      })
    // setActiveLink(null);
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 lg:mr-96 md:mr-96 ">
      {[
        { id: "home", label: "Home", to: "/" },
        { id: "dashboard", label: "Dashboard", to: "/dashboard" },
        { id: "biodatas", label: "Biodatas", to: "/biodatas" },
        // { id: "biodata-details", label: "Biodata Details", to: "/biodata-details" },
        { id: "about", label: "About Us", to: "/about" },
        { id: "contact", label: "Contact Us", to: "/contact" },
      ].map(({ id, label, to }) => (
        <li key={id}>
          <NavLink to={to} onClick={() => handleNavClick(id)}>
            <Button
              variant={activeLink === id ? "gradient" : "text"}
              className="rounded-full px-4 py-2 gloock-regular"
            >
              {label}
            </Button>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="max-h-[768px] bg-gradient-to-b from-pink-300 to-white">
      <MTNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-2">
            <div className="text-5xl font-extrabold cursor-pointer pinyon-script-regular text-pink-700">
              Bliss Bonds
            </div>
            <img src={logo} className="w-16 mb-6" alt="" />
          </div>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-3 ">


              {user ? <>
              
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-0 pl-0.5 lg:ml-auto"
                >
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt={user?.displayName}
                    className="border border-gray-900 p-0.5"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL} // Fallback if no photoURL
                  />
                </Button>
              </> : <>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-0 pl-0.5 lg:ml-auto"
                >
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="tania andrew"
                    className="border border-gray-900 p-0.5"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                </Button>
              </>
              }
             
              {
                user ? <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block text-sm gloock-regular"
                    onClick={handleLogout}>Log Out</Button>
                </> : <>
                  <NavLink to="/login">
                    <Button
                      variant={activeLink === "login" ? "gradient" : "text"}
                      size="sm"
                      className="hidden lg:inline-block text-sm gloock-regular"
                      onClick={() => handleNavClick("login")}
                    >
                      Log In
                    </Button>
                  </NavLink>
                  <NavLink to="/signup">
                    <Button
                      variant={activeLink === "signup" ? "gradient" : "text"}
                      size="sm"
                      className="hidden lg:inline-block text-sm gloock-regular"
                      onClick={() => handleNavClick("signup")}
                    >
                      Sign Up
                    </Button>
                  </NavLink>
                </>
              }

            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1 justify-evenly">
            <NavLink to="/login">
              <Button
                fullWidth
                variant={activeLink === "login" ? "gradient" : "text"}
                size="sm"
                className="rounded-full gloock-regular px-16"
                onClick={() => handleNavClick("login")}
              >
                Log In
              </Button>
            </NavLink>

            <NavLink to="/signup">
              <Button
                fullWidth
                variant={activeLink === "signup" ? "gradient" : "text"}
                size="sm"
                className="rounded-full gloock-regular px-16"
                onClick={() => handleNavClick("signup")}
              >
                Sign Up
              </Button>
            </NavLink>
          </div>
        </Collapse>
      </MTNavbar>
    </div>
  );
}

export default Navbar;



// <Collapse open={openNav}>
//   {navList}
//   <div className="flex items-center gap-x-1">
//     <NavLink to="/login">
//       <Button
//         fullWidth
//         variant={activeLink === "login" ? "gradient" : "text"}
//         size="sm"
//         className="rounded-full gloock-regular"
//         onClick={() => {
//           handleNavClick("login");
//           setOpenNav(false); // Close the mobile menu after navigation
//         }}
//       >
//         Log In
//       </Button>
//     </NavLink>
//     <NavLink to="/signup">
//       <Button
//         fullWidth
//         variant={activeLink === "signup" ? "gradient" : "text"}
//         size="sm"
//         className="rounded-full gloock-regular"
//         onClick={() => {
//           handleNavClick("signup");
//           setOpenNav(false); // Close the mobile menu after navigation
//         }}
//       >
//         Sign Up
//       </Button>
//     </NavLink>
//   </div>
// </Collapse>
