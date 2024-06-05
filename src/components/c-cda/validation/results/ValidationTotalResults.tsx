import React from 'react'
import { Card, Typography, CardContent, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import palette from '@/styles/palette'
import { ResultMetaData } from './ValidationResultsSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type CardType = 'errors' | 'warnings' | 'info'

interface ResultsStatusCardProps {
  type: CardType
  results: ResultMetaData[]
}

const ResultsStatusCard: React.FC<ResultsStatusCardProps> = ({ type, results }) => {
  const colorMap = {
    errors: palette.error,
    warnings: palette.warning,
    info: palette.primary,
  }

  let count = 0
  results.forEach((c) => {
    count += c.count ? c.count : 0
  })
  const modifiedResults = results.map((result) => {
    return { ...result, type: result.type.replace('MDHT', 'IG').replace('ONC 2015 ', '') }
  })

  return (
    <Accordion
      sx={{
        py: 0,
        '&:before': {
          display: 'none',
        },
        borderTop: `4px solid ${colorMap[type]}`,
        maxWidth: '30%',
      }}
      disableGutters
      elevation={1}
      id={type}
    >
      <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: 'bold', border: `` }}>
          {' '}
          {`${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`} Total
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        {modifiedResults.map((result, index) => (
          <Typography key={index} variant="body2" sx={{ mt: 1 }}>
            {result.count} {' in '} {result.type}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
    /*     <Card
      sx={{
        maxWidth: '30%',
        borderRadius: '0px 0px 8px 8px',
        borderTop: `4px solid ${colorMap[type]}`,
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {`${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`} Total
        </Typography>
        {messages.map((message, index) => (
          <Typography key={index} variant="body2" sx={{ mt: 1 }}>
            {message.count} {' in '} {message.type}
          </Typography>
        ))}
      </CardContent>
    </Card> */
  )
}

export default ResultsStatusCard
