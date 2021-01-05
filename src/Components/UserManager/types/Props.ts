import { User } from './User';

export type AddUserProps = {
    display: boolean,
    onDelete: () => void
}

export type DeleteUserProps = {
    rowData: User,
    display: boolean,
    onDelete: () => void
}

export type EditUserProps = {
    display: boolean,
    rowData: User,
    onDelete: () => void
}

export type UserDataProps = {
    userData : User
}