import {
  ScorecardReferenceResultType,
  ScorecardResultsType,
} from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import { Box, Divider, FormControlLabel, styled, Switch, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { removeHashtagToUseHrefLinkAsIdForAnchor } from '../serverside/scorecardHelperService'
import { HrefLinkValueEnum, SORT_ORDER_STARTING_VALUE, SortOrderEnum } from '../types/ScorecardConstants'
import ScorecardDetailedResults from './ScorecardDetailedResults'
import ScorecardHeatMap from './ScorecardHeatMap'
import palette from '@/styles/palette'

interface ScorecardNextStepsProps {
  results: ScorecardResultsType | undefined
  igResults: ScorecardReferenceResultType
  vocabResults: ScorecardReferenceResultType
  sortFunction: (results: ScorecardResultsType | undefined, isAscending: boolean) => void
}

export default function ScorecardNextSteps({
  results,
  igResults,
  vocabResults,
  sortFunction,
}: ScorecardNextStepsProps) {
  const [isAscendingOrderChecked, setIsAscendingOrderChecked] = useState(SORT_ORDER_STARTING_VALUE)

  // Runs the sort when the switch is toggled (based on state change)
  useEffect(() => {
    sortFunction(results, isAscendingOrderChecked)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAscendingOrderChecked]) // we ONLY want to depend on isAscendingOrderChecked to call the sort function

  const handleSortSwitchChange = () => {
    setIsAscendingOrderChecked((prevIsAscendingOrderChecked) => !prevIsAscendingOrderChecked)
  }

  const StyledFormControlLabelWithLabelOnLeft = styled(FormControlLabel)`
    display: flex;
    flex-direction: row;
  `

  return (
    <Box>
      <Box sx={{ pb: 3 }}>
        <Box display={'flex'} flexDirection={'row'} justifyContent="space-between">
          <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 2, pb: 2 }}>
            Next Steps
          </Typography>
        </Box>
        <Typography variant="h6">
          The number of issues and grade for each of the sections of information present in your document are shown in
          the &quot;Heat Map&quot; below. You can use it to quickly identify areas within the document that require the
          most attention. Click on each of the buttons with identified issues to navigate to the relevant detailed
          results. Note: Sections with errors and sections which do not exist in the document do not receive a grade.
        </Typography>
        <Box display={'flex'} px={1} py={2}>
          <StyledFormControlLabelWithLabelOnLeft
            control={
              <Switch
                checked={isAscendingOrderChecked}
                onChange={handleSortSwitchChange}
                color="secondary"
                size="small"
              />
            }
            label={`Sorted by: ${isAscendingOrderChecked ? SortOrderEnum.ASCENDING : SortOrderEnum.DESCENDING} order`}
            name="wrapped"
          />
        </Box>
      </Box>

      <ScorecardHeatMap results={results}></ScorecardHeatMap>
      <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.DETAILED_RESULTS)}>
        <ScorecardDetailedResults
          results={results}
          igResults={igResults}
          vocabResults={vocabResults}
          isAscendingOrderSort={isAscendingOrderChecked}
        />
      </Box>
      <Divider />
    </Box>
  )
}
