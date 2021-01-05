import { Dashboard } from './Dashboard';
import { Chart } from './Chart';

export type CustomDashboardPageState = {
    dashboards?: Dashboard[],
    initialLoad?: boolean,
    selectedDashboard?: Dashboard,
    charts?: Chart[]
}