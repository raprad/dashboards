import * as React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { Icons } from 'material-table';
import { Person, Add, AddBox, Check, Clear, Delete, DeleteOutline, ChevronRight, Edit, SaveAlt, FilterList, FirstPage, LastPage, ChevronLeft, ArrowUpward, Remove, ViewColumn, Search } from '@material-ui/icons';
import DeleteClaimDialog from './Dialogs/DeleteClaimDialog';
import AddClaimDialog from './Dialogs/AddClaimDialog';
import EditClaimDialog from './Dialogs/EditClaimDialog';
import { Claim } from './types/Claim';
import { claimRepository, userClaimsRepository, roleClaimsRepository } from '../Repositories';
import { ClaimDataTableState } from './types/States';

const mode = "user"; // either role or user
const user = "ff92e46c-8049-4172-93d3-44a6fa58d0a0"; // = userId
const role = null; // = roleId

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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    User: forwardRef((props, ref) => <User {...props} ref={ref] />)
}


const UserDataTable = () => {

    // initialLoad makes sure that the tableData is only requested when the table is initially loaded
    const [state, setState] = React.useState<ClaimDataTableState>({
        initialLoad:false
    });

    const {initialLoad, deleteDisplay, addDisplay, editDisplay, selectedClaim, claims} = state;

    const onInitialLoad = async () => {
        let userClaims = [];
        if (mode == "user"){
            const all = await userClaimsRepository.fetchAll();
            const allClaims = await claimRepository.fetchAll();
            all.forEach((userClaim) => {
                if (userClaim.userId == user){
                    console.log(userClaim.claimId);
                    allClaims.forEach((claim) => {
                        if (claim.id == userClaim.claimId){
                            userClaims.push(claim);
                        }
                    });
                }
            });
            console.log(userClaims);
        }
        else if (mode == "role") {
            const all = await roleClaimsRepository.fetchAll();
            console.log(all);
            const allClaims = await claimRepository.fetchAll();
            all.forEach((roleClaim) => {
                console.log(roleClaim.roleId)
                if (roleClaim.roleId == role){
                    allClaims.forEach((role) => {
                        if (role.id == roleClaim.claimId){
                            userClaims.push(role);
                        }
                    });
                }
            });
        }
        else {
            console.log("CRITICAL ERROR: Neither role nor user specified!")
        }
        createNewState(true, false, false, false, null, userClaims);
    }

    // Function for creating a new state without having to type it out every single time
    const createNewState = (initialLoad:boolean, deleteDisplay:boolean, addDisplay:boolean, editDisplay:boolean, selectedClaim:Claim, claims:Claim[]) => {
        let newState = { ...state };
        newState.initialLoad = initialLoad;
        newState.deleteDisplay = deleteDisplay;
        newState.addDisplay = addDisplay;
        newState.editDisplay = editDisplay;
        newState.selectedClaim = selectedClaim;
        newState.claims = claims;
        setState(newState);
    }
    
    // This function is called whenever the Delete Dialog is closed
    const onDelete = () => {
        createNewState(initialLoad, false, addDisplay, editDisplay, selectedClaim, claims);
    }

    // This function is called whenever the Add Dialog is closed
    const onAdd = () => {
        createNewState(initialLoad, deleteDisplay, false, editDisplay, selectedClaim, claims);
    }

    // This function is called whenever the Edit Dialog is closed
    const onEdit = () => {
        createNewState(initialLoad, deleteDisplay, addDisplay, false, selectedClaim, claims);
    }

    if (initialLoad === false) {
        onInitialLoad();
    }

    return(
        <div>
            <MaterialTable
                title={"Claim Table - Mode: " + mode}
                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Edit Claim',
                        onClick: (event, rowData : Claim) => {
                            // Opens the edit dialog and updates the selected user
                            createNewState(initialLoad, deleteDisplay, addDisplay, true, rowData, claims);
                        }
                    },
                    {
                        icon: Delete,
                        tooltip: 'Delete Claim',
                        onClick: (event, rowData : Claim) => {
                            // Opens the delete dialog and updates the selected user
                            createNewState(initialLoad, true, addDisplay, editDisplay, rowData, claims);
                        }
                    },
                    {
                        icon: Add,
                        tooltip: 'Add Claim',
                        isFreeAction: true,
                        onClick: (event, rowData : Claim) => {
                            // Opens the delete dialog and sets the selected user to null
                            // (You could possibly implement a copy feature by passing an existing user to the add dialog)
                            createNewState(initialLoad, deleteDisplay, true, editDisplay, rowData, claims);
                        }
                    }
                ]}
                columns={[
                    { title: 'Type', field: 'type' },
                    { title: 'Value', field: 'value' },
                ]}
                data={claims}
                icons={tableIcons}
                options={{
                    actionsColumnIndex: -1
                }}
            />
            <DeleteClaimDialog role={role} user={user} rowData={selectedClaim} display={deleteDisplay} onDelete={onDelete}/>
            <AddClaimDialog role={role} user={user} display={addDisplay} onDelete={onAdd}/>
            <EditClaimDialog role={role} user={user} rowData={selectedClaim} display={editDisplay} onDelete={onEdit}/>
        </div>
    )
}

export default UserDataTable;