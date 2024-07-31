import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'
import palette from '@/styles/palette'

interface DataItem {
  name: string
  dts: string
  found: number
  expected: number
  rfc: string
  status: string
}

const data: DataItem[] = [
  { name: 'Item 1', dts: '2024-07-09', found: 10, expected: 10, rfc: 'https://example.com/rfc1', status: 'success' },
  { name: 'Item 2', dts: '2024-07-09', found: 8, expected: 10, rfc: 'https://example.com/rfc2', status: 'warning' },
  { name: 'Item 3', dts: '2024-07-09', found: 12, expected: 10, rfc: 'https://example.com/rfc3', status: 'info' },
]

const headers: (keyof DataItem)[] = ['name', 'dts', 'found', 'expected', 'rfc', 'status']

interface StyledChipProps {
  status: 'success' | 'warning' | 'info'
}

const StyledChip = styled(Chip)<StyledChipProps>(({ status }) => ({
  fontWeight: 'bold',
  textTransform: 'capitalize',
  fontSize: '.65rem',
  borderRadius: '32px',
  border: '1px solid',
  padding: '4px',
  color: status === 'success' ? palette.successLight : status === 'warning' ? palette.warning : palette.secondary,
  borderColor: status === 'success' ? palette.successLight : status === 'warning' ? palette.warning : palette.secondary,
  backgroundColor: 'transparent',
}))

const ValidationTable: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {headers.map((key) => (
                <TableCell key={key}>
                  {key === 'rfc' ? (
                    <a href={row[key]} target="_blank" rel="noopener noreferrer">
                      {row[key]}
                    </a>
                  ) : key === 'status' ? (
                    <StyledChip label={row[key]} status={row[key] as 'success' | 'warning' | 'info'} />
                  ) : (
                    row[key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ValidationTable
