'use client'
import { Box, Button, Container, Divider } from '@mui/material'

import {
  ScorecardJsonResponseType,
  ScorecardReferenceResultType,
  ScorecardResultsType,
} from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import DialogTemplate from '@/components/shared/dialog/DialogTemplate' // Adjust the path if needed
import palette from '@/styles/palette'
import ScorecardNextSteps from './next-steps/ScorecardNextSteps'
import ScorecardSideNav from './ScorecardSideNav'
import { removeHashtagToUseHrefLinkAsIdForAnchor } from './serverside/scorecardHelperService'
import ScorecardBaseCheckSummary from './summary/ScorecardBaseCheckSummary'
import ScorecardBestPracticeSummary from './summary/ScorecardBestPracticeSummary'
import ScorecardCompareChartSummary from './summary/ScorecardCompareChartSummary'
import { HrefLinkValueEnum } from './types/ScorecardConstants'

interface ScorecardResultsDialogProps {
  dialogState: boolean
  handleCloseDialog: () => void
  isTryMeDemo: boolean
  json: ScorecardJsonResponseType | undefined
  results: ScorecardResultsType | undefined
  igResults: ScorecardReferenceResultType
  vocabResults: ScorecardReferenceResultType
  sortFunction: (results: ScorecardResultsType | undefined, isAscending: boolean) => void
}

export default function ScorecardResultsDialog({
  dialogState,
  handleCloseDialog,
  isTryMeDemo,
  json,
  results,
  igResults,
  vocabResults,
  sortFunction,
}: ScorecardResultsDialogProps) {
  const dividerPaddingStyle = {
    paddingTop: 2,
  }

  const handleSaveReport = () => {
    console.log('Enter handleSaveReport()')
  }

  const handleDownloadSampleDocument = () => {
    console.log('Enter handleDownloadSampleDocument()')
  }

  const isShowSampleDownloadButton: boolean = isTryMeDemo

  return (
    <Container>
      <DialogTemplate
        open={dialogState}
        handleClose={handleCloseDialog}
        title={`Scorecard Results: ${json?.filename || 'Unknown Filename'}`}
        menuContent={<ScorecardSideNav results={results} />}
        resultsContent={
          <Box display={'flex'} flexDirection={'column'} gap={4} mt={2} px={4} pb={4} sx={{ overflowY: 'none' }}>
            <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.BASE_CHECK)}>
              <ScorecardBaseCheckSummary json={json} igResults={igResults} vocabResults={vocabResults} />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.BEST_PRACTICE)}>
              <ScorecardBestPracticeSummary results={results} />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.COMPARE)}>
              <ScorecardCompareChartSummary />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.NEXT_STEPS)}>
              <ScorecardNextSteps
                results={results}
                igResults={igResults}
                vocabResults={vocabResults}
                sortFunction={sortFunction}
              />
            </Box>
          </Box>
        }
        actionsContent={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderTop: `1px solid ${palette.divider}`,
            }}
          >
            <Box display={'flex'} gap={4}>
              <Button onClick={handleSaveReport} color="primary" variant="contained">
                Save Report
              </Button>
              {isShowSampleDownloadButton && (
                <Button onClick={handleDownloadSampleDocument} color="primary" variant="outlined">
                  Download Sample Document
                </Button>
              )}
            </Box>
            <Button
              sx={{
                color: palette.primary,
                '&:hover': {
                  color: palette.primaryDark,
                },
                '&:visited': {
                  color: palette.primary,
                },
              }}
              href="#baseCheck"
              variant="outlined"
            >
              Back to Top
            </Button>
          </Box>
        }
      />
    </Container>
  )
}
