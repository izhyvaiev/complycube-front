import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IndividualClientDto } from "../../complycube-shared/verification/individual-client.dto.ts";
import {verificationApi} from "./api.ts";
import {VerificationStatusDto} from "../../complycube-shared/verification/verification-status.dto.ts";
import isUndefined from "lodash/isUndefined";

const initialState: {
	clients: Record<string, IndividualClientDto>,
	tokens: Record<string, string>,
	verifications: Record<string, Record<number, VerificationStatusDto>>,
} = {
	clients: {},
	tokens: {},
	verifications: {},
}

export const slice = createSlice({
	name: 'verification',
	initialState,
	reducers: {
		updateVerification: (
			state,
			{ payload }: PayloadAction<VerificationStatusDto>
		) => {
			if (isUndefined(state.verifications[payload.sessionId])) {
				state.verifications[payload.sessionId] = {}
			}
			state.verifications[payload.sessionId][payload.id] = payload
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(verificationApi.endpoints.setSessionClient.matchFulfilled, (state, { payload }) => {
			state.clients[payload.sessionId] = payload
		});
		builder.addMatcher(verificationApi.endpoints.generateSessionToken.matchFulfilled, (state, { payload }) => {
			state.tokens[payload.sessionId] = payload.token
		});
		builder.addMatcher(verificationApi.endpoints.requestVerification.matchFulfilled, (state, { payload }) => {
			payload.forEach(value => {
				if (isUndefined(state.verifications[value.sessionId])) {
					state.verifications[value.sessionId] = {}
				}
				state.verifications[value.sessionId][value.id] = value
			})
		});

	}
})

export const { updateVerification } = slice.actions

export default slice.reducer

