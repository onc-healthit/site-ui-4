import React, { useState, useEffect } from 'react'
import { Box, Typography, LinearProgress, Grow } from '@mui/material'
import palette from '@/styles/palette'
import { Check } from '@mui/icons-material'

type ValidationStatus = 'error' | 'pass'

interface ValidationStatusIndicatorProps {
  status: ValidationStatus
}

const ValidationStatusIndicator: React.FC<ValidationStatusIndicatorProps> = ({ status }) => {
  const [progressValue, setProgressValue] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const statusMap: { [key in ValidationStatus]: { color: string; value: number } } = {
    error: { color: palette.error, value: 30 },
    pass: { color: palette.success, value: 100 },
  }

  const statusInfo = statusMap[status]

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the progress value by a larger amount for faster animation
      setProgressValue((prevProgress) => {
        const newProgress = prevProgress + 2 // Increment by 2 (adjustable)
        // Ensure the progress value doesn't exceed the desired value
        return newProgress > statusInfo.value ? statusInfo.value : newProgress
      })
    }, 50) // Decreased interval for faster animation

    // Clean up the interval on component unmount
    return () => clearInterval(interval)
  }, [statusInfo.value])

  useEffect(() => {
    if (progressValue === 100) {
      setIsComplete(true)
    }
  }, [progressValue])

  return (
    <Box sx={{ width: '100%', mt: 1, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography>Validation Status: {status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
        <LinearProgress
          variant="determinate"
          value={progressValue}
          sx={{
            height: '5px',
            mt: 2,
            backgroundColor: palette.divider,
            '& .MuiLinearProgress-bar': {
              backgroundColor: statusInfo.color,
            },
          }}
        />
      </Box>
      {isComplete && ( // Render icon when progress value is 100
        <Grow in={isComplete}>
          <Check
            fontSize="large"
            sx={{
              color: palette.success,
              mt: 4,
              ml: 4,
              transition: 'transform 0.3s ease-in-out', // Define transition effect
              transform: 'scale(1)', // Initial smaller scale
              '&:hover': {
                transform: 'scale(1.2)', // Scale on hover
              },
            }}
          ></Check>
        </Grow>
      )}
    </Box>
  )
}

export default ValidationStatusIndicator
