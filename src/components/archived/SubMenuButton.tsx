import React from 'react'
import { Button } from '@mui/material'

export interface SubMenuProps {
  heading: string
}

const SubMenuButton = ({ heading }: SubMenuProps) => {
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

export default SubMenuButton
