import {
  ScorecardCategoryList,
  ScorecardJsonResponseType,
  ScorecardReferenceResultType,
  ScorecardResultsType,
} from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import { Box, Typography } from '@mui/material'
import React, { useRef } from 'react'
import ScorecardBaseCheckResults from './ScorecardBaseCheckResults'
import ScorecardBestPracticeResults from './ScorecardBestPracticeResults'

interface ScorecardResultsSummaryProps {
  json: ScorecardJsonResponseType | undefined
  results: ScorecardResultsType | undefined
  igResults: ScorecardReferenceResultType
  vocabResults: ScorecardReferenceResultType
}

export default function ScorecardResultsSummary({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  json, // TODO: Remove if not used in the future - may be needed for chart, nav, or heatmap
  results,
  igResults,
  vocabResults,
}: ScorecardResultsSummaryProps) {
  const mdhtErrorRef = useRef<HTMLDivElement>(null)

  const sections: ScorecardCategoryList[] | undefined = results?.categoryList

  const sectionsWithIssues: ScorecardCategoryList[] | undefined = (() => {
    if (results && results.numberOfIssues > 0) {
      return sections?.filter((section) => section.numberOfIssues > 0)
    }
    return undefined
  })()

  // TODO?: For the best functionality, maybe these results will eventually be hidden/only show one category at a time,
  // based on what category is clicked via heat map or side nav. Maybe all is shown to start,
  // but a click causes isolation. That way, it works for either workflow depending on the user's needs

  return (
    <Box sx={{ pb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 2, pt: 2 }}>
        Detailed Results
      </Typography>

      {/* IG and Vocab Results */}
      <ScorecardBaseCheckResults
        category={'Conformance Errors'}
        results={igResults.referenceErrors}
        errorRef={mdhtErrorRef}
      />
      <br />
      <ScorecardBaseCheckResults
        category={'Vocabulary Errors'}
        results={vocabResults.referenceErrors}
        errorRef={mdhtErrorRef}
      />
      <br />

      {/* Scorecard Issue Results */}
      {sectionsWithIssues?.map((curSection, index) => (
        <React.Fragment key={index}>
          <ScorecardBestPracticeResults
            allSections={sectionsWithIssues} // we could pass sections here instead to maintain full list if needed
            currentSection={curSection}
            currentSectionIndex={index}
            errorRef={mdhtErrorRef}
          />
          <br />
        </React.Fragment>
      ))}
    </Box>
  )
}
