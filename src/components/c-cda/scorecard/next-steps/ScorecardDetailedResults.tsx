import {
  ScorecardCategory,
  ScorecardReferenceResultType,
  ScorecardResultsType,
} from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import { Box, Typography } from '@mui/material'
import { useRef } from 'react'
import {
  getSectionHrefLinkValueAsAnchor,
  removeHashtagToUseHrefLinkAsIdForAnchor,
} from '../serverside/scorecardHelperService'
import { HrefLinkValueEnum } from '../types/ScorecardConstants'
import ScorecardBaseCheckResults from './ScorecardBaseCheckResults'
import ScorecardBestPracticeResults from './ScorecardBestPracticeResults'

interface ScorecardDetailedResultsProps {
  results: ScorecardResultsType | undefined
  igResults: ScorecardReferenceResultType
  vocabResults: ScorecardReferenceResultType
  isAscendingOrderSort: boolean
}

export default function ScorecardDetailedResults({
  results,
  igResults,
  vocabResults,
  isAscendingOrderSort,
}: ScorecardDetailedResultsProps) {
  const mdhtErrorRef = useRef<HTMLDivElement>(null)

  const sections: ScorecardCategory[] | undefined = results?.categoryList

  const sectionsWithIssues: ScorecardCategory[] | undefined = (() => {
    if (results && results.numberOfIssues > 0) {
      return sections?.filter((section) => section.numberOfIssues > 0)
    }
    return undefined
  })()

  const ConformanceErrors = () => {
    return (
      <span id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.CONFORMANCE)}>
        <ScorecardBaseCheckResults
          category={'Conformance Errors'}
          results={igResults.referenceErrors}
          errorRef={mdhtErrorRef}
        />
      </span>
    )
  }

  const VocabularyErrors = () => {
    return (
      <span id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.VOCAB)}>
        <ScorecardBaseCheckResults
          category={'Vocabulary Errors'}
          results={vocabResults.referenceErrors}
          errorRef={mdhtErrorRef}
        />
      </span>
    )
  }

  // TODO?: Maybe these results will eventually be hidden/only show one category at a time,
  // based on what category is clicked via heat map or side nav. Maybe all is shown to start,
  // but a click causes isolation? That way, it works for either workflow depending on the user's needs
  // Maybe it's configurable, because, it kind of makes sort useless for detailed results (not for heatmap)
  return (
    <Box sx={{ pb: 3 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', pb: 3, pt: 2 }}>
        Detailed Results
      </Typography>

      {/* IG and Vocab Results */}
      {/* When sorting, we have the display of IG and vocab order and location change based on sort direction*/}
      {isAscendingOrderSort && (
        <>
          <ConformanceErrors />
          <VocabularyErrors />
        </>
      )}

      {/* Scorecard Issue Results */}
      {sectionsWithIssues?.map((curSection: ScorecardCategory, index) => (
        <Box
          key={`${curSection.categoryName}-${curSection.categoryNumericalScore}-${index}`}
          id={getSectionHrefLinkValueAsAnchor(curSection)}
          sx={{ pb: 2 }}
        >
          <ScorecardBestPracticeResults
            allSections={sectionsWithIssues} // we could pass sections here instead to maintain full list if needed
            currentSection={curSection}
            currentSectionIndex={index}
            errorRef={mdhtErrorRef}
          />
        </Box>
      ))}

      {/* When sorting, we have the display of IG and vocab order and location change based on sort direction*/}
      {!isAscendingOrderSort && (
        <>
          <VocabularyErrors />
          <ConformanceErrors />
        </>
      )}
    </Box>
  )
}
