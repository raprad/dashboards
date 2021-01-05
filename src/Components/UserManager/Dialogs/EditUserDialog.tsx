import * as React from 'react';
import { EditUserProps } from '../types/Props';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { User } from '../types/User';
import { AccountCircle } from '@material-ui/icons';
import { userRepository } from '../../Repositories';

const EditUserDialog = (props : EditUserProps) => {

    var userData = props.rowData;
    // Because the Dialog renders as soon as the page is loaded, there may be no initial data present. By setting everything to an empty string,
    // we can prevent formik from throwing exceptions.
    if (props.rowData == null) userData = { id: "", username: "", surname: "", lastname: "", email: "", phoneNumber: "" }
    
    const formik = useFormik<User>({
        initialValues: {
            id: userData.id,
            username: userData.username,
            password: userData.password,
            surname: userData.surname,
            lastname: userData.lastname,
            email: userData.email,
            phoneNumber: userData.phoneNumber
        },
        onSubmit: values => {
            // unused
        },
    });

    // this is the only way to set "delayed" initial values in formik (like in our case, where the dialog isn't immediately opened when the page is loaded)
    // Formik, for some reason, doesn't allow replacing the initialValues attribute as a whole, so we need to replace every single sub-attribute by hand...
    formik.initialValues.id = userData.id;
    formik.initialValues.username = userData.username;
    formik.initialValues.password = userData.password;
    formik.initialValues.surname = userData.surname;
    formik.initialValues.lastname = userData.lastname;
    formik.initialValues.email = userData.email;
    formik.initialValues.phoneNumber = userData.phoneNumber;

    // closes the dialog
    const handleClose = () => {
        props.onDelete();
    }
    
    // confirms the input, sends it to the backend and then closes the dialog
    const handleConfirm = () => {
        userRepository.update(formik.values);
        handleClose();
    }

    // in this case, we return the form fields right away, because we dont need a stepper in the edit dialog
    return (
        <div>
            <Dialog
                open={props.display}
                onClose={handleClose}
            >
                <DialogTitle>{"Edit User"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <AccountCircle style={{ fontSize: 40 }}></AccountCircle><br/>
                        <TextField required id="username" label="Username" value={formik.values.username} onChange={formik.handleChange}/><br/>
                        <TextField required id="surname" label="Surname" value={formik.values.surname} onChange={formik.handleChange}/><br/>
                        <TextField required id="lastname" label="Lastname" value={formik.values.lastname} onChange={formik.handleChange}/><br/>
                        <TextField required id="email" label="E-Mail" value={formik.values.email} onChange={formik.handleChange}/><br/>
                        <TextField required id="phoneNumber" label="Phone Number" value={formik.values.phoneNumber} onChange={formik.handleChange}/>
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

export default EditUserDialog;