import React from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'

export interface SubMenuProps {
  heading: string
  link: string
}

const SubMenuButton = ({ heading, link }: SubMenuProps) => {
  return (
    <Link href={link} passHref>
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
    </Link>
  )
}

export default SubMenuButton
