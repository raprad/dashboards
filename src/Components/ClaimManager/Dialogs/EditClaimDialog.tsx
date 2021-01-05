import * as React from 'react';
import { EditClaimProps } from '../types/Props';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { Claim } from '../types/Claim';
import { AccountCircle } from '@material-ui/icons';
import { claimRepository, userClaimsRepository, roleClaimsRepository } from '../../Repositories';

const EditClaimDialog = ({rowData, user, role, onDelete, display} : EditClaimProps) => {

    var claimData = rowData;
    // Because the Dialog renders as soon as the page is loaded, there may be no initial data present. By setting everything to an empty string,
    // we can prevent formik from throwing exceptions.
    if (rowData == null) claimData = { id: "", type: "", value: "" }
    const formik = useFormik<Claim>({
        initialValues: {
            id: claimData.id,
            type: claimData.type,
            value: claimData.value
        },
        onSubmit: values => {
            // unused
        },
    });

    // this is the only way to set "delayed" initial values in formik (like in our case, where the dialog isn't immediately opened when the page is loaded)
    // Formik, for some reason, doesn't allow replacing the initialValues attribute as a whole, so we need to replace every single sub-attribute by hand...
    formik.initialValues.id = claimData.id;
    formik.initialValues.type = claimData.type;
    formik.initialValues.value = claimData.value;

    // closes the dialog
    const handleClose = () => {
        onDelete();
    }
    
    // confirms the input, sends it to the backend and then closes the dialog
    const handleConfirm = async() => {
        console.log(await claimRepository.update(formik.values));
        handleClose();
    }

    // in this case, we return the form fields right away, because we dont need a stepper in the edit dialog
    return (
        <div>
            <Dialog
                open={display}
                onClose={handleClose}
            >
                <DialogTitle>{"Edit Claim"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <AccountCircle style={{ fontSize: 40 }}></AccountCircle><br/>
                        <TextField required id="type" label="Type" value={formik.values.type} onChange={formik.handleChange}/><br/>
                        <TextField required id="value" label="Value" value={formik.values.value} onChange={formik.handleChange}/><br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditClaimDialog;