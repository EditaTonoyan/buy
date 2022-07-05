import "./CreateDelivery.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import createRoleAction from "../../../store/actions/roles/createRole";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import createDeliveryAction from "../../../store/actions/delivery/createDelivery";
import { Multiselect } from "multiselect-react-dropdown";

function CreateDelivery() {
  const [alertData, setAlertData] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { status = false, data } = useSelector((state) => state.CreateRoles);
  const navigate = useNavigate();
  const companiesData = useSelector((state) => {
    return { data: state.Companies.data };
  });
  const createRole = (e) => {
    e.preventDefault();
    setFormData(formData);
    // dispatch(createDeliveryAction(formData))
    setAlertData(true);
  };
  useEffect(() => {
    if (alertData && status) {
      navigate("/delivery");
    }
  }, [status, alertData]);
  return (
    <>
      {
        // alertData &&
        // <Alert severity={status ? '' : 'error'}>
        //     {status ? '' : data?.error?.name[0]}
        // </Alert>
      }
      <form>
        <div className="worker-wrapper">
          <div className="worker-header">
            <h4>Add New Shipping Address</h4>
          </div>
          <div className="form-group">
            <label htmlFor="address_first" className="form-label">
              Address 1
            </label>
            <input
              type="text"
              id="address_first"
              className="form-field first_name input"
              required
              onChange={(e) => (formData.address = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address_first" className="form-label">
              Address 2
            </label>
            <input
              type="text"
              id="address_first"
              className="form-field first_name input"
              required
              onChange={(e) => (formData.address2 = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              id="city"
              className="form-field last_name input"
              required
              onChange={(e) => (formData.city = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              id="state"
              className="form-field last_name input"
              required
              onChange={(e) => (formData.state = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip" className="form-label">
              ZIP Code
            </label>
            <input
              type={"number"}
              id="zip"
              className="form-field last_name input"
              required
              onChange={(e) => (formData.zip = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            {!!companiesData.data.length && (
              <Multiselect
                showArrow
                options={companiesData.data}
                displayValue="name"
                style={{
                  searchBox: {
                    border: "1px solid #f0f1f5",
                    borderRadius: "1.25rem",
                    padding: "15px",
                  },
                }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              id="country"
              className="form-field last_name input"
              required
              onChange={(e) => (formData.country = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type={"tel"}
              id="phone"
              className="form-field last_name input"
              required
              onChange={(e) => (formData.phone = e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="save-btn-wrapper">
              <button className="save-btn" onClick={(e) => createRole(e)}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateDelivery;
