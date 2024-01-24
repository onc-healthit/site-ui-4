import React from 'react'
import { Box } from '@mui/material'
import ArchiveSubMenuButton from './ArchiveSubMenuButton' // Adjust the import path as necessary

const ArchiveSubMenu = () => {
  return (
    <Box
      sx={{
        width: '229px',
        height: '273px',
        position: 'absolute',
        top: '333px',
        left: '324px',
        borderRadius: '4px',
        border: '1px solid #E8E8E8',
        padding: '8px 0',
        backgroundColor: '#FFFFFF',
        boxShadow: '8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
      }}
    >
      <ArchiveSubMenuButton heading="Button 1" />
      <ArchiveSubMenuButton heading="Button 2" />
      {/* Add more buttons as needed */}
    </Box>
  )
}

export default ArchiveSubMenu
