import * as React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { Icons } from 'material-table';
import { Add, AddBox, Check, Clear, Delete, DeleteOutline, ChevronRight, Edit, SaveAlt, FilterList, FirstPage, LastPage, ChevronLeft, ArrowUpward, Remove, ViewColumn, Search } from '@material-ui/icons';
import DeleteUserDialog from './Dialogs/DeleteUserDialog';
import AddUserDialog from './Dialogs/AddUserDialog';
import EditUserDialog from './Dialogs/EditUserDialog';
import { User } from './types/User';
import { userRepository } from '../Repositories';
import { UserDataTableState } from './types/States';

// Custom table icons
const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}


const UserDataTable = () => {

    // initialLoad makes sure that the tableData is only requested when the table is initially loaded
    const [state, setState] = React.useState<UserDataTableState>({
        initialLoad:false
    });

    const {initialLoad, deleteDisplay, addDisplay, editDisplay, selectedUser, users} = state;

    const onInitialLoad = async () => {
        const all = await userRepository.fetchAll();
        createNewState(true, false, false, false, null, all);
    }

    // Function for creating a new state without having to type it out every single time
    const createNewState = (initialLoad:boolean, deleteDisplay:boolean, addDisplay:boolean, editDisplay:boolean, selectedUser:User, users:User[]) => {
        let newState = { ...state };
        newState.initialLoad = initialLoad;
        newState.deleteDisplay = deleteDisplay;
        newState.addDisplay = addDisplay;
        newState.editDisplay = editDisplay;
        newState.selectedUser = selectedUser;
        newState.users = users;
        setState(newState);
    }
    
    // This function is called whenever the Delete Dialog is closed
    const onDelete = () => {
        createNewState(initialLoad, false, addDisplay, editDisplay, selectedUser, users);
    }

    // This function is called whenever the Add Dialog is closed
    const onAdd = () => {
        createNewState(initialLoad, deleteDisplay, false, editDisplay, selectedUser, users);
    }

    // This function is called whenever the Edit Dialog is closed
    const onEdit = () => {
        createNewState(initialLoad, deleteDisplay, addDisplay, false, selectedUser, users);
    }

    if (initialLoad === false) {
        onInitialLoad();
    }

    return(
        <div>
            <MaterialTable
                title="User Table"
                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Edit User',
                        onClick: (event, rowData : User) => {
                            // Opens the edit dialog and updates the selected user
                            createNewState(initialLoad, deleteDisplay, addDisplay, true, rowData, users);
                        }
                    },
                    {
                        icon: Delete,
                        tooltip: 'Delete User',
                        onClick: (event, rowData : User) => {
                            // Opens the delete dialog and updates the selected user
                            createNewState(initialLoad, true, addDisplay, editDisplay, rowData, users);
                        }
                    },
                    {
                        icon: Add,
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event, rowData : User) => {
                            // Opens the delete dialog and sets the selected user to null
                            // (You could possibly implement a copy feature by passing an existing user to the add dialog)
                            createNewState(initialLoad, deleteDisplay, true, editDisplay, rowData, users);
                        }
                    }
                ]}
                columns={[
                    { title: 'Username', field: 'username' },
                    { title: 'E-Mail', field: 'email' },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Lastname', field: 'lastname' },
                    { title: 'Phone Number', field: 'phoneNumber' }
                ]}
                data={users}
                icons={tableIcons}
                options={{
                    actionsColumnIndex: -1
                }}
            />
            <DeleteUserDialog rowData={selectedUser} display={deleteDisplay} onDelete={onDelete}/>
            <AddUserDialog display={addDisplay} onDelete={onAdd}/>
            <EditUserDialog rowData={selectedUser} display={editDisplay} onDelete={onEdit}/>
        </div>
    )
}

export default UserDataTable;