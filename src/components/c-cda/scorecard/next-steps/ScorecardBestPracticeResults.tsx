import palette from '@/styles/palette'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ConstantsEnum, SectionNameEnum } from '../types/ScorecardConstants'
import { ScorecardCategoryList, ScorecardCategoryRubric } from '../types/ScorecardJsonResponseType'
import ScorecardTabs from './ScorecardTabs'
import Link from 'next/link'

interface DetailsAccordionProps {
  disabled: boolean
  refLink: React.RefObject<HTMLDivElement>
  allSections: ScorecardCategoryList[]
  currentSection: ScorecardCategoryList
  currentSectionIndex: number
  defaultExpanded?: boolean
  leftBorderColor: string
  backgroundColor: string
}

const DetailsAccordion = (props: DetailsAccordionProps) => {
  const [isShowDetails, setIsShowDetails] = useState(Array(props.allSections.length).fill(false))

  const handleShowDetails = (index: number) => {
    console.log('enter clickShowDetails, flipping show/hide state of index: ' + index)
    setIsShowDetails((prevStates) => {
      const newStatesWithFlippedStateAtIndex = [...prevStates]
      newStatesWithFlippedStateAtIndex[index] = !prevStates[index]
      return newStatesWithFlippedStateAtIndex
    })
    console.log(`isShowDetails[${index}]: ` + isShowDetails[index])
  }

  const rubrics: ScorecardCategoryRubric[] = props.allSections[props.currentSectionIndex].categoryRubrics
  const rubricsWithIssues: ScorecardCategoryRubric[] = rubrics.filter((rubric) => rubric.numberOfIssues > 0)
  const rubricsWithIssuesCount: number = rubricsWithIssues.length

  const IgLink = () => (
    <Link href={ConstantsEnum.IG_URL} target="_blank" rel="noreferrer noopener">
      C-CDA Implementation Guide
    </Link>
  )

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
        <Typography sx={{ border: `` }}>
          {/* {props.section} {props.grade} ({props.issueCount}) */}
          <b>
            {props.currentSection.categoryName} {props.currentSection.categoryGrade}
          </b>{' '}
          (<b>{props.currentSection.numberOfIssues}</b> Total Issues | <b>{rubricsWithIssuesCount}</b> Unique Issue
          {rubricsWithIssuesCount > 1 && 's'})
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        {rubricsWithIssues.map((curRubric, i) => (
          <Box sx={{ marginBottom: 1, borderRadius: 5 }} p={2} bgcolor={props.backgroundColor} key={i}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '80%', textAlign: 'left' }}>
                <Typography gutterBottom sx={{ pb: 2 }}>
                  <b>Rule: {curRubric.rule}</b>
                </Typography>
              </Box>
              <Box sx={{ width: '20%', textAlign: 'right' }}>
                <Button variant="outlined" onClick={() => handleShowDetails(i)}>
                  {isShowDetails[i] ? 'HIDE DETAILS' : 'SHOW DETAILS'}
                </Button>
              </Box>
            </Box>
            {isShowDetails[i] && (
              <>
                <Typography component="div" gutterBottom sx={{ pb: 2 }}>
                  <b>Description</b>:
                  <br />
                  {curRubric?.description ? curRubric.description : SectionNameEnum.UNKNOWN}
                  <br />
                  <br />
                  <Box component="span">
                    {curRubric.igReferences[0] && curRubric.igReferences[0] === ConstantsEnum.IG_URL && (
                      <>
                        Please refer to the&nbsp;<IgLink></IgLink>&nbsp;for help resolving the issue.
                      </>
                    )}
                    {curRubric.igReferences[0] && curRubric.igReferences[0] !== ConstantsEnum.IG_URL && (
                      <>
                        Please refer to:&nbsp;
                        {curRubric.igReferences.map((igRef, index) => (
                          <Box component="span" key={index}>
                            {igRef}
                            {index < curRubric.igReferences.length - 1 ? ',' : ''}
                          </Box>
                        ))}
                        &nbsp;in the <IgLink></IgLink>&nbsp;for help resolving the issue.
                      </>
                    )}
                  </Box>
                </Typography>
                <ScorecardTabs rubric={curRubric}></ScorecardTabs>
              </>
            )}
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

interface ScorecardBestPracticeResultsProps {
  allSections: ScorecardCategoryList[]
  currentSection: ScorecardCategoryList
  errorRef: React.RefObject<HTMLDivElement>
  currentSectionIndex: number
}

export default function ScorecardBestPracticeResults(props: ScorecardBestPracticeResultsProps) {
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
        allSections={props.allSections}
        currentSection={props.currentSection}
        leftBorderColor={palette.successLight} //TODO: make dynamic color based on grade
        backgroundColor={'ghostWhite'}
        defaultExpanded={true}
        currentSectionIndex={props.currentSectionIndex}
      />
    </Box>
  )
}
