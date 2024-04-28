import React from "react";
import {
  HomeIcon,
  InformationCircleIcon,
  TableCellsIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import { Home, Notifications, Profile, Tables } from "../layouts/dashboard";
import { MdSettingsApplications } from "react-icons/md";
import AddNewBook from "../layouts/ManageLibraryPage/components/AddNewBook";
import ChangeQuantityOfBooks from "../layouts/ManageLibraryPage/components/ChangeQuantityOfBooks";
import AdminMessages from "../layouts/ManageLibraryPage/components/AdminMessages";

const icon = {
  className: "w-5 h-5 text-inherit",
};

type Page = {
  icon: React.ReactElement
  name: String,
  path: String,
  element: any
}

type Route = {
  title: String,
  layout: String,
  pages: Page[]

}

export const routes: Route[] = [
  {
    title: "Dashboard",
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <MdSettingsApplications {...icon} />,
        name: "manage library ",
        path: "/add-book",
        element: <AddNewBook />,
      },
      {
        icon: <MdSettingsApplications {...icon} />,
        name: "change quantity ",
        path: "/change-quantity",
        element: <ChangeQuantityOfBooks />,
      },
      {
        icon: <MdSettingsApplications {...icon} />,
        name: "Messages ",
        path: "/messages",
        element: <AdminMessages />,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       // element: <SignIn />,
  //       element: <Home />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       // element: <SignUp />,
  //       element: <Home />,
  //     },
  //   ],
  // },
];

// export default Routes;
