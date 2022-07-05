import "./CreateCompany.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import createRoleAction from "../../../store/actions/roles/createRole";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
// import createCompaniesAction from "../../../store/actions/companies/createCompanies";

function CreateCompany() {
  const [alertData, setAlertData] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    prefix_url: "",
    key: "$10$EbqsQ/etQWUHiaJackTx0OaE6qjIROALccaQdznh3HpF5gp0Cxs26",
    secret: "$10$EbqsQ/etQWUHiaJackTx0OaE6qjIROALccaQdznh3HpF5gp0Cxs26",
  });
  const dispatch = useDispatch();
  const { status = false, data } = useSelector((state) => state.CreateRoles);
  const navigate = useNavigate();
  const createCompany = (e) => {
    e.preventDefault();
    setFormData(formData);
    // console.log(formData);
    // dispatch(createCompaniesAction(formData))
    setAlertData(true);
  };
  useEffect(() => {
    if (alertData && status) {
      navigate("/company");
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
            <h4>Add New Company</h4>
          </div>
          <div className="form-group">
            <label htmlFor="first_name" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              id="first_name"
              className="form-field first_name input"
              required
              onChange={(e) => (formData.name = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="form-label">
              Prefix
            </label>
            <input
              id="last_name"
              className="form-field last_name input"
              required
              onChange={(e) => (formData.prefix_url = e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="save-btn-wrapper" onClick={(e) => createCompany(e)}>
              <Button
                type={"btn-success"}
                name={"Save"}
                className={"save-btn"}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateCompany;
