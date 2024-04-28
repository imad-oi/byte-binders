import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Typography
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { setOpenSidenav, useMaterialTailwindController } from "../../context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-black`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 flex justify-center">
          <h1>
            <Typography
              variant="h1"
              color={sidenavType === "dark" ? "white" : "blue"}
              className="font-bold text-4xl"
            >
              {brandName}
            </Typography>
          </h1>
        </Link>
        <button
          className="absolute right-2 top-2 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <ArrowLeftIcon strokeWidth={2.5} className="h-5 w-5" />
        </button>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue"}
                  className="font-black uppercase opacity-75"
                >
                  {""}
                </Typography>
              </li>
            )}

            {
              pages.map(({ name, path, icon }) => (
                <li key={name}>
                  <NavLink
                  className={`bg-${sidenavColor}`}
                  to={`/${layout}${path}`}>
                    <Button
                      variant="gradient"
                      color={sidenavColor}
                      className="flex items-center gap-4 px-4 capitalize "
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  </NavLink>
                </li>
              ))
            }
          </ul>
        ))}
      </div>
    </aside>
  );
}


export default Sidenav;
