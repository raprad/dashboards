import * as React from 'react';
import { PiletApi } from 'KuhnInspirations.ReactiveProcesses.AppShell';
import { Link } from 'react-router-dom';
import UserManagerPage from './Components/UserManager/UserManagerPage';
import ClaimManagerPage from './Components/ClaimManager/ClaimManagerPage';
import { jwt_decode } from 'jwt-decode';
import { Toolbar } from '@material-ui/core';
import CustomDashboardPage from './Components/CustomDashboards/CustomDashboardPage';
import Test from './Test';

export function setup(app: PiletApi) {
  app.registerExtension('HeaderMenu', (props) => <Toolbar>Test</Toolbar>);
  /**app.showNotification('Hello from Piral!', {
    autoClose: 2000,
  });*/
  app.registerMenu('mainMenu', () => <div><Link to='/userManager'>User Manager</Link><br/><Link to='/claimManager'>Claim Manager</Link><br/><Link to='/permissionManager'>Permission Manager</Link><br/><Link to='/customDashboards'>Custom Dashboards</Link><br/><Link to='/test'>Test</Link></div>)
  app.registerTile(() => <div>Welcome to Piral!</div>, {
    initialColumns: 2,
    initialRows: 1,
  });
  app.registerPage('/userManager',()=><UserManagerPage></UserManagerPage>) // Contains the actual user page + the page header
  app.registerPage('/claimManager', ()=><ClaimManagerPage></ClaimManagerPage>)
  app.registerPage('/customDashboards', () => <CustomDashboardPage></CustomDashboardPage>)
  app.registerPage('/test', () => <Test></Test>)
  //app.registerPage('/permissionManager', ()=><PermissionManagerPage></PermissionManagerPage>)
  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQZXJtaXNzaW9uIjpbIkNhblVzZUVkaXRvciIsIlVzZSBQcm9jZXNzIEluc3BlY3RvciJdLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJkNTkwM2FjNC03NjBjLTQwZTgtYjY5Zi1mMzc0MTk3MGM5ZGYiLCJFbWFpbCI6InRlc3RAbWFpbC5jb20iLCJleHAiOjE2MDI3NTk5MzV9.icnhhzWYFZsl723Yu1-u1LTvj6u7Sq5Cr7aEMQAy9xg'
  app.setData('token', token);
  app.setData('user', jwt_decode(token));
}

