import "./BuyForMe.scss";
import { Button, Input, BuyForMeTable } from "../../components";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import getOrdersAction from "../../store/actions/orders";
import { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "../../components/dialog/Dialog";
import AlertDialog from "../../components/dialog/Dialog";
// import deleteOrderAction from "../../store/actions/orders/deleteOrder";
import { Alert } from "@mui/material";
// import rejectOrderAction from "../../store/actions/orders/rejectOrder";
// import buyOrderAction from "../../store/actions/orders/buyOrder";
import { Helmet } from "react-helmet";
import { tableHeads } from "../../utils/tableHeads";
import { getOrgers } from "../../store/actions/index";

const ordersColumns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "customer_full_name", label: "Full Name", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "tracking_code", label: "Tracking Code", minWidth: 170 },
  { id: "product", insertId: "url", label: "URL", minWidth: 170 },
  { id: "product", insertId: "name", label: "Product Name", minWidth: 170 },
  { id: "product", insertId: "color", label: "Color", minWidth: 170 },
  { id: "product", insertId: "price", label: "Price", minWidth: 170 },
  { id: "product", insertId: "quantity", label: "Quantity", minWidth: 170 },
  { id: "comment", label: "Comment", minWidth: 170 },
  { id: "admin_comment", label: "Admin comment", minWidth: 170 },
  { id: "message", label: "Message", minWidth: 170 },
  { id: "cancelMessage", label: "Cancel Message", minWidth: 170 },
  { id: "rate", label: "Rate", minWidth: 170 },
  { id: "confirmed_price", label: "Price Confirmed", minWidth: 170 },
  { id: "shipping_price", label: "Shipping Price", minWidth: 170 },
  { id: "commission", label: "Commission", minWidth: 170 },
  { id: "total_price", label: "Total Price", minWidth: 170 },
  { id: "card", label: "Banking Card", minWidth: 170 },
  { id: "buy_at", label: "Buy At", minWidth: 170 },
  { id: "updated_at", label: "Updated At", minWidth: 170 },
  { id: "created_at", label: "Created At", minWidth: 170 },
];

function BuyForMe() {
  const [checkedDatas, setCheckedDatas] = useState([]);
  const [checkCodes, setCheckCodes] = useState([]);

  const [dialog, setDialog] = useState({
    isOpen: false,
    message: "",
    rejectMessage: false,
    type: "",
  });
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    message: "",
  });

  const data = useSelector((state) => state.OrdersReducer.orders);
  const totalData = useSelector((state) => state.OrdersReducer.total);
  const commissionData = useSelector((state) => state.OrdersReducer.commission);

  const navigate = useNavigate();
  // const data = useSelector((state) => state.Orders.data);
  // const buyOrderData = useSelector((state) => state.BuyOrder);
  // const rejectData = useSelector((state) => state.RejectOrder);
  // const deleteData = useSelector((state) => state.DeleteOrder);
  const orderId = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrgers());
    // console.log(localStorage.getItem("token"));
    !localStorage.getItem("token") && navigate("/login");
  }, [checkedDatas, data]);
  //  const totalPrice = data
  //   .map((item) => {
  //     return item.product.price;
  //   })
  //   .reduce((accumulator, value) => {
  //     return accumulator + value;
  //   }, 0);
  // useMemo(() => {
  //   if (buyOrderData.data.status === 200) {
  //     data.data.map((item) => {
  //       if (item.id === buyOrderData.data.data.data.id) {
  //         item.status = "purchased";
  //       }
  //     });
  //   } else {
  //     if (!!buyOrderData.data?.error) {
  //       setAlert({
  //         success: false,
  //         error: true,
  //         message: buyOrderData.data.error.name,
  //       });
  //       setTimeout(() => {
  //         setAlert({ success: false, error: false, message: "" });
  //       }, 1000);
  //     }
  //   }
  // }, [buyOrderData]);

  // useMemo(() => {
  //   if (rejectData.data.status === 200) {
  //     data.data.map((item) => {
  //       if (item.id === rejectData.data.data.data.id) {
  //         item.status = "reject";
  //       }
  //     });
  //   } else {
  //     if (!!rejectData.data?.error) {
  //       setAlert({
  //         success: false,
  //         error: true,
  //         message: rejectData.data.error.name,
  //       });
  //       setTimeout(() => {
  //         setAlert({ success: false, error: false, message: "" });
  //       }, 1000);
  //     }
  //   }
  // }, [rejectData]);

  // useMemo(() => {
  //   if (deleteData.data.status === 200) {
  //     data.data = data.data.filter(
  //       (item) => item.id !== deleteData.data.data.data.id
  //     );
  //   } else {
  //     if (!!deleteData.data?.error) {
  //       setAlert({
  //         success: false,
  //         error: true,
  //         message: deleteData.data.error.name,
  //       });
  //       setTimeout(() => {
  //         setAlert({ success: false, error: false, message: "" });
  //       }, 1000);
  //     }
  //   }
  // }, [deleteData]);
  const removeItem = (e, id) => {
    e.stopPropagation();
    orderId.current = id;
    setDialog({
      isOpen: true,
      message: "Are you sure you want to delete? 😏",
      rejectMessage: false,
      type: "delete",
    });
  };

  const cancelItem = (e, id) => {
    e.stopPropagation();
    orderId.current = id;
    setDialog({
      isOpen: true,
      message: "Are you sure you want to reject? 😏",
      rejectMessage: true,
      type: "reject",
    });
  };
  const buy = (e, id) => {
    e.stopPropagation();
    orderId.current = id;
    setDialog({
      isOpen: true,
      message: "Buy? 😊",
      rejectMessage: false,
      type: "buy",
    });
  };

  const handleClose = () => {
    setDialog({ ...dialog, isOpen: false, message: "", rejectMessage: false });
  };

  const handleAgree = (passData, type) => {
    setTimeout(() => {
      setDialog({
        ...dialog,
        isOpen: false,
        message: "",
        rejectMessage: false,
      });
    }, 1000);
    // switch (type) {
    //   case "reject":
    //     return dispatch(
    //       rejectOrderAction({ id: orderId.current, data: passData })
    //     );
    //   case "buy":
    //     return dispatch(buyOrderAction(orderId.current));
    //   default:
    //     return dispatch(deleteOrderAction(orderId.current));
    // }
  };
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="buyForMe-wrapper">
        <div className="buyForMe-wrapper-info">
          <p>Total Price: {totalData}</p>
          <p>Commission: {commissionData}</p>
        </div>
        <div></div>
        {alert.success && (
          <div className="alert-wrapper">
            <Alert severity="success">Order edited successfully!</Alert>
          </div>
        )}
        {alert.error && (
          <div className="alert-wrapper">
            <Alert severity="error">{alert.message}!</Alert>
          </div>
        )}
        {dialog.isOpen && (
          <div className="mat-dialog-wrapper">
            <AlertDialog
              open={dialog.isOpen}
              handleClose={handleClose}
              message={dialog.message}
              handleAgree={handleAgree}
              rejectMessage={dialog.rejectMessage}
              type={dialog.type}
            />
          </div>
        )}

        <div className="content-table">
          <BuyForMeTable
            checkCodes={checkCodes}
            setCheckCodes={setCheckCodes}
            checkedDatas={checkedDatas}
            setCheckedDatas={setCheckedDatas}
            tableHeads={tableHeads}
            title={"Orders"}
            rows={data}
            columns={ordersColumns}
            action={{
              updateUrl: "../edit-order/",
              update: "Edit",
              delete: "Delete",
              remove: removeItem,
              cancelName: "Reject",
              cancelItem: cancelItem,
              buyName: "Buy",
              buy: buy,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default BuyForMe;