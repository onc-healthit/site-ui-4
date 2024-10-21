import React from 'react'
import { Chip, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import palette from '@/styles/palette'
import { Detail } from './ValidationReportTypes'
import { DataGrid, GridColDef, GridRowHeightParams, GridRowHeightReturnValue } from '@mui/x-data-grid'

interface ValidationTableProps {
  selectedNodeDetails: Detail[] | null
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    maxWidth: 300,
    renderCell: (params) => (
      <div style={{ padding: 16, whiteSpace: 'normal', wordWrap: 'break-word' }}>{params.value}</div>
    ),
  },
  {
    field: 'dts',
    headerName: 'DTS',
    renderCell: (params) => (
      <div style={{ padding: 16, whiteSpace: 'normal', wordWrap: 'break-word' }}>{params.value}</div>
    ),
  },
  {
    field: 'found',
    headerName: 'Found',
    maxWidth: 300,
    minWidth: 250,
    renderCell: (params) => (
      <div style={{ padding: 16, whiteSpace: 'normal', wordWrap: 'break-word' }}>{params.value}</div>
    ),
  },
  {
    field: 'expected',
    headerName: 'Expected',
    maxWidth: 300,
    minWidth: 250,
    renderCell: (params) => (
      <div style={{ padding: 16, whiteSpace: 'normal', wordWrap: 'break-word' }}>{params.value}</div>
    ),
  },
  {
    field: 'rfc',
    headerName: 'RFC',
    minWidth: 200,
    renderCell: (params) => {
      if (!params.value) return null

      const rfcLinks = params.value
        .split(';')
        .reduce((acc: JSX.Element[], curr: string, index: number, array: string[]) => {
          if (index % 2 === 0) {
            const text = curr
            const url = array[index + 1]
            acc.push(
              <div style={{ padding: 16 }}>
                <Box key={index} component="span" mb={4}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {text}
                  </a>
                </Box>
              </div>
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
    maxWidth: 200,
    flex: 0.1,
    renderCell: (params) => (
      <div style={{ padding: 16 }}>
        {' '}
        <StyledChip status={params.value} label={params.value} />
      </div>
    ),
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
  const getRowHeight = (params: GridRowHeightParams): GridRowHeightReturnValue => {
    // Logic to determine row height
    return 'auto' // Adjust as needed based on your criteria
  }

  return (
    <DataGrid
      columns={columns}
      rows={selectedNodeDetails || []}
      getRowId={() => Math.random()}
      disableRowSelectionOnClick
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      autoHeight
      density="comfortable"
      getRowHeight={getRowHeight} // Add getRowHeight here
    />
  )
}

export default ValidationTable
