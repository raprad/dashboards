import * as React from 'react';
import { AddClaimProps } from '../types/Props';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { Claim } from '../types/Claim';
import { AccountCircle } from '@material-ui/icons';
import { claimRepository, userClaimsRepository, roleClaimsRepository } from '../../Repositories';
import { UserClaim } from '../types/UserClaim';

const AddClaimDialog = (props : AddClaimProps) => {

    
    const formik = useFormik<Claim>({
        initialValues: {
            type: "",
            value: ""
        },
        onSubmit: values => {
            // unused
        },
    });

    // closes the dialog
    const handleClose = () => {
        props.onDelete();
    }
    
    // confirms the input, sends it to the backend and then closes the dialog
    const handleConfirm = async() => {
        const claim = await claimRepository.add(formik.values);
        if (props.user){
            const userClaim = await userClaimsRepository.add({claimId: claim.id, userId: props.user});
            console.log(userClaim);
        }
        else if (props.role) {
            const roleClaim = await roleClaimsRepository.add({claimId: claim.id, roleId: props.role});
            console.log(roleClaim);
        }
        else {
            console.log("CRITICAL ERROR: Neither user, nor role was specified.")
        }
        handleClose();
    }

    return (
        <div>
            <Dialog
                open={props.display}
                onClose={handleClose}
            >
                <DialogTitle>{"Add Claim"}</DialogTitle>
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

export default AddClaimDialog;