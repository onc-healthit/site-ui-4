import React from 'react'
import { Card, Typography, CardContent } from '@mui/material'
import palette from '@/styles/palette'
import { ResultMetaData } from './ValidationResultsSummary'

type CardType = 'errors' | 'warnings' | 'info'

interface ResultsStatusCardProps {
  type: CardType
  messages: ResultMetaData[]
}

const ResultsStatusCard: React.FC<ResultsStatusCardProps> = ({ type, messages }) => {
  const colorMap = {
    errors: palette.error,
    warnings: palette.warning,
    info: palette.primary,
  }

  let count = 0
  messages.forEach((c) => {
    count += c.count ? c.count : 0
  })

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
            {message.count} {' in '} {message.type}
          </Typography>
        ))}
      </CardContent>
    </Card>
  )
}

export default ResultsStatusCard
