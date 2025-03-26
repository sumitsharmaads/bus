import React, { useCallback } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../navigation";
import { get } from "../../service";
import { useLoader } from "../../contexts/LoaderContext";
import User from "../../utils/User";

interface AvatarDropdown {
  isMobile?: boolean;
}
export const AvatarDropdown: React.FC<AvatarDropdown> = ({
  isMobile = false,
}) => {
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

  const isActive = useCallback(
    (route: string) => {
      return location.hash === `#${route}`;
    },
    [location.pathname]
  );

  const classname = (route: string, homeFlag?: boolean) => {
    const homeRoute = isActive("/") || isActive("");
    return `text-normal font-poppins capitalize hover:font-semibold active:font-semibold
                ${
                  isActive(route) || (homeFlag && homeRoute)
                    ? "font-semibold text-[#C22A54]"
                    : ""
                }`;
  };

  return (
    <Menu>
      <MenuHandler>
        <Avatar src="images/public/avtar.jpg" className="cursor-pointer" />
      </MenuHandler>
      <MenuList>
        <Link
          to={PublicRoutes.PROFILE}
          onMouseEnter={() => import("../../pages/Profile")}
          className={classname(PublicRoutes.PROFILE)}
        >
          <MenuItem className="mb-2">Profile</MenuItem>
        </Link>
        {User.isAdmin && (
          <Link
            to={"/admin"}
            className={classname("/admin")}
            onMouseEnter={() => import("../../pages/admin/AdminDashboard")}
          >
            <MenuItem className="mb-2">Admin</MenuItem>
          </Link>
        )}
        <MenuItem onClick={handleLogOut} className="bg-secondary text-white">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
