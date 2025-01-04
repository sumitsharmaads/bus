import { Bars3Icon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/20/solid";
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import User from "../utils/User";
import { get } from "../service";

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(0);
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const handleLogOut = async () => {
    User.logout();
    await get<{
      success: boolean;
      message: string;
    }>("auth/logout", {}, { showSuccess: true, setLoading });
    navigate("/");
  };
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
      <section className="flex flex-col md:flex-row h-[calc(100vh-200px)] bg-gray-100">
        {/* Side bar logic */}
        <div
          className={`md:w-1/5 p-4 shadow-xl shadow-blue-gray-900/5 fixed md:static top-0 left-0 h-full bg-white ${
            sidebarOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="mb-1 p-4">
            <Typography variant="h5" color="blue-gray">
              Admin
            </Typography>
          </div>
          <List>
            <Link to="setting">
              <ListItem className="w-full">
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
            </Link>
            <ListItem onClick={handleLogOut} className="w-full">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-4 text-gray-600 absolute top-4 left-4 z-50"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div
          className={`flex-1 p-6 ${
            sidebarOpen ? "ml-0" : "ml-[1%]"
          } transition-all`}
        >
          <Outlet />
        </div>
      </section>
    </div>
  );
};
