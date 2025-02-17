import { api } from '../api'
import {IndividualClientDto} from "../../complycube-shared/verification/individual-client.dto.ts";
import { IndividualClientPayloadDto } from '../../complycube-shared/verification/individual-client-payload.dto.ts';
import {SessionTokenDto} from "../../complycube-shared/auth/session-token.dto.ts";
import {VerificationStatusDto} from "../../complycube-shared/verification/verification-status.dto.ts";
import {CapturePayloadDto} from "../../complycube-shared/verification/capture-payload.dto.ts";

export const verificationApi = api.injectEndpoints({
	endpoints: builder => ({
		setSessionClient: builder.mutation<IndividualClientDto, IndividualClientPayloadDto>({
			query: (body) => ({
				url: `verification/session`,
				method: 'PUT',
				body
			}),
		}),
		generateSessionToken: builder.mutation<SessionTokenDto, void>({
			query: () => ({
				url: `verification/session/token`,
				method: 'POST'
			}),
		}),
		requestVerification: builder.mutation<VerificationStatusDto[], CapturePayloadDto>({
			query: (body) => ({
				url: `verification/capture`,
				method: 'POST',
				body
			}),
		}),
	}),
})

export const {
	useSetSessionClientMutation,
	useGenerateSessionTokenMutation,
	useRequestVerificationMutation
} = verificationApi
