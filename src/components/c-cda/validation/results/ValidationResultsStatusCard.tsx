import React from 'react'
import { Card, Typography, CardContent } from '@mui/material'
import palette from '@/styles/palette'

type CardType = 'error' | 'warning' | 'info'

interface ResultsStatusCardProps {
  type: CardType
  count: number
  messages: string[]
}

const ResultsStatusCard: React.FC<ResultsStatusCardProps> = ({ type, count, messages }) => {
  const colorMap = {
    error: palette.error,
    warning: palette.warning,
    info: palette.primary,
  }

  return (
    <Card
      sx={{
        minWidth: '30%',
        borderRadius: '0px 0px 8px 8px',
        borderTop: `8px solid ${colorMap[type]}`,
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {`${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </Typography>
        {messages.map((message, index) => (
          <Typography key={index} variant="body2" sx={{ mt: 1 }}>
            {message}
          </Typography>
        ))}
      </CardContent>
    </Card>
  )
}

export default ResultsStatusCard
