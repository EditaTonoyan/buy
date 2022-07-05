import {BuyForMeTable} from "../../components";
import {useDispatch, useSelector} from "react-redux";
// import getRolesAction from "../../store/actions/roles";
// import deleteRoleAction from "../../store/actions/roles/deleteRole";
import {useEffect, useMemo, useState} from "react";

const ordersColumns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'created_at', label: 'Created at', minWidth: 170},
    {id: 'permissions', label: 'Permissions', minWidth: 170},
];

function Roles() {
    const dispatch = useDispatch()
    const [removeItemId, setRemoveItemId] = useState(null)
    let {data} = useSelector(state => {
        return {data: state.Roles.data};
    });
    const [rolesList, setRolesList] = useState(null)
    const deletedData = useSelector(state => state.DeleteRoles.data);


    useEffect(() => {
        // dispatch(getRolesAction())
    }, [deletedData])

    // useMemo(() => {
    //     data = data.filter(item => item.id !== deletedData?.data?.data?.id)
    //     console.log(data);
    //     console.log(deletedData);
    // }, [deletedData]);

    const removeItem = (id) => {
        // dispatch(deleteRoleAction(id))
    }
    //
    // useEffect(() => {
    //     if(deletedData?.status === 200) {
    //         setRemoveItemId(deletedData.data)
    //         data.filter(item => item.id !== deletedData.data.id)
    //     }
    // }, [deletedData])

    return (
        !!data.length &&
            <div className="roles-wrapper">
                <BuyForMeTable title={'Roles'} rows={data} columns={ordersColumns} action={{updateUrl: '../edit-role/', update: 'Edit', delete: 'Delete', remove: removeItem, addUrl: '../create-role/', addLinkName: 'Add Role'}} />
            </div>
    )
}

export default Roles
