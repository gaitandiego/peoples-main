import React from 'react'

import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Button, Typography } from '@mui/material';


import * as TEXT from '../../constants/text';

export const Table = ({ columns, data, loading, handleEditAction, handleDeleteAction, handleAddButtonToolbar }) => {

    const columnsData = [
        ...columns,
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="MuiButton-textPrimary"
                        onClick={() => handleEditAction(params.row)}
                        color="inherit"
                    />
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        className="MuiButton-textPrimary"
                        onClick={() => handleDeleteAction(params.row)}
                        color="inherit"
                    />
                </>

            ),
        }]

    const CustomToolbar = () => (
        <GridToolbarContainer className='toolbar-container' >
            <Typography variant="h6" className='Mui-focused primary'>{TEXT.APP_TITLE}</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <GridToolbarQuickFilter />
            <GridToolbarExport />
            <AddToolbar />
        </GridToolbarContainer>
    );

    const AddToolbar = props => {
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleAddButtonToolbar}>
                    Add
                </Button>
            </GridToolbarContainer>
        );
    }


    return (
        <Box sx={{ minHeight: 520, width: '100%', height: 520 }}>
            <DataGrid
                rows={data}
                columns={columnsData}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
                        },
                    },
                }}
                disableColumnFilter
                disableColumnSelector
                ignoreDiacritics
                disableDensitySelector
                pageSizeOptions={[7]}
                loading={loading}
                slots={{ toolbar: CustomToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
        </Box>
    )
}
