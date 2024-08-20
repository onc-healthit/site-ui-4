import { ScorecardReferenceErrorType } from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import palette from '@/styles/palette'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'

interface DetailsAccordionProps {
  disabled: boolean
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
        borderLeft: `8px solid ${props.leftBorderColor}`,
        borderRadius: '4px',
      }}
      disableGutters
      elevation={3}
      disabled={props.disabled}
      defaultExpanded={props.defaultExpanded}
    >
      <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
        {/* TODO: Issue count should probably be an avatar/badge just like in heatmap */}
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} flexDirection={'row'} gap={2}>
          <Typography sx={{ fontWeight: 'bold', border: `` }}>{props.validationCategory}</Typography>
          <Chip variant="outlined" size="small" label={`${props.issueCount} Total Issues`} />
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        {props.details.map((detail: ScorecardReferenceErrorType, index) => (
          <Box
            sx={{ marginBottom: 1, borderRadius: 0 }}
            p={2}
            bgcolor={props.backgroundColor}
            color={props.textColor}
            key={`${detail.sectionName}-${detail.documentLineNumber}-${index}`}
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
  // We don't need or use the disabled feature for now as it's cleaner in this context to only show if there are errors
  const hasErrors = errors?.length > 0
  console.log('hasErrors: ' + hasErrors)
  return (
    <>
      {hasErrors && (
        <Box sx={{ pb: 3 }}>
          <Box>
            {/* <Typography id={props.category} variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          relatedSection: {props.category}
        </Typography> */}
          </Box>
          <DetailsAccordion
            disabled={errorDisabled}
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
      )}
    </>
  )
}
