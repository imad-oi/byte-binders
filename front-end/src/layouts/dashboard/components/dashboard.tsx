import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { setOpenConfigurator, useMaterialTailwindController } from "../../../context";
import { routes } from "../../../routes";
import {
  Configurator,
  DashboardNavbar,
  Sidenav
} from "../../../widgets/layout";
import DashboardRouter from "./dashboard-router";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        brandName={"Admin Page"}
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <button
          className="fixed p-4 bg-black text-white flex items-center justify-center hover:bg-gray-600 bottom-8  right-8 z-40 rounded-full shadow-slate-200"
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </button>
        <DashboardRouter />
      </div>
    </div>
  );
}

// Dashboard.displayName = "/src/layout/dashboard.jsx";

// export default Dashboard;
