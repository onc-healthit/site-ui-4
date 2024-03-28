import React from 'react'
import { Card, Typography, Box } from '@mui/material'

type CardType = 'error' | 'warning' | 'info'

interface ResultsStatusCardProps {
  type: CardType
  count: number
  messages: string[]
}

const ResultsStatusCard: React.FC<ResultsStatusCardProps> = ({ type, count, messages }) => {
  const colorMap = {
    error: '#FF5252',
    warning: '#83380E',
    info: '#122953',
  }

  return (
    <Card
      sx={{
        width: 334,
        borderRadius: '0px 0px 8px 8px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          bgcolor: colorMap[type],
          height: 16,
          display: 'flex',
          alignItems: 'center',
          paddingX: 1,
        }}
      ></Box>

      <Box
        sx={{
          padding: '14px',
          bgcolor: 'white',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          {`${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </Typography>
        {messages.map((message, index) => (
          <Typography key={index} variant="body2" sx={{ mt: 1 }}>
            {message}
          </Typography>
        ))}
      </Box>
    </Card>
  )
}

export default ResultsStatusCard
