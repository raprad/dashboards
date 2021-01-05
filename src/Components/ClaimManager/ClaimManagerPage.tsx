import * as React from 'React';
import { AppBar, Toolbar } from '@material-ui/core';
import ClaimDataTable from './ClaimDataTable';

const UserManagerPage = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar >
                    
                </Toolbar>
            </AppBar>

            <ClaimDataTable/>
        </div>
    )
}

export default UserManagerPage;