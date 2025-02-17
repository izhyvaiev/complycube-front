import {VerificationStatusDto} from "../complycube-shared/verification/verification-status.dto.ts";
import {capitalize, CircularProgress} from "@mui/material";
import {VerificationOutcome} from "../complycube-shared/database/verification-outcome.ts";
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function Outcome ({ verification }:{verification: VerificationStatusDto}) {
    if (!verification.isProcessed) {
        return <CircularProgress />
    }
    switch (verification.outcome) {
        case VerificationOutcome.CLEAR:
            return <CheckIcon style={{color:'green'}}/>
        case VerificationOutcome.ATTENTION:
            return <ErrorOutlineIcon style={{color:'red'}} />
        default:
            return capitalize(verification.outcome)
    }
}