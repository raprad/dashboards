import * as React from 'React';
import { AppBar, Toolbar } from '@material-ui/core';
import UserDataTable from './UserDataTable';

const UserManagerPage = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar >
                    
                </Toolbar>
            </AppBar>

            <UserDataTable/>
        </div>
    )
}

export default UserManagerPage;