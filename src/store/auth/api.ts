import type { SessionResponseDto } from '../../complycube-shared/auth/session-response.dto'
import { api } from '../api'

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		initSession: builder.mutation<SessionResponseDto, void>({
			query: () => ({
				url: `auth/session`,
				method: 'POST',
			}),
		}),
	}),
})

export const { useInitSessionMutation } = authApi
