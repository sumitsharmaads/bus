import {
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  PowerIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/20/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import User from "../../utils/User";
import { get } from "../../service";
import { useLoader } from "../../contexts/LoaderContext";
import { useState } from "react";
import { AdminRoutes } from "../../navigation";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import PeopleIcon from "@mui/icons-material/People";

export const AdminSidebarIcons = ({
  viewport,
  setIsDropdownOpen,
}: {
  viewport: {
    mobileView: boolean;
    tabView: boolean;
  };
  setIsDropdownOpen: (status: boolean) => void;
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
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      <List>
        <Link
          to={AdminRoutes.DASHBOARD}
          onClick={() => {
            if (viewport.mobileView || viewport.tabView)
              setIsDropdownOpen(false);
          }}
        >
          <ListItem className="w-full hover:bg-gray-100">
            <ListItemPrefix>
              <DashboardCustomizeOutlinedIcon />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PeopleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Users
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link
                to={AdminRoutes.USER}
                onClick={() => {
                  if (viewport.mobileView || viewport.tabView)
                    setIsDropdownOpen(false);
                }}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Users
                </ListItem>
              </Link>
              <Link
                to="tours/add"
                onClick={() => {
                  if (viewport.mobileView || viewport.tabView)
                    setIsDropdownOpen(false);
                }}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Add Users
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Tours
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link
                to="tours"
                onClick={() => {
                  if (viewport.mobileView || viewport.tabView)
                    setIsDropdownOpen(false);
                }}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Tours
                </ListItem>
              </Link>
              <Link
                to="tours/add"
                onClick={() => {
                  if (viewport.mobileView || viewport.tabView)
                    setIsDropdownOpen(false);
                }}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Add Tours
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Link
          to={AdminRoutes.BUS}
          onClick={() => {
            if (viewport.mobileView || viewport.tabView)
              setIsDropdownOpen(false);
          }}
        >
          <ListItem className="w-full hover:bg-gray-100">
            <ListItemPrefix>
              <DirectionsBusOutlinedIcon />
            </ListItemPrefix>
            Bus
          </ListItem>
        </Link>
        <Link
          to="locations"
          onClick={() => {
            if (viewport.mobileView || viewport.tabView)
              setIsDropdownOpen(false);
          }}
        >
          <ListItem className="w-full hover:bg-gray-100">
            <ListItemPrefix>
              <LocationCityOutlinedIcon />
            </ListItemPrefix>
            locations
          </ListItem>
        </Link>
        <Link
          to="terms"
          onClick={() => {
            if (viewport.mobileView || viewport.tabView)
              setIsDropdownOpen(false);
          }}
        >
          <ListItem className="w-full hover:bg-gray-100">
            <ListItemPrefix>
              <TerminalOutlinedIcon />
            </ListItemPrefix>
            Terms
          </ListItem>
        </Link>
        <Link
          to="setting"
          onClick={() => {
            if (viewport.mobileView || viewport.tabView)
              setIsDropdownOpen(false);
          }}
        >
          <ListItem className="w-full hover:bg-gray-100">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
        </Link>
        <Link
          to={AdminRoutes.FAQs}
          onClick={() => {
            if (viewport.mobileView || viewport.tabView)
              setIsDropdownOpen(false);
          }}
        >
          <ListItem className="w-full hover:bg-gray-100">
            <ListItemPrefix>
              <ForumOutlinedIcon />
            </ListItemPrefix>
            FAQs
          </ListItem>
        </Link>
        <ListItem
          onClick={handleLogOut}
          className="w-full hover:bg-gray-100 cursor-pointer"
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </>
  );
};
