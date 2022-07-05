import './EditRole.scss'
import {useDispatch} from "react-redux";
import {useState} from "react";
// import editRoleAction from "../../../store/actions/roles/editRole";
import {useParams} from "react-router-dom";

function EditRole() {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch();
    let {id} = useParams()

    const edit = (e) => {
        e.preventDefault()
        // dispatch(editRoleAction(formData, id))
    }

    return (
        <div>
            <div className="worker-wrapper">
                <div className="worker-header">
                    <h4>Edit Member</h4>
                </div>
                <div className="form-group">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" id="first_name" className="form-field first_name input" required onChange={(e) => formData.name = e.target.value}/>
                </div>
                <div className="form-group">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input id="last_name" className="form-field last_name input" required/>
                </div>
                <div className="form-group">
                    <div className="save-btn-wrapper">
                        <button className="save-btn" onClick={(e) => edit(e)}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditRole
