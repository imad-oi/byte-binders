import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";

import { BiHome, BiSolidBookAdd, BiSolidLogOut, BiSolidLogOutCircle, BiSolidMessageCheck } from "react-icons/bi";
import { MdPublishedWithChanges } from "react-icons/md";
import { Redirect } from "react-router-dom";
import AdminAlert from "../utils/AdminAlert";
import AddNewBook from "./components/AddNewBook";
import AdminMessages from "./components/AdminMessages";

import { MdClose } from "react-icons/md";
import ChangeQuantityOfBooks from "./components/ChangeQuantityOfBooks";
import { BsDashCircle } from "react-icons/bs";
import Dashboard from "./components/dashboard/Dashboard";

const ManageLibraryPage = () => {

    const { authState } = useOktaAuth();

    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false)

    const [activeTab, setActiveTab] = useState('add new book');

    // Admin alert
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertDesc, setAlertDesc] = useState<string>("");

    // side bar
    const [isOpen, setIsOpen] = useState(false);
    const { oktaAuth } = useOktaAuth();

    const handleLogout = async () => {
        await oktaAuth.signOut();
    }

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const handleTabClick = (tabId: string) => {
        setIsOpen(false);
        setActiveTab(tabId);
    };

    const servicesClick = (name: string) => {
        if (name === 'add new book') {
            setChangeQuantityOfBooksClick(false);
            setMessagesClick(false);
        } else if (name === 'change quantity') {
            setChangeQuantityOfBooksClick(true);
            setMessagesClick(false);
        } else if (name === 'messages') {
            setChangeQuantityOfBooksClick(false);
            setMessagesClick(true);
        } else if (name === 'dashboard') {
            setChangeQuantityOfBooksClick(false);
            setMessagesClick(false);
        }

    }

    if (authState?.accessToken?.claims.userType !== 'admin') {
        return <Redirect to="/" />;
    }


    const listMenu = [
        {
            id: 0,
            name: "Dashboard",
            active: false,
            icon: <BiHome className={`w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${activeTab === 'dashboard' && "text-white -900 "}`} />
        },
        {
            id: 1,
            name: "Add new book",
            active: true,
            icon: <BiSolidBookAdd className={`w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${activeTab === 'add new book' && "text-white -900 "}`} />
        },
        {
            id: 2,
            name: "Change Quantity",
            active: false,
            icon: <MdPublishedWithChanges className={`w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${activeTab === 'change quantity' && "text-white -900 "}`} />
        },
        {
            id: 3,
            name: "Messages",
            active: false,
            icon: <BiSolidMessageCheck className={`w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${activeTab === 'messages' && "text-white -900 "}`} />
        }
    ];

    return (
        <div className="flex flex-col  gap-4 md:flex-row md:px-  md:mb">

            <button
                onClick={toggleSidebar}
                data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm
                w-fit
                 text-gray-500 rounded-lg sm:hidden hover:bg-gray-00
                  focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside id="cta-button-sidebar"
                // className={`fixed top-4 ${isOpen ? "left-64" : ""} z-40 w-64 h-screen md:relative md:h-fit
                //   transition-transform -translate-x-full md:translate-x-0   
                //  bg-slate-200 md:bg-white`}
                className={`h-screen w-64 p-4  bg-slate-700 `}
                style={{ backgroundColor: '#3f3f46' }}
                aria-label="Sidebar">
                <div className="px-3 py-4 overflow-y-auto bg-ray-50 dark:bg-gray-800">
                    {/* Contenu du sidebar */}
                    <div className="flex justify-end">
                        <MdClose
                            size={30}
                            onClick={closeSidebar}
                            className="bg-slate-100 rounded-md my-4 md:hidden" />
                    </div>
                    <div className="pb-8" >
                        <h2 className="text-2xl font-semibold text-white text-center dark:text-white">Admin</h2>
                        <p className="text-white -500 dark:text-gray-400 text-center">Manage your library</p>
                    </div>
                    <ul className="md:space-y-2 gap-2 font-medium flex flex-col ">
                        {listMenu.map((item, i) => (
                            <li
                                onClick={() => {
                                    servicesClick(item.name.toLowerCase())
                                    handleTabClick(item.name.toLowerCase());
                                }}
                                key={i} className={`rounded-lg hover:bg-blue-500 ${activeTab === item.name.toLowerCase() && "bg-blue-500 text-white"}`}>
                                <button
                                    className={`flex items-center p-2 text-white -900  group}`}>
                                    {item.icon}
                                    <span className="ml-3"> {item.name} </span>
                                </button>
                            </li>))}
                    </ul>
                    <div className="bg-blue-500 text-white fixed bottom-4 w- py-2 px-4 font-bold rounded-md ">
                        <div className="flex gap-4">
                            <button
                                onClick={handleLogout}
                                className="">logout
                            </button>
                            < BiSolidLogOutCircle size={24} className="transition duration-75 group-hover:text-gray-900 rotate-180" />
                        </div>
                    </div>
                    <AdminAlert
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                        description={alertDesc}
                    />
                </div>
            </aside>

            <section className="flex-1 h-screen overflow-y-scroll  p-4">
                <div className="p-4 gap-4 bg-sky-0 h-72">
                    <div className={`${activeTab === 'add new book' ? '' : 'hidden'}`}  >
                        <AddNewBook
                            setShowAlert={setShowAlert}
                            setAlertDesc={setAlertDesc}
                        />
                    </div>
                    <div className={`${activeTab === 'change quantity' ? '' : 'hidden'}`}
                    >{changeQuantityOfBooksClick ? <ChangeQuantityOfBooks /> : <></>}
                    </div>
                    <div className={`${activeTab === 'messages' ? '' : 'hidden'}`}>
                        {messagesClick ? <AdminMessages /> : <></>}
                    </div>
                    <div className={`${activeTab === 'dashboard' ? '' : 'hidden'}`}>
                        <Dashboard />
                    </div>
                </div>
            </section>


        </div>
    )
}

export default ManageLibraryPage