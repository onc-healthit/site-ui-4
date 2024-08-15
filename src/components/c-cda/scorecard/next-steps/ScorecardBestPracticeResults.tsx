import palette from '@/styles/palette'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import { getGradeStyleValueByProperty } from '../serverside/scorecardHelperService'
import { ConstantsEnum, GradeEnum, gradeStyleMap, SectionNameEnum } from '../types/ScorecardConstants'
import { ScorecardCategory, ScorecardCategoryRubric } from '../types/ScorecardJsonResponseType'
import ScorecardTabs from './ScorecardTabs'

interface DetailsAccordionProps {
  disabled: boolean
  allSections: ScorecardCategory[]
  currentSection: ScorecardCategory
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
        {rubricsWithIssues.map((curRubric: ScorecardCategoryRubric, rubricIndex) => (
          <Box
            sx={{ marginBottom: 1, borderRadius: 0 }}
            p={2}
            bgcolor={props.backgroundColor}
            key={`${curRubric.rule}-${curRubric.numberOfIssues}-${rubricIndex}`}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '80%', textAlign: 'left' }}>
                <Typography gutterBottom sx={{ pb: 2 }}>
                  <b>Rule: {curRubric.rule}</b>
                </Typography>
              </Box>
              <Box sx={{ width: '20%', textAlign: 'right' }}>
                <Button variant="outlined" onClick={() => handleShowDetails(rubricIndex)}>
                  {isShowDetails[rubricIndex] ? 'HIDE DETAILS' : 'SHOW DETAILS'}
                </Button>
              </Box>
            </Box>
            {isShowDetails[rubricIndex] && (
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
                        {curRubric.igReferences.map((igRef, igRefIndex) => (
                          <Box component="span" key={igRefIndex}>
                            {igRef}
                            {igRefIndex < curRubric.igReferences.length - 1 ? ',' : ''}
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
  allSections: ScorecardCategory[]
  currentSection: ScorecardCategory
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
        allSections={props.allSections}
        currentSection={props.currentSection}
        // dynamic color based on grade with default if null
        leftBorderColor={
          getGradeStyleValueByProperty(props.currentSection, 'backgroundColor') ??
          gradeStyleMap[GradeEnum.NULL_OR_EMPTY_SECTION].backgroundColor
        }
        backgroundColor={'ghostWhite'}
        defaultExpanded={true}
        currentSectionIndex={props.currentSectionIndex}
      />
    </Box>
  )
}
