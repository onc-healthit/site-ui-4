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
import { useState } from 'react'
import ErrorDisplayCard from '../validation/results/ErrorDisplay'

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
  const [isSaveReportLoading, setIsSaveReportLoading] = useState(false)
  const [saveReportError, setSaveReportError] = useState('')

  const dividerPaddingStyle = {
    paddingTop: 2,
  }

  const handleSaveReport = async () => {
    console.log('Enter handleSaveReport()')

    setIsSaveReportLoading(true)
    setSaveReportError('')

    try {
      if (!json) {
        throw new Error('json is undefined, there is no data to save')
      }

      const scorecardApiUrl = process.env.NEXT_PUBLIC_SCORECARD_SAVESCORECARDSERVICE_API
      if (!scorecardApiUrl) {
        throw new Error('The Save Scorecard API URL is undefined, there is no valid endpoint to call')
      }

      console.log('Client API call running for save scorecard service ')
      // Note: CORS is configured on the server to allow trusted domains
      const response = await fetch(scorecardApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          'Accept': 'application/pdf',
        },
        body: JSON.stringify(json),
      })

      if (!response.ok) {
        throw new Error(`HTTP error encountered while saving scorecard results. Status: ${response.status}`)
      }

      console.log('POST request successful for save scorecard service, preparing to download file')
      const pdfBlobResponse = await response.blob()
      console.log('PDF blob response created', pdfBlobResponse)

      console.log('Downloading the file')
      const url = window.URL.createObjectURL(pdfBlobResponse)
      if (url) {
        console.log('Valid URL created from PDF blob response', url)
        const link = document.createElement('a')
        link.href = url
        link.download = json?.filename ? `SITE_C-CDA_Scorecard_${json.filename}.pdf` : 'scorecardReport.pdf'
        document.body.appendChild(link)
        console.log('Initiating download of scorecard report')
        link.click()
        link.remove()
      }
    } catch (error) {
      const errorMessagePrefix = 'Error saving scorecard report'
      console.error(`${errorMessagePrefix} in handleSaveReport():`, error)
      setSaveReportError(`${errorMessagePrefix}:
        ${error}. Please try again later.`)
    } finally {
      setIsSaveReportLoading(false)
    }
  }

  const handleDownloadSampleDocument = () => {
    console.log('Enter handleDownloadSampleDocument()')
    // Create an anchor element since next.js can use that cleanly to download a static asset in the public folder
    const locationPrefix = '/c-cda/scorecard/samples/'
    const link = document.createElement('a')
    link.setAttribute('download', '') // Force download vs nav, no filenmae set so uses default url name
    link.href = locationPrefix + (json?.filename ? json.filename : 'UnknownFilename.xml')
    document.body.appendChild(link)
    link.click()
    link.remove()
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
          <Box
            id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.TOP)}
            display={'flex'}
            flexDirection={'column'}
            gap={4}
            mt={2}
            px={4}
            pb={4}
            sx={{ overflowY: 'none' }}
          >
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
              <Button onClick={handleSaveReport} disabled={isSaveReportLoading} color="primary" variant="contained">
                {isSaveReportLoading ? 'Saving...' : 'Save Report'}
              </Button>
              <ErrorDisplayCard
                open={saveReportError ? true : false}
                handleClose={() => setSaveReportError('')}
                response={{ error: saveReportError }}
              />
              {isShowSampleDownloadButton && (
                <Button onClick={handleDownloadSampleDocument} color="primary" variant="outlined">
                  Download Sample Document
                </Button>
              )}
            </Box>
            <Button
              component="a"
              sx={{
                color: palette.primary,
                '&:hover': {
                  color: palette.primaryDark,
                },
                '&:visited': {
                  color: palette.primary,
                },
              }}
              href={HrefLinkValueEnum.TOP}
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
