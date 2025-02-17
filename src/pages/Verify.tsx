import { useEffect } from 'react'
import type { RouteComponentProps } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useInitSessionMutation } from '../store/auth/api'
import {jwtDecode} from "jwt-decode";
import {PersonForm} from "../components/PersonForm.tsx";
import useLogin from "../hooks/useLogin.ts";

export function Verify({
	match: {
		params: { sessionId },
	},
}: RouteComponentProps<{ sessionId?: string }>) {
	const history = useHistory()
	const [initSession] = useInitSessionMutation()
	useLogin(sessionId)
	useEffect(() => {
		if (!sessionId) {
			initSession().unwrap().then(data => {
				const { sessionId } = jwtDecode<{sessionId: string}>(data.access_token)
				history.push(`/verification/${sessionId}`)
			})
		}
	}, [sessionId])
	return <><PersonForm/></>
}
