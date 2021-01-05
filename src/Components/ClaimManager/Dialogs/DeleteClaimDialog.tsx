import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { DeleteClaimProps } from '../types/Props';
import { userClaimsRepository } from '../../Repositories';

const DeleteClaimDialog = ({ rowData, display, onDelete, user, role }: DeleteClaimProps) => {
    
    // Because the Dialog renders as soon as the page is loaded, there may be no initial data present. By setting everything to an empty string,
    // we can prevent formik from throwing exceptions.
    if (rowData == null) rowData = { type: "", value: "" }

    // Closes the dialog
    const handleClose = () => {
        onDelete();
    }

    // sends delete request to the backend (doesnt work yet) and closes the dialog
    const handleConfirm = async () => {
        if (user){
            console.log(await userClaimsRepository.delete(user));
        }
        else if (role){
            console.log(await userClaimsRepository.delete(role));
        }
        else {
            console.log("CRITICAL ERROR: Neither user nor role was specified");
        }
        //console.log(await claimRepository.delete(rowData.id));
        handleClose();
    }

    // returns a confirmation dialog, to make sure the user doesnt accidentally delete a user he doesnt want to delete
    return (
        <div>
            <Dialog
                open={display}
                onClose={handleClose}
                maxWidth={"lg"}
            >
                <DialogTitle>{"Delete Claim"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure that you want to delete the claim <span style={{fontWeight:'bold'}}>{rowData.type + " : " + rowData.value}</span>? <br/> 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleConfirm()} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteClaimDialog;