import { Box, Typography } from '@mui/material'
import ScorecardHeatMap from './ScorecardHeatMap'
import ScorecardDetailedResults from './ScorecardDetailedResults'

export default function ScorecardNextSteps() {
  return (
    <Box>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 2, pb: 2 }}>
          Next Steps
        </Typography>
        <Typography variant="h6">
          Grades and the number of issues for each of the sections of information present in your document are shown
          below. You can use it to quickly identify areas within the document that require the most attention. Click on
          each of the buttons to navigate to the appropriate part of the report that contains additional details on the
          identified issues.
        </Typography>
      </Box>
      <ScorecardHeatMap></ScorecardHeatMap>
      <ScorecardDetailedResults></ScorecardDetailedResults>
    </Box>
  )
}
