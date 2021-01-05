import { Claim } from './Claim';

export type AddClaimProps = {
    user?: string,
    role?: string,
    display: boolean,
    onDelete: () => void
}

export type DeleteClaimProps = {
    user?: string,
    role?: string,
    rowData: Claim,
    display: boolean,
    onDelete: () => void
}

export type EditClaimProps = {
    user?: string,
    role?: string,
    display: boolean,
    rowData: Claim,
    onDelete: () => void
}

export type ClaimDataProps = {
    claimData : Claim
}
