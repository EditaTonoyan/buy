import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { BuyForMe, Layout, NotFound, Roles, Statistics } from "../pages";
import { Login } from "../pages/auth";
import { memo, useEffect, useMemo } from "react";
import EditOrder from "../pages/buyForMe/editOrder/editOrder";
import EditRole from "../pages/roles/editRole/EditRole";
import CreateRole from "../pages/roles/createRole/CreateRole";
import Company from "../pages/company/Company";
import CreateCompany from "../pages/company/createCompany/CreateCompany";
import EditCompany from "../pages/company/editCompany/EditCompany";
import Users from "../pages/users/Users";
import CreateUsers from "../pages/users/createUsers/CreateUsers";
import EditUsers from "../pages/users/editUsers/EditUsers";
import Delivery from "../pages/delivery/Delivery";
import CreateDelivery from "../pages/delivery/createDelivery/CreateDelivery";
import EditDelivery from "../pages/delivery/editDelivery/EditDelivery";
// import getCompaniesAction from "../store/actions/companies";

const AppRouter = () => {
  // const { active } = useSelector((state) => state.Sidebar);
  // const permissions = useSelector((state) => state.GetPermissions.data);

  const dispatch = useDispatch();

  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          <Layout />
          <div
            // className={active ? "content-wrapper-active" : "content-wrapper"}
            className={"content-wrapper"}
          >
            <Routes>
              {/*{(permissions.includes('order-full') || permissions.includes('order-list') || permissions.includes('order-view') || permissions.includes('order-create') || permissions.includes('order-delete')) &&*/}
              <Route index path="buy-for-me" element={<BuyForMe />} />
              {/*// }*/}
              {/*{permissions.includes('order-edit') &&*/}
              <Route path="edit-order/:id" element={<EditOrder />} />
              {/*// }*/}
              {/*{(permissions.includes('role-full') || permissions.includes('role-list') || permissions.includes('role-view') || permissions.includes('role-create') || permissions.includes('role-edit') || permissions.includes('role-delete')) &&*/}
              <Route path="roles" element={<Roles />} />
              {/*// }*/}
              {/*{permissions.includes('role-create') &&*/}
              <Route path="create-role" element={<CreateRole />} />
              {/*// }*/}
              {/*{permissions.includes('role-edit') &&*/}
              <Route path="edit-role/:id" element={<EditRole />} />
              {/*// }*/}
              <Route path="create-company" element={<CreateCompany />} />
              {/*{(permissions.includes('company-full') || permissions.includes('company-list') || permissions.includes('company-view') || permissions.includes('company-create') || permissions.includes('company-edit') || permissions.includes('company-delete')) &&*/}
              <Route path="company" element={<Company />} />
              {/*// }*/}
              {/*{permissions.includes('company-create') &&*/}
              {/*// }*/}
              {/*{permissions.includes('company-edit') &&*/}
              <Route path="edit-company/:id" element={<EditCompany />} />
              {/*// }*/}
              {/*{(permissions.includes('user-full') || permissions.includes('user-list') || permissions.includes('user-view') || permissions.includes('user-create') || permissions.includes('user-edit') || permissions.includes('user-delete')) &&*/}
              <Route path="users" element={<Users />} />
              {/*// }*/}
              {/*{permissions.includes('user-create') &&*/}
              <Route path="create-users" element={<CreateUsers />} />
              {/*// }*/}
              {/*{permissions.includes('user-edit') &&*/}
              <Route path="edit-users/:id" element={<EditUsers />} />
              {/*}*/}
              {/*{(permissions.includes('delivery-full') || permissions.includes('delivery-list') || permissions.includes('delivery-view') || permissions.includes('delivery-create') || permissions.includes('delivery-edit') || permissions.includes('delivery-delete')) &&*/}
              <Route path="delivery" element={<Delivery />} />
              {/*// }*/}
              {/*{permissions.includes('delivery-create') &&*/}
              <Route path="create-delivery" element={<CreateDelivery />} />
              {/*}*/}
              {/*{permissions.includes('delivery-edit') &&*/}
              <Route path="edit-delivery/:id" element={<EditDelivery />} />
              {/*// }*/}
              <Route path="statistics" element={<Statistics />} />
              <Route path="not-found" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/buy-for-me" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
