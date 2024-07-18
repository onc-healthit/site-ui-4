import palette from '@/styles/palette'
import { ScorecardBestPracticeResultType } from '@/components/c-cda/additional/scorecard/types/ScorecardBestPracticeResultType'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import ScorecardTabs from './ScorecardTabs'

interface DetailsAccordionProps {
  disabled: boolean
  refLink: React.RefObject<HTMLDivElement>
  details: ScorecardBestPracticeResultType[]
  defaultExpanded?: boolean
  leftBorderColor: string
  backgroundColor: string
  section: string
  issueCount: number
}

const DetailsAccordion = (props: DetailsAccordionProps) => {
  const [isShowDetails, setIsShowDetails] = useState(Array(props.details.length).fill(false))

  const handleShowDetails = (index: number) => {
    console.log('enter clickShowDetails, flipping show/hide state of index: ' + index)
    setIsShowDetails((prevStates) => {
      const newStatesWithFlippedStateAtIndex = [...prevStates]
      newStatesWithFlippedStateAtIndex[index] = !prevStates[index]
      return newStatesWithFlippedStateAtIndex
    })
    console.log(`isShowDetails[${index}]: ` + isShowDetails[index])
  }

  return (
    <Accordion
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
          {/* {props.section} {props.grade} ({props.issueCount}) */}
          {props.section} someGrade ({props.issueCount})
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        {props.details.map((detail, i) => (
          <Box sx={{ marginBottom: 1, borderRadius: 2 }} p={2} bgcolor={props.backgroundColor} key={i}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography gutterBottom sx={{ pb: 2 }}>
                <b>Rule: {detail.rule}</b>
              </Typography>
              <Button variant="outlined" onClick={() => handleShowDetails(i)}>
                {isShowDetails[i] ? 'HIDE DETAILS' : 'SHOW DETAILS'}
              </Button>
            </Box>
            {isShowDetails[i] && (
              <>
                <Typography gutterBottom sx={{ pb: 2 }}>
                  <b>Description</b>:
                  <br />
                  {detail.description}
                </Typography>
                <ScorecardTabs></ScorecardTabs>
              </>
            )}
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

interface ScorecardBestPracticeResultsProps {
  section: string
  results: ScorecardBestPracticeResultType[]
  errorRef: React.RefObject<HTMLDivElement>
}

export default function ScorecardBestPracticeResults(props: ScorecardBestPracticeResultsProps) {
  // const [errorDisabled, setErrorDisabled] = useState(false)
  // const errors = props.results.filter((result) => result?.type.includes('Error'))
  // console.log(errors)
  // useEffect(() => {
  //   _.isEmpty(errors) && setErrorDisabled(true)
  // }, [errors])
  return (
    <Box>
      <Box>
        {/* <Typography id={props.category} variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          relatedSection: {props.category}
        </Typography> */}
      </Box>
      <DetailsAccordion
        disabled={false}
        refLink={props.errorRef}
        details={props.results}
        leftBorderColor={palette.successLight} //TODO: make dynamic color based on grade
        backgroundColor={'ghostWhite'}
        defaultExpanded={true}
        section={props.section}
        issueCount={props.results.length}
      />
    </Box>
  )
}
