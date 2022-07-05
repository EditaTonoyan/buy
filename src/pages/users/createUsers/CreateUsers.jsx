import './CreateUsers.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Button} from "../../../components";
import {Multiselect} from "multiselect-react-dropdown";
// import createRoleAction from "../../../store/actions/roles/createRole";
// import createUsersAction from "../../../store/actions/users/createUsers";
// import getCompaniesAction from "../../../store/actions/companies";
// import getRolesAction from "../../../store/actions/roles";

function CreateUsers() {
    const [alertData, setAlertData] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        company_id: '',
        password: '',
    })
    const selectedValue = []
    const dispatch = useDispatch()
    const {status = false, data} = useSelector(state => state.CreateUsers)
    const companiesData = useSelector(state => {
        return {data: state.Companies.data};
    });
    const rolesData = useSelector(state => {
        return {data: state.Roles.data};
    });
    const navigate = useNavigate()
    const createUser = (e) => {
        e.preventDefault()
        setFormData(formData)
        // dispatch(createUsersAction(formData))
        setAlertData(true)
    }
    useEffect(() => {
        if (alertData && status) {
            navigate('/users')
        }
    }, [status, alertData])

    useMemo(() => {
        // dispatch(getCompaniesAction())
        // dispatch(getRolesAction())
    }, [])

    // return
    return (
        <>
            {
                // alertData &&
                // <Alert severity={status ? '' : 'error'}>
                //     {status ? '' : data?.error?.name[0]}
                // </Alert>
            }
            <form autoComplete={'off'}>
                <div className="worker-wrapper">
                    <div className="worker-header">
                        <h4>Add New Users</h4>
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" id="first_name" className="form-field first_name input"
                               required onChange={(e) => formData.first_name = e.target.value}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input id="last_name" className="form-field last_name input"
                               required onChange={(e) => formData.last_name = e.target.value}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" className="form-field last_name input"
                               autoComplete={'off'}
                            // value={formData.email}
                               required onChange={(e) => formData.email = e.target.value}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="company" className="form-label">Company</label>
                        {!!companiesData.data.length &&
                        <Multiselect showArrow options={companiesData.data} displayValue="name"
                                     style={{
                                         searchBox: {
                                             border: '1px solid #f0f1f5',
                                             borderRadius: '1.25rem',
                                             padding: '15px'
                                         }
                                     }
                                     }
                        />
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="roles" className="form-label">Roles</label>
                        {!!rolesData.data.length &&
                        <Multiselect showArrow options={rolesData.data} displayValue="name"
                                     style={{
                                         searchBox: {
                                             border: '1px solid #f0f1f5',
                                             borderRadius: '1.25rem',
                                             padding: '15px'
                                         }
                                     }
                                     }
                        />
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={'password'} id="password" className="form-field last_name input"
                               autoComplete={'off'}
                               required onChange={(e) => formData.password = e.target.value}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                        <input type={'password'} id="repeatPassword" className="form-field last_name input"
                               autoComplete={'off'}
                               required/>
                    </div>
                    <div className="form-group">
                        <div className="save-btn-wrapper" onClick={(e) => createUser(e)}>
                            <Button type={'btn-success'} name={'Save'} className={'save-btn'}/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateUsers
