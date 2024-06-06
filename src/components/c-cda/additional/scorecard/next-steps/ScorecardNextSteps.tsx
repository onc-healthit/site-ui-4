import { Box, Typography } from '@mui/material'
import ScorecardHeatMap from './ScorecardHeatMap'
import ScorecardDetailedResults from './ScorecardDetailedResults'

export default function ScorecardNextSteps() {
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
      <ScorecardDetailedResults></ScorecardDetailedResults>
    </Box>
  )
}
