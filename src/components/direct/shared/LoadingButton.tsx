import React, { ReactNode, useState, useEffect } from 'react'
import { Button, CircularProgress, Box, Typography } from '@mui/material'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
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
      const intervalTime = 50
      const numberOfSteps = progressDuration / intervalTime
      const incrementPerInterval = 100 / numberOfSteps

      interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + incrementPerInterval
          return newProgress >= 100 ? 100 : newProgress
        })
      }, intervalTime)
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
    <Button variant="text" {...props} disabled={loading}>
      {done && !progressive ? (
        <PublishedWithChangesIcon />
      ) : done && progressive ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PublishedWithChangesIcon fontSize="small" />
          <Typography variant="button">{finalLabel}</Typography>
        </Box>
      ) : loading && progressive ? (
        <CircularProgress color="warning" variant="determinate" value={progress} size={24} />
      ) : loading && !progressive ? (
        <CircularProgress size={24} />
      ) : (
        children
      )}
    </Button>
  )
}

export default LoadingButton
