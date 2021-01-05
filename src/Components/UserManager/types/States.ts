import { User } from './User';

export type UserDataTableState = {
    initialLoad?: boolean,
    deleteDisplay?: boolean,
    addDisplay?: boolean,
    editDisplay?: boolean,
    selectedUser?: User,
    users?: User[]
}