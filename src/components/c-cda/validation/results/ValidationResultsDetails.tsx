import React, { useEffect, useState } from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import palette from '@/styles/palette'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CCDAValidationResult } from './ValidationResultsSummary'
import _ from 'lodash'

interface ResultsProps {
  results: CCDAValidationResult[]
  errorRef: React.RefObject<HTMLDivElement>
  warningRef: React.RefObject<HTMLDivElement>
  infoRef: React.RefObject<HTMLDivElement>
}
export default function ValidatorResultsCCDAMDHTConformance({ results, errorRef, warningRef, infoRef }: ResultsProps) {
  const [errorDisabled, setErrorDisabled] = useState(false)
  const [warningDisabled, setWarningDisabled] = useState(false)
  const [infoDisabled, setInfoDisabled] = useState(false)
  const errors = results.filter((result) => result?.type.includes('Error'))
  //console.log(errors)
  const warnings = results.filter((result) => result?.type.includes('Warning'))
  //console.log(warnings)
  const infos = results.filter((result) => result?.type.includes('Info'))
  //console.log(infos)
  useEffect(() => {
    _.isEmpty(errors) && setErrorDisabled(true)
    _.isEmpty(warnings) && setWarningDisabled(true)
    _.isEmpty(infos) && setInfoDisabled(true)
  }, [errors, infos, warnings])
  return (
    <>
      <Accordion
        sx={{
          py: 0,
          '&:before': {
            display: 'none',
          },
          borderLeft: `4px solid ${palette.error}`,
        }}
        disableGutters
        elevation={1}
        disabled={errorDisabled}
        ref={errorRef}
        defaultExpanded
      >
        <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', border: `` }}>Errors</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 2 }}>
          {errors.map((error, i) => (
            <Box sx={{ marginBottom: 1 }} p={2} bgcolor={'#FFBDBD64'} key={i}>
              <Typography gutterBottom>
                <b>Result Description</b>:{error.description}
              </Typography>
              <Typography gutterBottom>
                <b>XPath</b>:<span style={{ lineBreak: 'anywhere', textDecoration: 'underline' }}>{error.xPath}</span>
              </Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1.3em' }} gutterBottom>
                <b>Line Number</b>:{error.documentLineNumber}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          py: 0,
          '&:before': {
            display: 'none',
          },
          borderLeft: `4px solid ${palette.warning}`,
        }}
        disableGutters
        elevation={1}
        disabled={warningDisabled}
        ref={warningRef}
      >
        <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', border: `` }}>Warnings</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          {warnings.map((warning, i) => (
            <Box sx={{ marginBottom: 1 }} p={2} bgcolor={'#F2D0A764'} key={i}>
              <Typography gutterBottom>
                <b>Result Description</b>: {warning.description}
              </Typography>
              <Typography gutterBottom>
                <b>XPath</b>:{' '}
                <span style={{ lineBreak: 'anywhere', textDecoration: 'underline' }}>{warning.xPath}</span>
              </Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1.3em' }} gutterBottom>
                <b>Line Number</b>: <span>{warning.documentLineNumber}</span>
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Info Template Accordion */}

      <Accordion
        sx={{
          py: 0,
          '&:before': {
            display: 'none',
          },
          borderLeft: `4px solid ${palette.primary}`,
        }}
        disableGutters
        elevation={1}
        disabled={infoDisabled}
        ref={infoRef}
      >
        <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', border: `` }}>Info</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          {infos.map((info, i) => (
            <Box sx={{ marginBottom: 1 }} p={2} bgcolor={'#E3F2FD64'} key={i}>
              <Typography gutterBottom>
                <b>Result Description</b>: {info.description}
              </Typography>
              <Typography gutterBottom>
                <b>XPath</b>: <span style={{ lineBreak: 'anywhere', textDecoration: 'underline' }}>{info.xPath}</span>
              </Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1.3em' }} gutterBottom>
                <b>Line Number</b>: {info.documentLineNumber}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  )
}
