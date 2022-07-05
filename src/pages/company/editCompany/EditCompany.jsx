import "./EditCompany.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import editRoleAction from "../../../store/actions/roles/editRole";
import { useParams } from "react-router-dom";
import { Button } from "../../../components";
// import editCompaniesAction from "../../../store/actions/companies/editCompanies";

function EditCompany() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  let { id } = useParams();

  const edit = (e) => {
    e.preventDefault();
    setFormData(formData);
    // dispatch(editCompaniesAction(formData, id))
  };

  return (
    <div>
      <div className="worker-wrapper">
        <div className="worker-header">
          <h4>Edit Company</h4>
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
          <div className="save-btn-wrapper" onClick={(e) => edit(e)}>
            <Button
              type={"btn-success"}
              name={"Update"}
              className={"save-btn"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCompany;
