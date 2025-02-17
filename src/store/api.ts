import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import {RootState} from "./index.ts";

const baseQuery = retry(
	fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const { sessionId, tokens } = (getState() as RootState).auth
			headers.set('Accept', 'application/json')

			if (sessionId) {
				const accessToken = tokens[sessionId]?.access_token
				if (accessToken) {
					headers.set('Authorization', `Bearer ${accessToken}`)
				}
			}

			return headers
		},
	}),
	{ maxRetries: 0 },
)

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQuery,
	endpoints: () => ({}),
	tagTypes: [],
})
