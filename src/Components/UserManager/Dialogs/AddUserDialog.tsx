import * as React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { AddUserProps } from '../types/Props';
import AddUserStepper from '../Stepper/AddUserStepper';

const AddUserDialog = ({ display, onDelete }: AddUserProps) => {
    // closes the entire dialog
    const handleClose = () => {
        onDelete();
    }
    // returns the dialog itself + the stepper. Everything else is contained within the stepper itself
    return (
        <div>
            <Dialog
                open={display}
                onClose={handleClose}
            >
                <DialogTitle>{"Add User"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <AddUserStepper display={display} onDelete={onDelete}/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddUserDialog;