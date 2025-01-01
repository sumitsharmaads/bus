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
        <Avatar src="images/public/avtar.jpg" />
      </MenuHandler>
      <MenuList>
        <MenuItem>
          <Link
            to={PublicRoutes.PROFILE}
            className="text-normal font-poppins capitalize hover:underline active:font-semibold"
          >
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Button onClick={handleLogOut}>Logout</Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
