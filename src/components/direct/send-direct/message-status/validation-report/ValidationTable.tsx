import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

const data = [
  { name: 'Item 1', dts: '2024-07-09', found: 10, expected: 10, rfc: 'https://example.com/rfc1', status: 'success' },
  { name: 'Item 2', dts: '2024-07-09', found: 8, expected: 10, rfc: 'https://example.com/rfc2', status: 'warning' },
  { name: 'Item 3', dts: '2024-07-09', found: 12, expected: 10, rfc: 'https://example.com/rfc3', status: 'info' },
]

const headers = ['name', 'dts', 'found', 'expected', 'rfc', 'status']

const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  borderRadius: '4px',
  padding: '6px 8px',
  backgroundColor: status === 'success' ? '#4caf50' : status === 'warning' ? '#ff9800' : '#2196f3',
  color: '#fff',
}))

const ValidationTable = () => {
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
              {Object.keys(row).map((key) => (
                <TableCell key={key}>
                  {key === 'rfc' ? (
                    <a href={row[key]} target="_blank" rel="noopener noreferrer">
                      {row[key]}
                    </a>
                  ) : key === 'status' ? (
                    <StyledChip label={row[key]} status={row[key]} />
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
