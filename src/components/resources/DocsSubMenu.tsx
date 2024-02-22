import React from 'react'
import { Box } from '@mui/material'
import DocsSubMenuButton from '../archived/SubMenuButton'

const DocsSubMenu = () => {
  return (
    <Box
      sx={{
        width: '450px',
        borderRadius: '4px',
        top: '80px',
        position: 'sticky',
        height: 'fit-content',
        border: '1px solid #E8E8E8',
        backgroundColor: '#FFFFFF',
        boxShadow: '8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
      }}
    >
      <DocsSubMenuButton heading="Documents" />
      <DocsSubMenuButton heading="Videos" />
      <DocsSubMenuButton heading="Contact Us" />
    </Box>
  )
}

export default DocsSubMenu
