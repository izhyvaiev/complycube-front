import type { RouteComponentProps } from 'react-router-dom'
import useLogin from "../hooks/useLogin.ts";
import {useGenerateSessionTokenMutation} from "../store/verification/api.ts";
import {useShallowEqualSelector} from "../store";
import {useEffect} from "react";
import {useComplyCubeSDK} from "../hooks/useComplyCubeSDK.ts";

const containerId = "complycube-container";

export function Document({
	match: {
		params: { sessionId },
	},
}: RouteComponentProps<{ sessionId: string }>) {
	useLogin(sessionId)
	const sessionToken = useShallowEqualSelector((state) => sessionId ? state.verification.tokens[sessionId] : undefined)
	const [generateSessionToken] = useGenerateSessionTokenMutation()
	useEffect(() => {
		if (!sessionToken) {
			generateSessionToken()
		}
	}, [sessionToken]);

	useComplyCubeSDK(containerId, sessionToken)

	return <div id={containerId}></div>
}
