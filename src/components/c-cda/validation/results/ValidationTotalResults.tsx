import React from 'react'
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import palette from '@/styles/palette'
import { ResultMetaData } from './ValidationResultsSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import _ from 'lodash'
type CardType = 'errors' | 'warnings' | 'info'

interface ResultsStatusCardProps {
  type: CardType
  results: ResultMetaData[]
  criteria?: string
}

const ResultsStatusCard: React.FC<ResultsStatusCardProps> = ({ type, results, criteria }) => {
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
    <Box display={'flex'} flexDirection={'row'}>
      <Accordion
        sx={{
          py: 0,
          '&:before': {
            display: 'none',
          },
          borderTop: `4px solid ${colorMap[type]}`,
          maxWidth: '90%',
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
              {result.type.includes('Reference C-CDA Validation') &&
              !(_.isEqual(criteria, 'C-CDA_IG_Only') || _.isEqual(criteria, 'C-CDA_IG_Plus_Vocab')) ? (
                <>
                  {result.count} {' in '} {result.type}
                </>
              ) : (
                ''
              )}
              {result.type.includes('IG Conformance') ? (
                <>
                  {result.count} {' in '} {result.type}
                </>
              ) : (
                ''
              )}
              {result.type.includes('Vocabulary Validation Conformance') && !_.isEqual(criteria, 'C-CDA_IG_Only') ? (
                <>
                  {result.count} {' in '} {result.type}
                </>
              ) : (
                ''
              )}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default ResultsStatusCard
