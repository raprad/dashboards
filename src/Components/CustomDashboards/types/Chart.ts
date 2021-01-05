import { Coords } from './Coords';

export type Chart = {
    id?: string,
    sortId?: number,
    dashboardId?: string,
    type?: string,
    apiKey?: string,
    query?: any,
    pivotConfig?: any,
    dataGrid?: any
}