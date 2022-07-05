import "./Sidebar.scss";
import { Link } from "react-router-dom";
import {
  DomainDisabled,
  LocalShipping,
  Person,
  Receipt,
  ShoppingCart,
  TrendingUp,
  WrapText,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
// import { sidebarAction } from "../../../store/actions/sidebar";
import minLogo from "../../../assets/images/logo-min.png";
import maxLogo from "../../../assets/svg/onex-logo-outline.svg";
import { memo, useEffect, useMemo, useState } from "react";
// import getPermissionsAction from "../../../store/actions/permissions/getPermissions";

const sidebarLinks = [
  {
    url: "buy-for-me",
    name: "Buy For Me",
    items: [
      {
        name: "Orders",
        url: "buy-for-me",
      },
    ],
    icon: <ShoppingCart fontSize="large" />,
    show: false,
  },
  {
    url: "roles",
    name: "Role",
    items: [
      {
        name: "Roles",
        url: "roles",
      },
      {
        name: "Create roles",
        url: "create-role",
      },
    ],
    icon: <Receipt fontSize="large" />,
    show: false,
  },
  {
    url: "company",
    name: "Company",
    items: [
      {
        name: "Company",
        url: "company",
      },
      {
        name: "Create company",
        url: "create-company",
      },
    ],
    icon: <DomainDisabled fontSize="large" />,
    show: false,
  },
  {
    url: "users",
    name: "Users",
    items: [
      {
        name: "Users",
        url: "users",
      },
      {
        name: "Create users",
        url: "create-users",
      },
      // {
      //     name: 'Edit role',
      //     url: 'edit-role'
      // }
    ],
    icon: <Person fontSize="large" />,
    show: false,
  },
  {
    url: "delivery",
    name: "Delivery",
    items: [
      {
        name: "Delivery",
        url: "delivery",
      },
      {
        name: "Create delivery",
        url: "create-delivery",
      },
    ],
    icon: <LocalShipping fontSize="large" />,
    show: false,
  },
  {
    url: "statistics",
    name: "Statistics",
    icon: <TrendingUp fontSize="large" />,
  },
];

export default function Sidebar() {
  const [dropdown, setDropdown] = useState(false);
  const [active, setActive] = useState(false);
  // const { active } = useSelector((state) => state.Sidebar);
  const dispatch = useDispatch();

  const changeSidebarStatus = () => {
    // dispatch(sidebarAction(false));
    console.log(active);
    setActive(!active);
  };
  // const { data } = useSelector((state) => state.GetPermissions.data);
  let permissionsArr = [];
  useMemo(() => {
    // dispatch(getPermissionsAction());
  }, []);

  // useEffect(() => {
  //   data?.map(({ name }) => {
  //     permissionsArr.push(name);
  //   });
  // }, [data]);

  const openDropdown = (e, index, arr) => {
    e.stopPropagation();
    arr[index].show = !arr[index].show;
    setDropdown(!dropdown);
  };

  return (
    <div className="sidebar-wrapper">
      <div className={`sidebar ${active ? "active" : ""}`}>
        <div className={"sidebar-list-wrapper"}>
          <ul className="sidebar-list">
            <li
              className={`sidebar-list-item ${
                !active ? "sidebar-list-item-min" : "sidebar-list-item-max"
              }`}
            >
              <img
                src={!active ? minLogo : maxLogo}
                alt="onex-logo"
                className={!active ? "min-logo-onex" : "max-logo-onex"}
              />
              {active ? (
                <button
                  className={`sidebar-burger-btn active-btn`}
                  onClick={changeSidebarStatus}
                >
                  <WrapText fontSize="large" sx={{ color: "red" }} />
                </button>
              ) : (
                <button
                  className={`sidebar-burger-btn active-btn`}
                  onClick={changeSidebarStatus}
                >
                  <img
                    src={!active ? minLogo : maxLogo}
                    alt="onex-logo"
                    className={!active ? "min-logo-onex" : "max-logo-onex"}
                  />
                  {/* <WrapText fontSize="large" sx={{ color: "red" }} /> */}
                </button>
              )}
            </li>
            {active &&
              sidebarLinks.map(
                ({ url, name, items, icon, show }, index, arr) => (
                  <li className={"sidebar-list-item-wrapper"} key={index}>
                    <div
                      className={"sidebar-list-item"}
                      onClick={(e) => openDropdown(e, index, arr)}
                    >
                      <div className="sidebar-list-item-link">
                        {name}
                        {icon}
                      </div>
                    </div>
                    {show && (
                      <div className={"sidebar-list-item-dropdown"}>
                        <ul className={"dropdown-list"}>
                          {items?.map(({ name, url }, index) => (
                            <li className={"dropdown-list-item"} key={index}>
                              <Link
                                to={url}
                                className={"sidebar-list-item-link"}
                              >
                                {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              )}
            {!active &&
              sidebarLinks.map(({ url, name, icon }, index) => (
                <li
                  className={`sidebar-list-item-icons ${
                    !active ? "sidebar-list-item-min" : "sidebar-list-item-max"
                  }`}
                  key={name}
                >
                  <Link to={url} className={"sidebar-list-item-link"}>
                    {icon}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export const MemoizedSidebar = memo(Sidebar);
