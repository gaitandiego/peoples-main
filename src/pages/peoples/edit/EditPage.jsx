import React, { useEffect, useState } from 'react'
import * as TEXT from '../../../constants/text'
import {
    Box, Card, CardContent, Container, Typography,
    TextField,
    CardHeader,
    Button,
} from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { PEOPLES_API } from '../../../constants/api';
import * as ROUTES from '../../../constants/routes';
import { toast } from 'react-toastify';

const EditPage = (props) => {
    const { register, handleSubmit, reset, control, formState: { errors }, setValue } = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (location.state) {
            setValue('first_name', location.state.first_name)
            setValue('last_name', location.state.last_name)
            setValue('phone', location.state.phone)
            setValue('email', location.state.email)
            setValue('country', location.state.country)
            setValue('address', location.state.address)
        } else {
            navigate(ROUTES.PEOPLES_HOME)
        }

    }, []);

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await fetch(`${PEOPLES_API}/${location.state.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data)
                })

            await response.json()
            reset()
            navigate(ROUTES.PEOPLES_HOME)
            toast.success(TEXT.SUCCESS_EDIT)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container className='container'>
            <Grid container justifyContent="center">
                <Grid xs={12} md={12}>
                    <Card>
                        <CardHeader title={TEXT.APP_PEOPLES_TITLE_EDIT} />
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                id="first_name"
                                                label={TEXT.FORM_FIRST_NAME}
                                                variant="outlined"
                                                {...register('first_name', { required: true })}
                                                error={!!errors.first_name}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                id="last_name"
                                                label={TEXT.FORM_FIRST_NAME}
                                                variant="outlined"
                                                {...register('last_name', { required: true })}
                                                error={!!errors.last_name}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                id="phone"
                                                label={TEXT.FORM_PHONE}
                                                variant="outlined"
                                                {...register('phone', { required: true })}
                                                error={!!errors.phone}
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={2} mt={3}>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                type='email'
                                                fullWidth
                                                id="email"
                                                label={TEXT.FORM_EMAIL}
                                                variant="outlined"
                                                {...register('email', { required: true })}
                                                error={!!errors.email}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                id="country"
                                                label={TEXT.FORM_COUNTRY}
                                                variant="outlined"
                                                {...register('country', { required: true })}
                                                error={!!errors.country}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                id="address"
                                                label={TEXT.FORM_ADDRESS}
                                                variant="outlined"
                                                {...register('address', { required: true })}
                                                error={!!errors.address}
                                            />
                                        </Grid>

                                    </Grid>
                                </Box>
                                <Box sx={{ textAlign: 'right', mt: 3 }}>
                                    <Button
                                        onClick={() => navigate(ROUTES.PEOPLES_HOME)}
                                        disabled={loading}
                                        variant='contained'
                                        className='button button-cancel'
                                        color="primary"
                                    >
                                        {TEXT.BTN_CANCEL}
                                    </Button>
                                    <Button type='submit'
                                        disabled={loading}
                                        variant='contained'
                                        className='button '
                                        color="primary"
                                    >
                                        {TEXT.BTN_EDIT}
                                    </Button>
                                </Box>

                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default EditPage