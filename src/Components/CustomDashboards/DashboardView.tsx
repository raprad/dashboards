import * as React from 'react';
import { DashboardViewProps } from './types/Props';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Paper, Box, Card, CardContent, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { chartsRepository } from '../Repositories';

const ResponsiveGridLayout = WidthProvider(Responsive);
const chartList = [
    {
        id: "xyz",
        sortId: 1,
        dashboardId: "7b64e2df-7015-4b23-8b3f-af2185e149f2",
        type: "pie",
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ0Mjc4NzcsImV4cCI6MTYwNDUxNDI3N30.B5HxRXc9lT4Q2GDw87eYchU2VX7eh-Ls4h09JVc0-Rc",
        query: {
            "measures": [
              "UserClaims.count"
            ],
            "timeDimensions": [],
            "order": {
              "UserClaims.count": "desc"
            },
            "dimensions": [
              "Users.username"
            ],
            "filters": []
        },
        pivotConfig: {
            "x": [
                "Users.username"
            ],
            "y": [
                "measures"
            ],
            "fillMissingDates": true,
            "joinDateRange": false
        },
        dataGrid:{
            x:0, y:0, w:4, h:2
        }
    },
    {
        id: "abc",
        sortId: 2,
        dashboardId: "7b64e2df-7015-4b23-8b3f-af2185e149f2",
        type: "bar",
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ0Mjc4NzcsImV4cCI6MTYwNDUxNDI3N30.B5HxRXc9lT4Q2GDw87eYchU2VX7eh-Ls4h09JVc0-Rc",
        query: {
            "measures": [
              "UserRoles.count"
            ],
            "timeDimensions": [],
            "order": {
              "UserRoles.count": "desc"
            },
            "dimensions": [
              "Roles.name"
            ],
            "filters": []
        },
        pivotConfig: {
            "x": [
              "Roles.name"
            ],
            "y": [
              "measures"
            ],
            "fillMissingDates": true,
            "joinDateRange": false
        },
        dataGrid: {
            x:4, y:0, w:4, h:3
        }
    }
];

const DashboardView = ({ state, createNewState } : DashboardViewProps) => {
    //let chartList = [];
    if (state.selectedDashboard == undefined){
        return(<div>no</div>)
    }
    return(
        <div style={{position:"relative"}}>{console.log(state)}
        <ResponsiveGridLayout
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            style={{margin:"0", padding:"0"}}
        > 
            {   
                chartList.map((chart, index) => {  
                    switch(chart.type){
                        case "pie":
                            return(
                                <div key={chart.sortId} data-grid={chart.dataGrid}>
                                    <Card style={{height:"100%"}}>
                                    <CardHeader
                                        avatar={
                                        <Avatar aria-label="recipe">
                                            R
                                        </Avatar>
                                        }
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVert/>
                                        </IconButton>
                                        }
                                        title={"Dashboard ID: " + chart.dashboardId + "  |  Chart ID: " +  chart.id}
                                        subheader={"Chart Type: " + chart.type}
                                    />
                                        <CardContent style={{height:"100%"}}>
                                            <PieChart query={chart.query} pivotConfig={chart.pivotConfig} apiKey={chart.apiKey}/>   
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        case "bar":
                            return(
                                <div key={chart.sortId} data-grid={chart.dataGrid}>
                                    <Card style={{height:"100%"}}>
                                        <CardHeader
                                            avatar={
                                            <Avatar aria-label="recipe">
                                                R
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton aria-label="settings">
                                                <MoreVert/>
                                            </IconButton>
                                            }
                                            title={"Dashboard ID: " + chart.dashboardId + "  |  Chart ID: " +  chart.id}
                                            subheader={"Chart Type: " + chart.type}
                                        />
                                        <CardContent style={{height:"100%"}}>
                                            <BarChart query={chart.query} pivotConfig={chart.pivotConfig} apiKey={chart.apiKey} />
                                        </CardContent>
                                    </Card>
                                </div>
                                
                            )
                    }
                        
                    }
                    )
            }
        </ResponsiveGridLayout>
        </div>
    )
}

export default DashboardView;