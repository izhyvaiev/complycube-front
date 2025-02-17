import type { RouteComponentProps } from 'react-router-dom'
import {TextField} from "formik-mui";
import {Field, Form, Formik} from "formik";
import {Button, Grid2} from "@mui/material";

export function Login({
	match: {
		params: { sessionId },
	},
}: RouteComponentProps<{ sessionId: string }>) {
	return (
		<Grid2 container direction="column" spacing={2}>
			<div>Please provide email linked to this session to restore it</div>
			<Formik
				initialValues={{sessionId, email:''}}
				validate={() => {}}
				onSubmit={console.log}
				validateOnChange
				isInitialValid={false}
			>
				<Form>
					<Grid2 container direction="column" spacing={2}>
						<Field
							component={TextField}
							name="email"
							type="email"
							label="Email"
							required
							fullWidth
						/>
						<Button type="submit" variant="contained">Restore</Button>
					</Grid2>
				</Form>
			</Formik>
		</Grid2>
	)
}
