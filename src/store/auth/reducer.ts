import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SessionResponseDto} from "../../complycube-shared/auth/session-response.dto.ts";
import { authApi } from "./api.ts";
import { jwtDecode } from "jwt-decode";

const initialState: {
	sessionId: string|null
	tokens: Record<string, SessionResponseDto>
} = {
	sessionId: null,
	tokens: {}
}

export const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setSessionId: (
			state,
			{ payload }: PayloadAction<string>
		) => {
			state.sessionId = payload
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.initSession.matchFulfilled, (state, action) => {
			const { sessionId } = jwtDecode<{sessionId: string}>(action.payload.access_token)
			state.sessionId = sessionId
			state.tokens[sessionId] = action.payload
		});
	}
})

export const { setSessionId } = slice.actions

export default slice.reducer

