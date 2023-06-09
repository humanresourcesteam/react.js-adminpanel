import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AdminService from "../../service/AdminService";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { SidebarContext } from "../../context/SidebarContext";

const Navbar = () => {
  const [admin, setAdmin] = useState({});
  const { toggleSidebar } = useContext(SidebarContext);
  const token = Cookies.get("token");
  useEffect(() => {
    AdminService.getAllAdminInfo(token).then((response) => {
      setAdmin((admin) => ({
        ...admin,
        ...response.data,
      }));
    });
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div>
          <MenuIcon className="icon" onClick={toggleSidebar}></MenuIcon>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <FullscreenOutlinedIcon className="icon" />
          </div>

          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="item">
              <img
                src={
                  admin.image
                    ? admin.image
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                className="avatar"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
