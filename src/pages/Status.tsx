import type { RouteComponentProps } from 'react-router-dom'
import useLogin from "../hooks/useLogin.ts";
import {useShallowEqualSelector} from "../store";

import {Grid2 as Grid, capitalize} from "@mui/material";
import {useWatchVerificationUpdates} from "../hooks/useWatchVerificationUpdates.ts";
import {Outcome} from "../components/Outcome.tsx";

export function Status({
	match: {
		params: { sessionId },
	},
}: RouteComponentProps<{ sessionId: string }>) {
	useLogin(sessionId, true)
	useWatchVerificationUpdates()
	const verifications = useShallowEqualSelector(
		(state) => sessionId
			? Object.values(state.verification.verifications[sessionId] || {})
			: []
	)

	return  <>
		<Grid container spacing={2}>
			{verifications.map(verification => (
				<Grid
					key={verification.id}
					size={12}
					style={{ border: '1px black solid' }}
					container
					alignItems={"center"}
					justifyContent={"center"}
				>
					<div>{verification.type.split('_').map(capitalize).join(' ')} - </div>
					<div><Outcome verification={verification}/></div>
				</Grid>
			))}
		</Grid>
	</>
}
