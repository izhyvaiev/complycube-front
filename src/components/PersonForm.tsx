import { Form, Formik, Field } from "formik";
import {IndividualClientPayloadDto} from "../complycube-shared/verification/individual-client-payload.dto.ts";
import {plainToInstance} from "class-transformer";
import {PersonGender} from "../complycube-shared/database/person-gender.ts";
import {RootState, useAppDispatch, useShallowEqualSelector} from "../store";
import {validate} from "class-validator";
import {Autocomplete, AutocompleteRenderInputParams, Select, TextField} from 'formik-mui';
import {Button, capitalize, FormControl, Grid2 as Grid, MenuItem, TextField as MuiTextField} from "@mui/material";
import {Countries} from "../complycube-shared/generic/countries.ts";
import {DatePicker} from "formik-mui-x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Depending on the library you picked
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'
import {useCallback, useMemo} from "react";
import {nullValues} from "../helpers.ts";
import {persistForm} from "../store/form/reducer.ts";
import {useSetSessionClientMutation} from "../store/verification/api.ts";
import {useHistory} from "react-router";

type InitialValues = Omit<IndividualClientPayloadDto, 'dateOfBirth'> & {
    dateOfBirth: dayjs.Dayjs;
}

const initialValues: InitialValues = {
    email: '',
    mobile: '',
    telephone: '',
    gender: PersonGender.FEMALE,
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: dayjs(),
    nationality: '',
    birthCountry: '',
    socialSecurityNumber: '',
    socialInsuranceNumber: '',
    nationalIdentityNumber: '',
    taxIdentificationNumber: '',
}
const CountyCodes = Object.entries(Countries).sort(([_, a], [__, b]) => {
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
}).map(([key]) => key)

export function PersonForm(){
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [setSessionClient] = useSetSessionClientMutation()
    const sessionId = useShallowEqualSelector((state: RootState) => state.auth.sessionId)
    const lastValues = useShallowEqualSelector((state: RootState) => {
        if (sessionId) {
            return state.form[sessionId]
        }
    })
    const validationHandler = useCallback(async ({ dateOfBirth, ...values }: InitialValues) => {
        const nulledValues = { ...nullValues(values), dateOfBirth: dateOfBirth.toISOString() }
        dispatch(persistForm({ sessionId: sessionId!, data: nulledValues }))
        const payload = plainToInstance(IndividualClientPayloadDto, nulledValues);
        const errors: Record<string, string> = {}
        const validationErrors = await validate(payload);
        for (const error of validationErrors) {
            errors[error.property] = Object.values(error.constraints as Record<string, string>)[0]
        }
        return errors;
    }, [])
    const startValues = useMemo(() => {
        if (!lastValues) {
            return initialValues
        } else {
            const { dateOfBirth, ...rest } = lastValues
            return {
                ...rest,
                dateOfBirth: dayjs(dateOfBirth),
            }
        }
    }, [lastValues])
    const handleSubmit = useCallback(({dateOfBirth, ...values}: InitialValues) => {
        return setSessionClient({ ...nullValues(values), dateOfBirth: dateOfBirth.format('YYYY-MM-DD') })
            .unwrap()
            .then(() => {
                history.push(`/verification/${sessionId}/documents`)
            })
    }, [])
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
                initialValues={startValues}
                validate={validationHandler}
                onSubmit={handleSubmit}
                validateOnChange
                isInitialValid={false}
            >
                {({ values, touched, errors }) => {
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="firstName"
                                        type="text"
                                        label="First Name"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="lastName"
                                        type="text"
                                        label="Last Name"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="middleName"
                                        type="text"
                                        label="Middle Name"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        label="Email"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="mobile"
                                        type="phone"
                                        label="Mobile"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="telephone"
                                        type="phone"
                                        label="Phone"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth>
                                        <Field
                                            component={Select}
                                            name="gender"
                                            label="Gender"
                                            required
                                        >
                                            {Object.values(PersonGender).map(gender => (
                                                <MenuItem key={gender} value={gender}>{capitalize(gender)}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth>
                                        <Field
                                            component={DatePicker}
                                            name="dateOfBirth"
                                            label="Date of Birth"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        name="nationality"
                                        component={Autocomplete}
                                        options={CountyCodes}
                                        getOptionLabel={(option: keyof typeof Countries) => Countries[option] || ''}
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                            <MuiTextField
                                                {...params}
                                                name="nationality"
                                                error={touched['nationality'] && !!errors['nationality']}
                                                helperText={touched['nationality'] && errors['nationality']}
                                                label="Nationality"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        name="birthCountry"
                                        component={Autocomplete}
                                        options={CountyCodes}
                                        getOptionLabel={(option: keyof typeof Countries) => Countries[option] || ''}
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                            <MuiTextField
                                                {...params}
                                                name="birthCountry"
                                                error={touched['birthCountry'] && !!errors['birthCountry']}
                                                helperText={touched['birthCountry'] && errors['birthCountry']}
                                                label="Country of Birth"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                {values.nationality === 'US' && <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="socialSecurityNumber"
                                        type="text"
                                        label="SSN"
                                        fullWidth
                                    />
                                </Grid>}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="socialInsuranceNumber"
                                        type="text"
                                        label="Social Insurance Number"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="nationalIdentityNumber"
                                        type="text"
                                        label="National Identity Number"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Field
                                        component={TextField}
                                        name="taxIdentificationNumber"
                                        type="text"
                                        label="Tax Identification Number"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} direction="row-reverse">
                                <Button type="submit" variant="contained">Next</Button>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </LocalizationProvider>
    )
}