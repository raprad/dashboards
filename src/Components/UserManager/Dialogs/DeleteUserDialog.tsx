import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { DeleteUserProps } from '../types/Props';
import { userRepository } from '../../Repositories';

const DeleteUserDialog = ({ rowData, display, onDelete }: DeleteUserProps) => {
    
    // Because the Dialog renders as soon as the page is loaded, there may be no initial data present. By setting everything to an empty string,
    // we can prevent formik from throwing exceptions.
    if (rowData == null) rowData = { username:"", surname:"", lastname:"", email:"", phoneNumber:"" }

    // Closes the dialog
    const handleClose = () => {
        onDelete();
    }

    // sends delete request to the backend (doesnt work yet) and closes the dialog
    const handleConfirm = async () => {
        console.log(await userRepository.delete(rowData.id));
        handleClose();
    }

    // returns a confirmation dialog, to make sure the user doesnt accidentally delete a user he doesnt want to delete
    return (
        <div>
            <Dialog
                open={display}
                onClose={handleClose}
            >
                <DialogTitle>{"Delete User"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure that you want to delete the user <span style={{fontWeight:'bold'}}>{rowData.username}</span>? <br/> 
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

export default DeleteUserDialog;