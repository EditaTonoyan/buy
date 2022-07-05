import "./Navbar.scss";
import Cookies from "js-cookie";
import Logo from "../../../assets/svg/onex-logo.svg";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { WrapText } from "@material-ui/icons";
// import {sidebarAction} from "../../../store/actions/sidebar";
import { useDispatch } from "react-redux";
import { memo, useEffect, useState } from "react";

export default function Navbar() {
  // const [active, setActive] = useState(false);

  const navigate = useNavigate();
  let userName = Cookies.get("user-name");

  const logout = () => {
    Cookies.remove("auth-token");
    navigate("/login");
  };
  const dispatch = useDispatch();
  // const changeSidebarStatus = () => {
  //   // dispatch(sidebarAction(true))
  //   console.log(777777);
  //   setActive(true);
  // };
  return (
    <div className={"navbar-wrapper"}>
      <div className="burger-btn">
        {/* <button
          className={`burger-btn  active-btn`}
          onClick={changeSidebarStatus}
        >
          <WrapText fontSize="large" />
        </button> */}
      </div>
      <div className="navbar-logo-wrapper">
        <img src={Logo} alt="onex-logo" className="navbar-logo" />
      </div>
      <div className="auth-info-wrapper">
        <span className="auth-info">{userName}</span>
        <div className="logout-btn" onClick={() => logout()}>
          <Button name={"Log Out"} type={""} />
        </div>
      </div>
    </div>
  );
}

export const MemoizedNavbar = memo(Navbar);
