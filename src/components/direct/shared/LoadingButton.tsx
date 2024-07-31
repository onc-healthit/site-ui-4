import React, { ReactNode } from 'react'
import { Button, CircularProgress } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { ButtonProps } from '@mui/material/Button'

interface LoadingButtonProps extends ButtonProps {
  loading: boolean
  done: boolean
  children: ReactNode
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, done, children, ...props }) => {
  return (
    <Button {...props} disabled={loading || done}>
      {done ? <CheckIcon /> : loading ? <CircularProgress size={24} /> : children}
    </Button>
  )
}

export default LoadingButton
