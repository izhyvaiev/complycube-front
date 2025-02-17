import {useEffect} from "react";
import {RootState, useShallowEqualSelector} from "../store";
import { useHistory } from 'react-router'
import isUndefined from 'lodash/isUndefined'
import {useSelector} from "react-redux";
import {setSessionId} from "../store/auth/reducer.ts";

export default function useLogin(sessionId?: string, isStatusPage=false) {
    const history = useHistory()
    const reduxSessionId = useSelector((state: RootState) => state.auth.sessionId)
    const sessionExpiresAt = useShallowEqualSelector(
        (state: RootState) => {
            return sessionId ? state.auth.tokens[sessionId]?.refresh_token_expires_at: null
        }
    )
    const documentsLength = useShallowEqualSelector(
        (state: RootState) => {
            return sessionId ? Object.keys(state.verification.verifications[sessionId] || {}).length : 0
        }
    )
    useEffect(() => {
        if (!isStatusPage && documentsLength > 0) {
            history.push(`/verification/${sessionId}/status`)
        }
    }, [isStatusPage, documentsLength]);
    useEffect(() => {
        if (sessionId && reduxSessionId !== sessionId) {
            setSessionId(sessionId)
        }
    }, [reduxSessionId, sessionId])

    useEffect(() => {
        if (sessionId && (isUndefined(sessionExpiresAt) || new Date(sessionExpiresAt as string) < new Date())) {
            history.push(`/verification/${sessionId}/login`)
        }
    }, [sessionExpiresAt, sessionId, sessionId]);
}