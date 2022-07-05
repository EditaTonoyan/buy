import { BuyForMeTable } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import getDeliveryAction from "../../store/actions/delivery";
// import deleteDeliveryAction from "../../store/actions/delivery/deleteDelivery";

const ordersColumns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "country", label: "Country", minWidth: 170 },
  { id: "state", label: "State", minWidth: 170 },
  { id: "city", label: "City", minWidth: 170 },
  { id: "zip", label: "ZIP Code", minWidth: 170 },
  { id: "address", label: "Address 1", minWidth: 170 },
  { id: "address2", label: "Address 2", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  // {id: 'created_at', label: 'Created at', minWidth: 170},
  // {id: 'updated_at', label: 'Updated at', minWidth: 170},
];

function Delivery() {
  const dispatch = useDispatch();
  const [removeItemId, setRemoveItemId] = useState(null);
  const { data } = useSelector((state) => {
    return { data: state.Delivery.data };
  });
  const [rolesList, setRolesList] = useState(null);
  const deletedData = useSelector((state) => state.DeleteDelivery.data);

  useEffect(() => {
    // dispatch(getDeliveryAction())
  }, []);

  const removeItem = (id) => {
    // dispatch(deleteDeliveryAction(id))
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
          title={"Delivery"}
          rows={data}
          columns={ordersColumns}
          action={{
            updateUrl: "../edit-delivery/",
            update: "Edit",
            delete: "Delete",
            remove: removeItem,
            addUrl: "../create-delivery/",
            addLinkName: "Add Delivery",
          }}
        />
      </div>
    )
  );
}

export default Delivery;
