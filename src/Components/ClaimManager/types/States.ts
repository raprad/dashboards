import { Claim } from './Claim';

export type ClaimDataTableState = {
    initialLoad?: boolean,
    deleteDisplay?: boolean,
    addDisplay?: boolean,
    editDisplay?: boolean,
    selectedClaim?: Claim,
    claims?: Claim[]
}

export type UserClaimState = {
    initialLoad?: boolean,
    userClaims?: Claim[]
}