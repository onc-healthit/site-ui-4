import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import palette from '@/styles/palette'
import { Detail, ValidationReport } from './ValidationReportTypes'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface ValidationTableProps {
  selectedNodeDetails: Detail[] | null
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', minWidth: 200, flex: 0.5 },
  {
    field: 'dts',
    headerName: 'DTS',
    minWidth: 100,
    flex: 0.5,
  },
  {
    field: 'found',
    headerName: 'Found',
    minWidth: 500,
    flex: 1,
  },
  {
    field: 'expected',
    headerName: 'Expected',
    minWidth: 500,
    flex: 0.5,
  },
  {
    field: 'rfc',
    headerName: 'RFC',
    minWidth: 400,
    flex: 0.5,

    renderCell: (params) => {
      if (!params.value) {
        return null
      }

      const rfcLinks = params.value
        .split(';')
        .reduce((acc: JSX.Element[], curr: string, index: number, array: string[]) => {
          if (index % 2 === 0) {
            const text = curr
            const url = array[index + 1]
            acc.push(
              <Box key={index} component="span" mb={4}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {text}
                </a>
              </Box>
            )
          }
          return acc
        }, [])

      return <Box>{rfcLinks}</Box>
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 200,
    flex: 0.5,
    renderCell: (params) => <StyledChip status={params.value} label={params.value} />,
  },
]
interface StyledChipProps {
  status: 'SUCCESS' | 'WARNING' | 'INFO' | 'ERROR'
}

const StyledChip = styled(Chip)<StyledChipProps>(({ status }) => ({
  fontWeight: 'bold',
  textTransform: 'capitalize',
  fontSize: '.65rem',
  borderRadius: '32px',
  border: '1px solid',
  padding: '4px',
  color:
    status === 'SUCCESS'
      ? palette.successLight
      : status === 'WARNING'
        ? palette.warning
        : status === 'ERROR'
          ? palette.error
          : palette.secondary,
  borderColor:
    status === 'SUCCESS'
      ? palette.successLight
      : status === 'WARNING'
        ? palette.warning
        : status === 'ERROR'
          ? palette.error
          : palette.secondary,
  backgroundColor: 'transparent',
}))

const ValidationTable = ({ selectedNodeDetails }: ValidationTableProps) => {
  return (
    <DataGrid
      columns={columns}
      rows={selectedNodeDetails || []}
      getRowId={() => Math.random()}
      disableRowSelectionOnClick
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      density={'comfortable'}
      autoHeight
    />
  )
}

export default ValidationTable
