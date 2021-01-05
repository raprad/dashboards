import * as React from 'react';
import { DashboardBrowserProps } from './types/Props';
import {Card, CardContent, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Dashboard} from '@material-ui/icons';

const DashboardBrowser = ({ state, createNewState } : DashboardBrowserProps) => {
    //console.log("Currently selected Dashboard: " + state.selectedDashboard.id);
    if (state.dashboards == undefined){
        state.dashboards = [];
    }

    const onClick = (event, index) => {
        createNewState({initialLoad:state.initialLoad, selectedDashboard:index, dashboards:state.dashboards, charts:state.charts, initialChartLoad: state.initialChartLoad});
    };
    return(
        <List component="nav" aria-label="dashboards">
            {
                state.dashboards.map((dashboard, index) => {
                    return(
                        <ListItem
                            button
                            selected={state.selectedDashboard.id === dashboard.id}
                            onClick={(event) => onClick(event, dashboard)}
                            key={dashboard.id}
                        >
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary={dashboard.title} />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

export default DashboardBrowser;