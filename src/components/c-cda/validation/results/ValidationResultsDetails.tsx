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
  referenceCCDAResults?: boolean
}

interface DetailsProps {
  disabled: boolean
  refLink: React.RefObject<HTMLDivElement>
  details: CCDAValidationResult[]
  defaultExpanded?: boolean
  title: string
  accordionTitleColor: string
  accordionDetailsColor: string
  referenceCCDAResults?: boolean
}
const DetailsAccordion = ({
  disabled,
  refLink,
  details,
  title,
  accordionTitleColor,
  accordionDetailsColor,
  defaultExpanded,
  referenceCCDAResults,
}: DetailsProps) => {
  const [expanded, setExpanded] = useState(false)
  const [content, setContent] = useState<CCDAValidationResult[]>([])
  const [contentLoaded, setContentLoaded] = useState(false)

  const handleAccordionChange = () => {
    setExpanded((prevExpanded) => !prevExpanded)
    if (!expanded) {
      setTimeout(() => {
        setContent(details)
        setContentLoaded(true)
        executeScroll()
      }, 500)
    }
  }

  const executeScroll = () => {
    if (refLink.current) {
      refLink.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <Accordion
      sx={{
        py: 0,
        '&:before': {
          display: 'none',
        },
        borderLeft: `4px solid ${accordionTitleColor}`,
        borderRadius: '4px',
      }}
      disableGutters
      square={false}
      elevation={1}
      disabled={disabled}
      ref={refLink}
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      onChange={handleAccordionChange}
    >
      <AccordionSummary
        sx={{
          borderBottom: `1px solid ${palette.divider}`,
          bgcolor: palette.white,
          position: 'sticky',
          top: '0',
          minHeight: '40px',
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography sx={{ fontWeight: 'bold', border: `` }}>{title}</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        {!contentLoaded ? (
          <Typography>Loading content...</Typography>
        ) : (
          content.map((detail, i) => (
            <Box sx={{ marginBottom: 1 }} p={2} bgcolor={accordionDetailsColor} key={i}>
              <Typography gutterBottom>
                <b>Result Description</b>: {detail.description}
              </Typography>
              {!referenceCCDAResults && (
                <Typography gutterBottom>
                  <b>XPath</b>:&nbsp;
                  <span style={{ lineBreak: 'anywhere', textDecoration: 'underline' }}>{detail.xPath}</span>
                </Typography>
              )}
              {!referenceCCDAResults && (
                <Typography sx={{ fontFamily: 'monospace', fontSize: '1.3em' }} gutterBottom>
                  <b>Line Number</b>: {detail.documentLineNumber}
                </Typography>
              )}
            </Box>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  )
}
export default function ValidatorResultsDetails({
  results,
  errorRef,
  warningRef,
  infoRef,
  referenceCCDAResults,
}: ResultsProps) {
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
      <DetailsAccordion
        disabled={errorDisabled}
        refLink={errorRef}
        details={errors}
        title={'Errors'}
        accordionTitleColor={palette.error}
        accordionDetailsColor={'#FFBDBD64'}
        defaultExpanded={true}
        referenceCCDAResults={referenceCCDAResults}
      />
      <DetailsAccordion
        disabled={warningDisabled}
        refLink={warningRef}
        details={warnings}
        title={'Warnings'}
        accordionTitleColor={palette.warning}
        accordionDetailsColor={'#F2D0A764'}
        defaultExpanded={false}
        referenceCCDAResults={referenceCCDAResults}
      />
      <DetailsAccordion
        disabled={infoDisabled}
        refLink={infoRef}
        details={infos}
        title={'Info'}
        accordionTitleColor={palette.primary}
        accordionDetailsColor={'#E3F2FD64'}
        defaultExpanded={false}
        referenceCCDAResults={referenceCCDAResults}
      />
    </>
  )
}
