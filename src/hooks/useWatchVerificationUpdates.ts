import {useEffect} from "react";
import {useAppDispatch, useShallowEqualSelector} from "../store";
import {VerificationStatusDto} from "../complycube-shared/verification/verification-status.dto.ts";
import {updateVerification} from "../store/verification/reducer.ts";
import {EventSource} from "eventsource";

export const useWatchVerificationUpdates = () => {
    const token = useShallowEqualSelector(
        state => {
            const { sessionId, tokens } = state.auth
            if (!sessionId) return
            return tokens[sessionId]?.access_token
        })
    const dispatch = useAppDispatch()

    useEffect(() => {
        let es: EventSource
        if (token) {
            es = new EventSource(`${import.meta.env.VITE_API_BASE_URL}verification/sse`, {
                fetch: (input, init = {}) =>
                    fetch(input, {
                        ...init,
                        headers: {
                            ...(init.headers || {}),
                            Authorization: `Bearer ${token}`,
                        },
                    }),
            })
            es.addEventListener('update', (event: MessageEvent<string>) => {
                dispatch(updateVerification(JSON.parse(event.data) as VerificationStatusDto))
            })
        }

        return () => {
            if (es) {
                es.close()
            }
        }
    }, [token])
}