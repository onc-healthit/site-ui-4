import React from 'react'
import { Button } from '@mui/material'

export interface ArchiveSubMenuProps {
  heading: string
}

const ArchiveSubMenuButton = ({ heading }: ArchiveSubMenuProps) => {
  return (
    <Button
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        height: 'auto',
        minHeight: '36px',
        padding: '8px 16px',
      }}
    >
      {heading}
    </Button>
  )
}

export default ArchiveSubMenuButton
