import React from "react";
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
  return (
    <Menu>
      <MenuHandler>
        <Avatar src="images/public/avtar.jpg" className="cursor-pointer" />
      </MenuHandler>
      <MenuList>
        <Link
          to={PublicRoutes.PROFILE}
          className="text-normal font-poppins capitalize active:font-semibold"
        >
          <MenuItem className="mb-2">Profile</MenuItem>
        </Link>
        {User.isAdmin && (
          <Link
            to={"/admin"}
            className="text-normal font-poppins capitalize active:font-semibold"
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
