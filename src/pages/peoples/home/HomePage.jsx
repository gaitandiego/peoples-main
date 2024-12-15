import { useState, useEffect } from 'react';
import { Backdrop, Box, Button, Container, Fade, Modal, Typography } from '@mui/material'
import * as TEXT from '../../../constants/text';
import { PEOPLES_API } from '../../../constants/api';
import { useNavigate } from 'react-router';
import * as ROUTES from '../../../constants/routes';

import { Table } from '../../../components/table/Table';
import { toast } from 'react-toastify';

const HomePage = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'first_name',
            headerName: 'First name',
            width: 150,
        },
        {
            field: 'last_name',
            headerName: 'Last name',
            width: 150,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 110,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 150
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150
        },
    ];
    const [peoples, setPeoples] = useState([])
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(PEOPLES_API);
                const data = await response.json();
                setPeoples(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddButtonToolbar = () => navigate(ROUTES.PEOPLES_ADD);
    const handleDeleteAction = (row) => { setIdSelect(row.id); toogle() }
    const handleEditAction = (row) => navigate(`${ROUTES.PEOPLES}/edit/${row.id}`, { state: row });

    const toogle = () => setModalOpen(!modalOpen)
    const handleDelete = async () => {
        try {
            const response = await fetch(`${PEOPLES_API}/${idSelect}`, { method: 'DELETE' })
            await response.json()
            setPeoples(peoples.filter(item => item.id !== idSelect))
            toogle()
            toast.success(TEXT.SUCCESS_DELETE)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Container className='container'>
                <Typography variant="h1" align='center' className='container-title'>{TEXT.APP_PEOPLES_TITLE}</Typography>
                <Table columns={columns} data={peoples} loading={loading} handleAddButtonToolbar={handleAddButtonToolbar} handleDeleteAction={handleDeleteAction} handleEditAction={handleEditAction} />
            </Container>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={toogle}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                sx={{
                    display: 'flex',
                    p: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Fade in={modalOpen}>
                    <Box
                        sx={(theme) => ({
                            position: 'relative',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: theme.shadows[5],
                            p: 4,
                        })}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {TEXT.MODAL_TITLE_DELETE_ALERT} {idSelect}
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {TEXT.MODAL_CONTENT_DELETE_ALERT}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button color='primary' variant='contained' className='button' onClick={toogle}>Close</Button>
                            <Button color='primary' variant='contained' className='button' onClick={handleDelete}>Accept</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal >
        </>
    )
}

export default HomePage