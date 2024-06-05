import React, { useState, useEffect } from 'react'
import { Box, Typography, LinearProgress, Grow, Divider } from '@mui/material'
import palette from '@/styles/palette'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
type ValidationStatus = 'fail' | 'pass'

interface ValidationStatusIndicatorProps {
  status: ValidationStatus
}

const ValidationStatusIndicator: React.FC<ValidationStatusIndicatorProps> = ({ status }) => {
  const [progressValue, setProgressValue] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const statusMap: { [key in ValidationStatus]: { color: string; value: number } } = {
    fail: { color: palette.error, value: 100 },
    pass: { color: palette.success, value: 100 },
  }

  const statusInfo = statusMap[status]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prevProgress) => {
        const newProgress = prevProgress + 2
        return newProgress > statusInfo.value ? statusInfo.value : newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [statusInfo.value])

  useEffect(() => {
    if (progressValue === 100) {
      setIsComplete(true)
    }
  }, [progressValue])

  const getHelperText = () => {
    if (status === 'fail') {
      return (
        <Typography gutterBottom>
          Unfortunately, your C-CDA document did not pass the validation. It indicates significant issues that must be
          resolved. Please review the errors below for detailed information on what needs to be corrected.
        </Typography>
      )
    } else if (status === 'pass') {
      return (
        <Typography gutterBottom>
          Your C-CDA document has passed the basic validation, but there are some issues that need your attention.
          Please review the warnings below and take necessary actions to enhance the quality of your document.
        </Typography>
      )
    }
  }

  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Typography sx={{ pb: 2 }} variant="h3" fontWeight={700}>
        Results
      </Typography>
      <Box sx={{ width: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <Typography fontWeight={400}> {status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
        <Box sx={{ flexGrow: 1, flexDirection: 'row', mx: 4, mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: '12px',
              mt: 2,
              borderRadius: '16px',
              backgroundColor: palette.divider,
              '& .MuiLinearProgress-bar': {
                backgroundColor: statusInfo.color,
              },
            }}
          />
        </Box>
        {isComplete && (
          <Grow in={isComplete}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
              {status === 'fail' ? (
                <ErrorIcon
                  fontSize="large"
                  sx={{
                    color: palette.error,
                    transition: 'transform 0.3s ease-in-out',
                    transform: 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              ) : (
                <Check
                  fontSize="large"
                  sx={{
                    color: palette.success,
                    transition: 'transform 0.3s ease-in-out',
                    transform: 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              )}
            </Box>
          </Grow>
        )}
      </Box>
      <Box sx={{ mt: 2, width: '100%' }}>{getHelperText()}</Box>
    </>
  )
}

export default ValidationStatusIndicator
