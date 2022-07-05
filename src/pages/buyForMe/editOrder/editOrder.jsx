import "./editOrder.scss";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import { Helmet } from "react-helmet";
import {
  editOrders,
  getEditedOrders,
} from "../../../store/actions/ordersAction";

function EditOrder() {
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(null);
  const [isImg, setIsImg] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [alert, setAlert] = useState({ success: false, error: false });
  const [formData, setFormData] = useState({
    price: 0,
    quantity: 0,
    color: " ",
    size: 0,
    confirmed_price: 0,
    shipping_price: 0,
    commission: 0,
    rate: 0,
    card: " ",
    delivery: 1,
    total_price: 0,
    tracking_code: "",
    file: null,
  });

  const data = useSelector((state) => state.OrdersReducer.editedOrders);
  const ordersList = useSelector((state) => state.OrdersReducer.orders);

  const dispatch = useDispatch();

  const totalPrice = useRef();

  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    dispatch(getEditedOrders(id));
  }, [ordersList]);

  useEffect(() => {
    if (data) {
      setFormData({
        price: data?.product?.price | 0,
        quantity: data?.product?.quantity | 0,
        color: data?.product?.color | "",
        size: data?.product?.size | 0,
        confirmed_price: data.confirmed_price | 0,
        shipping_price: data.shipping_price | 0,
        commission: data.commission | 0,
        rate: +data.rate | 1,
        card: +data.card ? data.card : formData.card,
        delivery: 1,
        total_price: data.total_price,
        tracking_code: data.tracking_code,
        file: data.invoice | null,
      });
      // import(`../../../assets/svg/shop/${capitalize(data?.shop_name)}.svg`)
      //   .then((data) => {
      //     setIsImg(true);
      //   })
      //   .catch((e) => {
      //     setIsImg(false);
      //   });
    }
  }, [data]);

  useEffect(() => {
    if (totalPrice.current) {
      if (
        formData?.rate ||
        formData?.confirmed_price ||
        formData?.shipping_price ||
        formData?.commission
      ) {
        totalPrice.current.value =
          (+formData?.shipping_price + +formData?.confirmed_price) *
            +formData?.rate +
          +formData?.commission;
      }

      setEditFormData({
        card: formData.card,
        rate: formData.rate,
        commission: formData.commission,
        confirmed_price: formData.confirmed_price,
        shipping_price: formData.shipping_price,
        total_price: totalPrice.current.value | data?.data.total_price,
        delivery_id: 1,
        tracking_code: formData.tracking_code,
        file: formData.file,
      });
    }
  }, [formData]);

  // useMemo(() => {
  //   if (editOrder.data?.status === 200 && firstCheck) {
  //     setAlert({ success: true, error: false });
  //     setTimeout(() => {
  //       navigate("/order");
  //     }, 1500);
  //   } else {
  //     if (!!editOrder.data?.errors) {
  //       setAlert({ success: false, error: true });
  //       setTimeout(() => {
  //         setAlert({ success: false, error: false });
  //       }, 2000);
  //     }
  //   }
  // }, [editOrder]);

  const back = () => {
    window.history.back();
  };

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const [img, setImg] = useState(null);

  const changeInvoice = (file) => {
    let data = new FormData();
    data.append("invoiceImg", file, "invoice");

    if (!file) {
      setFormData({ ...formData, file: null });
      return;
    }
    setFormData({ ...formData, file: file });

    fileToDataUri(file).then((image) => {
      setImg(image);
    });
  };

  useEffect(() => {
    if (
      formData?.rate ||
      formData?.confirmed_price ||
      formData?.shipping_price ||
      formData?.commission
    ) {
      setPrice(
        (+formData?.shipping_price + +formData?.confirmed_price) *
          +formData?.rate +
          +formData?.commission
      );
    }

    setEditFormData({
      card: formData.card,
      rate: formData.rate,
      commission: formData.commission,
      confirmed_price: formData.confirmed_price,
      shipping_price: formData.shipping_price,
      total_price: price | data?.total_price,
      delivery_id: 1,
      tracking_code: formData.tracking_code,
      file: formData.file,
    });
  }, [formData]);

  const updateOnly = (e) => {
    e.preventDefault();
    // console.log(formData.file);
    // console.log(new Blob([formData.file]));
    const data = new FormData();
    data.append("card", formData.card);
    data.append("rate", formData.rate);
    data.append("commission", formData.commission);
    data.append("confirmed_price", formData.confirmed_price);
    data.append("shipping_price", formData.shipping_price);
    data.append("total_price", formData.total_price);
    data.append("total_price", price | formData.total_price);
    data.append("delivery_id", 1);
    data.append("tracking_code", formData.tracking_code);
    data.append("file", new Blob([formData.file]), {
      type: "application/octet-stream",
    });
    setFirstCheck(true);
    dispatch(editOrders(data, id, "only"));
  };

  const updateWithNotify = (e) => {
    e.preventDefault();
    setFirstCheck(true);
    dispatch(editOrders(editFormData, id, "notify"));
  };

  const capitalize = (word) => {
    return word
      .toLowerCase()
      .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
  };

  return (
    <>
      <Helmet>
        <title>Edit Orders</title>
      </Helmet>
      {error && (
        <div className="editOrder-error-wrapper">
          <Alert severity="error">{error}!</Alert>
        </div>
      )}
      {!!data && (
        <div className={"edit-order-wrapper"}>
          <div className="alert-wrapper">
            {alert.success && (
              <Alert severity="success">Order edited successfully!</Alert>
            )}
            {/* {alert.error && (
              <Alert severity="error">{editOrder.data?.errors?.current}!</Alert>
            )} */}
          </div>
          <div className="edit-order-header">
            <h4 className={"edit-order-title"}>Edit Order</h4>
            <span className="edit-order-subtitle">
              {data.customer_full_name}
            </span>
          </div>
          <div className="edit-order-form-wrapper">
            <div className="edit-form-title-wrapper">
              <div className="shop-img-wrapper">
                {isImg && (
                  <img
                    src={require(`../../../assets/svg/shop/${capitalize(
                      data.shop_name
                    )}.svg`)}
                    alt={data.shop_name}
                  />
                )}
              </div>
              <a
                className="edit-form-title"
                target={"_blank"}
                href={data?.product?.url}
              >
                {data?.product?.name}
              </a>
            </div>
            <form className="edit-order-form">
              {data.status === "purchased" && (
                <div className="order-details-wrapper purchased-details-wrapper">
                  <div className="order-details-header">
                    <h2 className="order-details-title">
                      Purchased Order Details
                    </h2>
                  </div>
                  <div className="order-details-body">
                    <div className="order-details-body-inputs-wrapper purchased-details-body-inputs">
                      <div className="order-details-body-input-wrapper">
                        <label htmlFor="" className="order-details-body-label">
                          Tracking
                        </label>
                        <input
                          type="text"
                          className="order-details-body-input"
                          defaultValue={data.tracking_code}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              tracking_code: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="order-details-body-inputs-wrapper purchased-details-body-inputs">
                      <div className="order-details-body-input-wrapper">
                        <label
                          htmlFor="currency"
                          className="order-details-body-label currency-label"
                        >
                          Currency
                          <select
                            name="currency"
                            id="currencySelect"
                            className={
                              "order-details-body-input currency-select"
                            }
                            defaultValue={data.currency}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                currency: e.target.value,
                              });
                            }}
                          >
                            <option value="$">$</option>
                          </select>
                        </label>
                        <input
                          id="currency"
                          type="text"
                          className="order-details-body-input"
                          placeholder="Price from invoice"
                        />
                      </div>
                    </div>
                    <div className="order-details-body-inputs-wrapper purchased-details-body-inputs">
                      <div className="order-details-body-input-wrapper">
                        <label
                          htmlFor="invoice"
                          className="order-details-body-label"
                        >
                          Invoice
                          <span className="invoice-choose">Choose file</span>
                          {img || data.invoice ? (
                            <img
                              src={img || data.invoice}
                              alt="Invoice"
                              className="invoice-img"
                            />
                          ) : null}
                        </label>
                        <input
                          id="invoice"
                          type="file"
                          className="order-details-body-input invoice"
                          onChange={(e) =>
                            changeInvoice(e.target.files[0] || null)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="order-details-wrapper">
                <div className="order-details-header">
                  <h2 className="order-details-title">Order Details</h2>
                </div>
                <div className="order-details-body">
                  <div className="order-details-body-inputs-wrapper">
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Price
                      </label>
                      <input
                        type="text"
                        className="order-details-body-input"
                        defaultValue={data?.product?.price}
                        disabled
                      />
                    </div>
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Color
                      </label>
                      <input
                        type="text"
                        className="order-details-body-input"
                        defaultValue={data?.product?.color}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="order-details-body-inputs-wrapper">
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Quantity
                      </label>
                      <input
                        type="text"
                        className="order-details-body-input"
                        defaultValue={data?.product?.quantity}
                        disabled
                      />
                    </div>
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Warehouse
                      </label>
                      <div className="country-img-wrapper">
                        <div className="country-img">
                          <img
                            src={
                              data?.delivery?.country.toLowerCase() &&
                              require(`../../../assets/svg/flags/${data?.delivery?.country.toLowerCase()}.svg`)
                            }
                            alt=""
                          />
                        </div>
                        <div className="country-img">
                          <img
                            src={require(`../../../assets/images/icons/airplanes.png`)}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-details-body-inputs-wrapper">
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Size
                      </label>
                      <input
                        type="text"
                        className="order-details-body-input"
                        defaultValue={data?.product?.size}
                        disabled
                      />
                    </div>
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Comment
                      </label>
                      <p>{data.comment ? data?.comment : "—"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-details-wrapper">
                <div className="order-details-header">
                  <h2 className="order-details-title">Cost and Shipping</h2>
                </div>
                <div className="order-details-body">
                  <div className="order-details-body-inputs-wrapper">
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Currency
                      </label>
                      <input
                        type="text"
                        className="order-details-body-input"
                        value={"$"}
                        disabled
                      />
                    </div>
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Rate
                      </label>
                      <input
                        type="number"
                        className="order-details-body-input"
                        defaultValue={+data?.rate ? +data?.rate : null}
                        placeholder={+data?.rate ? null : 0}
                        onChange={(e) => {
                          setFormData({ ...formData, rate: +e.target.value });
                        }}
                      />
                    </div>
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Bank card
                      </label>
                      <select
                        name="card"
                        id="card"
                        className={"order-details-body-input"}
                        defaultValue={data.card}
                        onChange={(e) => {
                          setFormData({ ...formData, card: e.target.value });
                        }}
                      >
                        <option value="armenian">Armenian</option>
                        <option value="american">American</option>
                        <option value="russian">Russian</option>
                      </select>
                    </div>
                  </div>
                  <div className="order-details-body-inputs-wrapper">
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Price Confirmed
                      </label>
                      <input
                        type="number"
                        className="order-details-body-input"
                        defaultValue={
                          +data?.confirmed_price ? +data?.confirmed_price : null
                        }
                        placeholder={+data?.confirmed_price ? null : 0}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            confirmed_price: +e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Shipping Price
                      </label>
                      <input
                        type="number"
                        className="order-details-body-input"
                        defaultValue={
                          +data?.shipping_price ? +data?.shipping_price : null
                        }
                        placeholder={+data?.shipping_price ? null : 0}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            shipping_price: +e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Commission (֏)
                      </label>
                      <input
                        type="number"
                        className="order-details-body-input"
                        defaultValue={
                          +data.commission ? +data?.commission : null
                        }
                        placeholder={+data?.commission ? null : 0}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            commission: +e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Price Total (֏)
                      </label>
                      <input
                        type="number"
                        className="order-details-body-input"
                        placeholder={+data?.total_price ? null : 0}
                        defaultValue={price}
                      />
                    </div>
                  </div>
                  <div className="order-details-body-inputs-wrapper">
                    <div className="order-details-body-input-wrapper">
                      <label htmlFor="" className="order-details-body-label">
                        Admin comment
                      </label>
                      <textarea
                        cols={70}
                        rows={6}
                        className="order-details-body-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="edit-order-form-btn-wrapper">
                <button
                  className={"edit-order-form-btn update-only"}
                  onClick={updateOnly}
                >
                  Update only
                </button>
                {data.status !== "purchased" && (
                  <button
                    className={"edit-order-form-btn notify"}
                    onClick={updateWithNotify}
                  >
                    Update and Notify user
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditOrder;
