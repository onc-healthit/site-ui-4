'use client'

import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

export interface LinkButtonProps {
  label: string
  url: string
  icon: React.ReactNode
  isExternalUrl?: boolean
}
const LinkButton = ({ label, url, icon, isExternalUrl = true }: LinkButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (isExternalUrl) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      router.push(url)
    }
  }

  return (
    <Button
      onClick={handleClick}
      sx={{
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        padding: '8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: '4px',
        alignItems: 'center',
        textTransform: 'capitalize',
      }}
    >
      <Typography color="primary">
        <strong>{label}</strong>
      </Typography>
      {icon}
    </Button>
  )
}

export default LinkButton
