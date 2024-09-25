import React from 'react'
import { Box } from '@mui/material'
import DocsSubMenuButton from '../archived/SubMenuButton'

const DocsSubMenu = () => {
  return (
    <Box
      sx={{
        minWidth: '229px',
        width: '229px',
        borderRadius: '4px',
        top: '80px',
        position: 'sticky',
        height: 'fit-content',
        border: '1px solid #E8E8E8',
        backgroundColor: '#FFFFFF',
        boxShadow: '8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
      }}
    >
      <DocsSubMenuButton link="#docs" heading="Documents" />
      <DocsSubMenuButton link="#github" heading="GitHub Repositories" />
      <DocsSubMenuButton link="mailto:edge-test-tool@googlegroups.com" heading="Contact Us" />
    </Box>
  )
}

export default DocsSubMenu
