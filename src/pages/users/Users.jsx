import {BuyForMeTable} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
// import getUsersAction from "../../store/actions/users";
// import deleteUsersAction from "../../store/actions/users/deleteUsers";

const ordersColumns = [
    {id: 'first_name', label: 'First Name', minWidth: 170},
    {id: 'last_name', label: 'Last Name', minWidth: 170},
    {id: 'email', label: 'Email', minWidth: 170},
    {id: 'role', insertId: 'name' ,label: 'Role', minWidth: 170},
    // {id: 'company', label: 'Company', minWidth: 170},
];

function Users() {
    const dispatch = useDispatch()
    const [removeItemId, setRemoveItemId] = useState(null)
    const {data} = useSelector(state => {
        return {data: state.Users.data};
    });
    const [rolesList, setRolesList] = useState(null)
    const deletedData = useSelector(state => state.DeleteUsers.data);


    useEffect(() => {
        // dispatch(getUsersAction())
    }, [])

    const removeItem = (id) => {
        // dispatch(deleteUsersAction(id))
    }

    useEffect(() => {
        if(deletedData?.status === 200) {
            setRemoveItemId(deletedData.data)
            data.filter(item => item.id !== deletedData.data.id)
        }
    }, [deletedData])

    return (
            <div className="roles-wrapper">
                <BuyForMeTable title={'Users'} rows={data} columns={ordersColumns} action={{updateUrl: '../edit-users/', update: 'Edit', delete: 'Delete', remove: removeItem, addUrl: '../create-users', addLinkName: 'Add Users'}} />
            </div>
    )
}

export default Users
