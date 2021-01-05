import * as React from 'react';
import { Box, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { UserDataProps } from '../types/Props';

// This component renders the user preview when creating a new user
const UserPreview = (props: UserDataProps) => {

    return(
        <div>
            <AccountCircle style={{ fontSize: 40 }}></AccountCircle><br/>
            <TextField disabled label="Username" value={props.userData.username}/><br/>
            <TextField disabled label="E-Mail" value={props.userData.email}/><br/>
            <TextField disabled label="Surname" value={props.userData.surname}/><br/>
            <TextField disabled label="Lastname" value={props.userData.lastname}/><br/>
            <TextField disabled label="Phone Number" value={props.userData.phoneNumber}/><br/><br/>
        </div>
    )
}

export default UserPreview;