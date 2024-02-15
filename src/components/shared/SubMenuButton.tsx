import React from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'

export interface SubMenuProps {
  heading: string
  href: string
}

const SubMenuButton = ({ heading, href }: SubMenuProps) => {
  return (
    <Link href={href}>
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
