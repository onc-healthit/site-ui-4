import React from 'react'
import { Box, Typography, LinearProgress } from '@mui/material'

type ValidationStatus = 'error' | 'warning' | 'pass'

interface ValidationStatusIndicatorProps {
  status: ValidationStatus
}

const ValidationStatusIndicator: React.FC<ValidationStatusIndicatorProps> = ({ status }) => {
  const statusMap: { [key in ValidationStatus]: { color: string; value: number } } = {
    error: { color: '#FF5252', value: 5 },
    warning: { color: '#83380E', value: 50 },
    pass: { color: '#122953', value: 100 },
  }

  const statusInfo = statusMap[status]

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Typography>Validation Status: {status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
      <LinearProgress
        variant="determinate"
        value={statusInfo.value}
        sx={{
          height: '5px',
          mt: 2,
          backgroundColor: 'lightgrey',
          '& .MuiLinearProgress-bar': {
            backgroundColor: statusInfo.color,
          },
        }}
      />
    </Box>
  )
}

export default ValidationStatusIndicator
