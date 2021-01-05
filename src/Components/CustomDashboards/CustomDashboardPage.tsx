import * as React from 'react';
import { Paper, Grid, Box, AppBar, Toolbar } from '@material-ui/core';
import DashboardBrowser from './DashboardBrowser';
import DashboardView from './DashboardView';
import { CustomDashboardPageState } from './types/States';
import { dashboardRepository, chartsRepository } from '../Repositories';

const CustomDashboardPage = () => {
    const [state, setState] = React.useState<CustomDashboardPageState>({
        initialLoad:false,
        dashboards: [],
        charts: []
    });
    const {selectedDashboard, initialLoad, dashboards, charts} = state;
    const createNewState = ({selectedDashboard, initialLoad, dashboards, charts} : CustomDashboardPageState) => {
        let newState = {...state};
        newState.initialLoad = initialLoad;
        newState.selectedDashboard = selectedDashboard;
        newState.dashboards = dashboards;
        newState.charts = charts;
        setState(newState);
    }

    const onInitialLoad = async () => {
        // TODO: Get data from DB
        console.log("Fetching Dashboards!");
        let dashboardData = await dashboardRepository.fetchAll();
        console.log(dashboardData);
        createNewState({selectedDashboard: dashboardData[0], initialLoad: true, dashboards: dashboardData, charts: charts});
    }

    if(initialLoad === false){
        onInitialLoad();
    }
    return(
        <div style={{width:"100%", height:"100%"}}>
            <AppBar position="static">
                <Toolbar/>
            </AppBar>
            <Paper style={{width:"100%", height:"100%"}}>
                <Grid container spacing={​​​​​1}​​​​​ style={{height: '100%', width: '100%', backgroundColor: 'transparent'}}>
                    <Grid item xs={4} style={{height:"100%"}}>
                        <DashboardBrowser state={state} createNewState={createNewState}/>
                    </Grid>
                    <Grid item xs={8} style={{height:"100%"}}>
                        <DashboardView state={state} createNewState={createNewState}/>                        
                    </Grid>
                </Grid>
                
            </Paper>
        </div>
        
    )
}

export default CustomDashboardPage;