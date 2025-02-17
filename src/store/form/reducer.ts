import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IndividualClientPayloadDto } from "../../complycube-shared/verification/individual-client-payload.dto.ts";

const initialState: Record<string, IndividualClientPayloadDto> = {}

export const slice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		persistForm: (
			state,
			{ payload: { sessionId, data } }: PayloadAction<{ sessionId: string, data: IndividualClientPayloadDto}>
		) => {
			state[sessionId] = data
		},
		clearForm: (
			state,
			{ payload: { sessionId } }: PayloadAction<{ sessionId: string }>
		) => {
			delete state[sessionId]
		},
	},
})

export const { persistForm, clearForm } = slice.actions

export default slice.reducer

