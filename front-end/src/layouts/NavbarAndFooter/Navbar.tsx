import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

import SpinnerLoading from "../utils/SpinnerLoading";

const logo = "./src/Images/minLogo.gif";

const navMenu = [
    { id: 1, name: "Home", url: "/", requireAuth: false },
    { id: 2, name: "Seach Book", url: "/search", requireAuth: false },
    { id: 3, name: "Shelf", url: "/shelf", requireAuth: false },
    { id: 4, name: "Admin", url: "/admin", requireAuth: false },
    { id: 4, name: "Contact", url: "/contact", requireAuth: false }
]

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [activeLink, setActiveLink] = useState<number>(1);

    const router = useHistory();

    const handleClickNav = (url: string, id: number) => {
        setActiveLink(id);
        router.push(url);
    }

    const { authState, oktaAuth } = useOktaAuth();

    const handleLogout = async () => oktaAuth.signOut();

    return (
        <nav className="bg-white sticky top-0 w-full z-20 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="h-8 mr-3" alt="Logo" />
                </Link>
                <div className="flex md:order-2">
                    {
                        !authState ? <SpinnerLoading />
                            : !authState?.isAuthenticated ?
                                <button
                                    onClick={() => router.push("/login")}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">
                                    Sign In
                                </button> :
                                <button
                                    onClick={handleLogout}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">
                                    Log Out
                                </button>
                    }
                    <button
                        onClick={() => setToggle(!toggle)}
                        data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                        aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${!toggle && "hidden"}  w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                        {
                            navMenu.map((item, index) => (
                                <li key={index} onClick={() => handleClickNav(item.url, item.id)}>
                                    <NavLink to={item.url}
                                        className={`block hover:cursor-pointer py-2 pl-3 pr-4
                                      ${item.id == activeLink ? "bg-blue-700 text-white" : "text-black"}   
                                     rounded md:bg-transparent
                                        ${item.id == activeLink ?
                                                "md:text-blue-700"
                                                : "md:text-black"} 
                                       md:p-0 `}

                                        aria-current="page">
                                        {
                                            item.requireAuth && !authState?.isAuthenticated && item.name == "Shelf" ||
                                                (authState?.accessToken?.claims?.userType !== 'admin' && item.name == 'Admin') ? "" : item.name
                                        }
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar