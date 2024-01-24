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
        left: '294px',
        borderRadius: '4px',
        border: '1px solid #E8E8E8',
        padding: '8px 0',
        backgroundColor: '#FFFFFF',
        boxShadow: '8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
      }}
    >
      <ArchiveSubMenuButton heading="All" />
      <ArchiveSubMenuButton heading="C-CDA" />
      <ArchiveSubMenuButton heading="Direct" />
      <ArchiveSubMenuButton heading="Edge" />
      <ArchiveSubMenuButton heading="XDM" />
      <ArchiveSubMenuButton heading="Other" />
      <ArchiveSubMenuButton heading="Contact Us" />
    </Box>
  )
}

export default ArchiveSubMenu
