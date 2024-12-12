import React, { ReactNode, useState, useEffect } from 'react'
import { Button, CircularProgress, Box, Typography, Tooltip } from '@mui/material'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import { ButtonProps } from '@mui/material/Button'

interface ExtendedLoadingButtonProps extends ButtonProps {
  loading: boolean
  done: boolean
  progressive?: boolean
  progressDuration?: number
  finalLabel?: ReactNode
  children: ReactNode
  disabled?: boolean
}

const LoadingButton: React.FC<ExtendedLoadingButtonProps> = ({
  loading,
  done,
  disabled,
  progressive = false,
  progressDuration = 60,
  finalLabel = 'Refresh',
  children,
  ...props
}) => {
  const [progress, setProgress] = useState(0)
  const totalTime = progressDuration // total estimated time in seconds
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(totalTime)
  const [waiting, setWaiting] = useState(false)
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    const startTimer = () => {
      setSecondsElapsed(0)
      setProgress(0)
      setTimeRemaining(totalTime)
      setWaiting(false)

      timer = setInterval(() => {
        setSecondsElapsed((oldSeconds) => {
          const newSeconds = oldSeconds + 1
          if (newSeconds >= totalTime) {
            clearInterval(timer!)
            setSecondsElapsed(0)
            setProgress(0)
            setTimeRemaining(0)
            setWaiting(true) // Set waiting for response to true when total estimated time is met
          } else {
            setProgress((newSeconds / totalTime) * 100)
            setTimeRemaining(totalTime - newSeconds)
          }
          return newSeconds
        })
      }, 1000)
    }

    if (loading) {
      startTimer()
    } else {
      setProgress(0)
      setTimeRemaining(totalTime)
      setWaiting(false)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [loading, totalTime])

  const buttonContent = (
    <Button variant="text" {...props} disabled={disabled || loading}>
      {done && !progressive ? (
        <PublishedWithChangesIcon />
      ) : done && progressive ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PublishedWithChangesIcon fontSize="small" />
          <Typography variant="button">{finalLabel}</Typography>
        </Box>
      ) : loading && progressive ? (
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress color="warning" variant="determinate" value={progress} size={24} />
          <div
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="textSecondary">
              {timeRemaining}
            </Typography>
          </div>
        </div>
      ) : loading && !progressive ? (
        <CircularProgress size={24} />
      ) : (
        children
      )}
    </Button>
  )
  return (loading && progressive) || (loading && !progressive) ? (
    <Tooltip
      title={waiting ? 'Awaiting response' : `Estimated time: ${Math.round(timeRemaining)} seconds`}
      arrow
      placement="left"
    >
      <span> {buttonContent}</span>
    </Tooltip>
  ) : (
    buttonContent
  )
}

export default LoadingButton
