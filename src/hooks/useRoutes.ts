import React from 'react'
import { Verify } from '../pages/Verify.tsx'
import type { RouteComponentProps } from 'react-router-dom'
import { Login } from "../pages/Login.tsx";
import {Document} from "../pages/Document.tsx";
import {Status} from "../pages/Status.tsx";

export const useRoutes = () => {
	return React.useMemo(() => {
		const routes: { exact?: boolean; path: string; component: React.FC<RouteComponentProps<any>> }[] = [
			{ path: '/verification', component: Verify, exact: true },
			{ path: '/verification/:sessionId', component: Verify, exact: true },
			{ path: '/verification/:sessionId/login', component: Login },
			{ path: '/verification/:sessionId/documents', component: Document },
			{ path: '/verification/:sessionId/status', component: Status },
		]

		const defaultRoute = '/verification'

		return {
			routes,
			defaultRoute,
		}
	}, [])
}
