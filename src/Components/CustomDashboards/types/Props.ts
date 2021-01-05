import { CustomDashboardPageState } from './States'

export type DashboardBrowserProps = {
   state: CustomDashboardPageState,
   createNewState: ({initialLoad, selectedDashboard} : CustomDashboardPageState) => void
}

export type DashboardViewProps = {
    state: CustomDashboardPageState,
    createNewState: ({initialLoad, selectedDashboard} : CustomDashboardPageState) => void
}

export type ChartProps = {
    query: any,
    pivotConfig: any,
    apiKey: string
}