import { Box, Divider, Typography } from '@mui/material'
import ScorecardHeatMap from './ScorecardHeatMap'
import ScorecardResultsSummary from './ScorecardResultsSummary'
import {
  ScorecardJsonResponseType,
  ScorecardReferenceResultType,
  ScorecardResultsType,
} from '@/components/c-cda/additional/scorecard/types/ScorecardJsonResponseType'

interface ScorecardNextStepsProps {
  json: ScorecardJsonResponseType | undefined
  results: ScorecardResultsType | undefined
  igResults: ScorecardReferenceResultType
  vocabResults: ScorecardReferenceResultType
}

export default function ScorecardNextSteps({ json, results, igResults, vocabResults }: ScorecardNextStepsProps) {
  return (
    <Box>
      <Box sx={{ pb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 2, pb: 2 }}>
          Next Steps
        </Typography>
        <Typography variant="h6">
          The number of issues and grade for each of the sections of information present in your document are shown in
          the &quot;Heat Map&quot; below. You can use it to quickly identify areas within the document that require the
          most attention. Click on each of the buttons with identified issues to navigate to the relevant detailed
          results. Note: Sections with errors and sections which do not exist in the document do not receive a grade.
        </Typography>
      </Box>
      <ScorecardHeatMap></ScorecardHeatMap>
      <ScorecardResultsSummary json={json} results={results} igResults={igResults} vocabResults={vocabResults} />
      <Divider />
    </Box>
  )
}
