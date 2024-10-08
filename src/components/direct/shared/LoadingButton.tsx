import React, { ReactNode, useState, useEffect } from 'react'
import { Button, CircularProgress, Box, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { ButtonProps } from '@mui/material/Button'

interface ExtendedLoadingButtonProps extends ButtonProps {
  loading: boolean
  done: boolean
  progressive?: boolean
  progressDuration?: number
  finalLabel?: ReactNode
  children: ReactNode
}

const LoadingButton: React.FC<ExtendedLoadingButtonProps> = ({
  loading,
  done,
  progressive = false,
  progressDuration = 3000,
  finalLabel = 'Refresh',
  children,
  ...props
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (progressive && loading && progress < 100) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          const diff = 100 - oldProgress
          return Math.min(oldProgress + diff * 0.1, 100)
        })
      }, progressDuration / 100)
    } else if (!loading) {
      setProgress(0)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [progressive, loading, progressDuration])

  return (
    <Button {...props} disabled={loading || done}>
      {done && !progressive ? (
        <CheckIcon />
      ) : done && progressive ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckIcon />
          <Typography variant="button">{finalLabel}</Typography>
        </Box>
      ) : loading && progressive ? (
        <CircularProgress variant="determinate" value={progress} size={24} />
      ) : loading && !progressive ? (
        <CircularProgress size={24} />
      ) : (
        children
      )}
    </Button>
  )
}

export default LoadingButton
