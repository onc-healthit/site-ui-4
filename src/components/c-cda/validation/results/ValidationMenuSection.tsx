import palette from '@/styles/palette'
import { Accordion, AccordionSummary, Typography, AccordionDetails, List, MenuItem, Avatar } from '@mui/material'
import { ResultMetaData } from './ValidationMenu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import _ from 'lodash'
export interface MetaDataProps {
  resultMetaData: ResultMetaData[]
  title: string
}
const ValidatorMenuSection = ({ resultMetaData, title }: MetaDataProps) => {
  const [errorDisabled, setErrorDisabled] = useState(false)
  const [warningDisabled, setWarningDisabled] = useState(false)
  const [infoDisabled, setInfoDisabled] = useState(false)
  const [accordionDisabled, setAccordionDisabled] = useState(false)
  let errorCount = 0
  let warningCount = 0
  let infoCount = 0
  resultMetaData.map((result) => {
    if (result.type.includes('Error')) {
      errorCount = result.count
    }
    if (result.type.includes('Warning')) {
      warningCount = result.count
    }
    if (result.type.includes('Info')) {
      infoCount = result.count
    }
  })
  useEffect(() => {
    if (errorCount === 0) {
      setErrorDisabled(true)
    }
    if (warningCount === 0) {
      setWarningDisabled(true)
    }
    if (infoCount === 0) {
      setInfoDisabled(true)
    }
    if (errorCount === 0 && warningCount === 0 && infoCount === 0) {
      setAccordionDisabled(true)
    }
  }, [errorCount, infoCount, warningCount])
  return (
    <>
      <Accordion
        sx={{
          py: 1,
          '&:before': {
            display: 'none',
          },
        }}
        disableGutters
        elevation={0}
        disabled={accordionDisabled}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <List>
            <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }} disabled={errorDisabled}>
              Errors{' '}
              <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.error }}>
                <Typography variant="caption">{errorCount}</Typography>
              </Avatar>
            </MenuItem>
            <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }} disabled={warningDisabled}>
              Warnings{' '}
              <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.warning }}>
                <Typography variant="caption">{warningCount}</Typography>
              </Avatar>
            </MenuItem>
            <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }} disabled={infoDisabled}>
              Info{' '}
              <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.primary }}>
                <Typography variant="caption">{infoCount}</Typography>
              </Avatar>
            </MenuItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default ValidatorMenuSection
