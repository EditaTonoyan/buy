import './CreateRole.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
// import createRoleAction from "../../../store/actions/roles/createRole";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
// import {Multiselect} from "multiselect-react-dropdown";
import {Button} from "../../../components";

function CreateRole() {
    const [alertData, setAlertData] = useState(false)
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const {status = false, data} = useSelector(state => state.CreateRoles)
    const navigate = useNavigate()
    const createRole = (e) => {
        e.preventDefault()
        setFormData(formData)
        // dispatch(createRoleAction(formData))
        setAlertData(true)
    }
    useEffect(() => {
        if (alertData && status) {
            navigate('/roles')
        }
    }, [status, alertData])
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
                        <h4>Add New Member</h4>
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name" className="form-label">Name</label>
                        <input type="text" id="first_name" className="form-field first_name input"
                               required onChange={(e) => formData.name = e.target.value}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name" className="form-label">Permission</label>
                        {/*<Multiselect*/}
                        {/*    // options={this.state.options} // Options to display in the dropdown*/}
                        {/*    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown*/}
                        {/*    // onSelect={this.onSelect} // Function will trigger on select event*/}
                        {/*    // onRemove={this.onRemove} // Function will trigger on remove event*/}
                        {/*    displayValue="name" // Property name to display in the dropdown options*/}
                        {/*    style={{*/}
                        {/*        searchBox: {*/}
                        {/*            border: '1px solid #34495e',*/}
                        {/*            // 'border-bottom': '1px solid blue',*/}
                        {/*            borderRadius: '1.25rem',*/}
                        {/*            padding: '15px'*/}
                        {/*        }*/}
                        {/*    }*/}
                        {/*    }*/}
                        {/*/>*/}
                    </div>
                    <div className="form-group">
                        <div className="save-btn-wrapper" onClick={(e) => createRole(e)}>
                            <Button type={'btn-success'} name={'Save'} className={'save-btn'}/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateRole
