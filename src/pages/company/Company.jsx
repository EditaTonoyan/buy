import { BuyForMeTable } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import deleteRoleAction from "../../store/actions/roles/deleteRole";
// import getCompaniesAction from "../../store/actions/companies";
// import deleteCompaniesAction from "../../store/actions/companies/deleteCompanies";

const ordersColumns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "prefix", label: "Prefix", minWidth: 170 },
  { id: "created_at", label: "Created at", minWidth: 170 },
];

function Company() {
  const dispatch = useDispatch();
  const [removeItemId, setRemoveItemId] = useState(null);
  const { data } = useSelector((state) => {
    return { data: state.Companies.data };
  });
  console.log(data);

  const [rolesList, setRolesList] = useState(null);
  const deletedData = useSelector((state) => state.DeleteRoles.data);

  useEffect(() => {
    // dispatch(getCompaniesAction());
  }, []);

  const removeItem = (id) => {
    // dispatch(deleteCompaniesAction(id));
  };

  useEffect(() => {
    if (deletedData?.status === 200) {
      setRemoveItemId(deletedData.data);
      data.filter((item) => item.id !== deletedData.data.id);
    }
  }, [deletedData]);

  return (
    !!data.length && (
      <div className="roles-wrapper">
        <BuyForMeTable
          title={"Company"}
          rows={data}
          columns={ordersColumns}
          action={{
            updateUrl: "../edit-company/",
            update: "Edit",
            delete: "Delete",
            remove: removeItem,
            addUrl: "../create-company/",
            addLinkName: "Add Company",
          }}
        />
      </div>
    )
  );
}

export default Company;
