import palette from '@/styles/palette'
import { ScorecardReferenceErrorType } from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'

interface DetailsAccordionProps {
  disabled: boolean
  refLink: React.RefObject<HTMLDivElement>
  details: ScorecardReferenceErrorType[]
  defaultExpanded?: boolean
  leftBorderColor: string
  backgroundColor: string
  textColor: string
  referenceCCDAResults?: boolean
  validationCategory: string
  issueCount: number
}

const DetailsAccordion = (props: DetailsAccordionProps) => {
  return (
    <Accordion
      square={false}
      sx={{
        py: 0,
        '&:before': {
          display: 'none',
        },
        borderLeft: `14px solid ${props.leftBorderColor}`,
        borderTopLeftRadius: '30px',
      }}
      disableGutters
      elevation={3}
      disabled={props.disabled}
      ref={props.refLink}
      defaultExpanded={props.defaultExpanded}
    >
      <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
        {/* TODO: Issue count should probably be an avatar/badge just like in heatmap */}
        <Typography sx={{ fontWeight: 'bold', border: `` }}>
          {/* Note: If converting to have conf and vocab errors in each section, then display sectionName here */}
          {props.validationCategory} ({props.issueCount})
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        {props.details.map((detail, i) => (
          <Box
            sx={{ marginBottom: 1, borderRadius: 2 }}
            p={2}
            bgcolor={props.backgroundColor}
            color={props.textColor}
            key={i}
          >
            <Typography gutterBottom>
              <b>Error</b>: {detail.description}
            </Typography>
            <Typography gutterBottom>
              <b>Related Section</b>: {detail.sectionName}
            </Typography>
            <Typography gutterBottom>
              <b>XPath</b>:&nbsp;
              <span style={{ lineBreak: 'anywhere', textDecoration: 'underline' }}>{detail.xPath}</span>
            </Typography>
            <Typography sx={{ fontFamily: 'monospace', fontSize: '1.3em' }} gutterBottom>
              <b>Line Number</b>: {detail.documentLineNumber}
            </Typography>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
interface CategoricalResultsProps {
  category: string
  results: ScorecardReferenceErrorType[]
  errorRef: React.RefObject<HTMLDivElement>
  referenceCCDAResults?: boolean
}

export default function ScorecardBaseCheckResults(props: CategoricalResultsProps) {
  const refValErrorBackgroundColor = '#FFBDBD64'
  // const refValErrorBackgroundColor = '#FFBDBD15'
  const [errorDisabled, setErrorDisabled] = useState(false)
  // A bit overkill, we could just check results directly as we should only have errors from service, but, can't hurt.
  const errors = props.results.filter((result) => result?.type.includes('Error'))
  useEffect(() => {
    _.isEmpty(errors) && setErrorDisabled(true)
  }, [errors])
  return (
    <Box>
      <Box>
        {/* <Typography id={props.category} variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          relatedSection: {props.category}
        </Typography> */}
      </Box>
      <DetailsAccordion
        disabled={errorDisabled}
        refLink={props.errorRef}
        details={errors}
        leftBorderColor={palette.black}
        backgroundColor={refValErrorBackgroundColor}
        textColor={palette.black}
        defaultExpanded={true}
        referenceCCDAResults={props.referenceCCDAResults}
        validationCategory={props.category}
        issueCount={errors.length}
      />
    </Box>
  )
}
