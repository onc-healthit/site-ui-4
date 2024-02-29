import React from 'react'
import Button from '@mui/material/Button'
const ArchiveFilter = () => {
  return (
    <Button
      sx={{
        width: '229px',
        height: '36px',
        position: 'sticky',
        top: '377px',
        padding: '10px 16px',
        borderRadius: '4px',
        boxShadow: `
      0px 1px 5px 0px rgba(0, 0, 0, 0.12), 
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
      0px 3px 1px -2px rgba(0, 0, 0, 0.2)
    `,
      }}
    >
      Filter
    </Button>
  )
}

export default ArchiveFilter
