import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

// Type for each cell in the table
type TableCellData = {
  content: string | JSX.Element
  type: 'text' | 'checkbox' | 'icon'
  isChecked?: boolean
}

// Type for each row
type TableRowData = {
  cells: TableCellData[]
}

// Props for the table component
interface DynamicTableProps {
  headers: string[] // Array of headers
  rows: TableRowData[]
}

const DynamicTable: React.FC<DynamicTableProps> = ({ headers, rows }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableCell key={index}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.cells.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>
                {cell.type === 'icon' ? (
                  cell.isChecked ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )
                ) : (
                  cell.content
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default DynamicTable
