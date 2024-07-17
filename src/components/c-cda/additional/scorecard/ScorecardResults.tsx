'use client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  List,
  MenuItem,
} from '@mui/material'

import DialogTemplate from '@/components/shared/dialog/DialogTemplate' // Adjust the path if needed
import palette from '@/styles/palette'
import ScorecardNextSteps from './next-steps/ScorecardNextSteps'
import ScorecardBaseCheck from './summary/ScorecardBaseCheck'
import ScorecardBestPractice from './summary/ScorecardBestPractice'
import ScorecardCompare from './summary/ScorecardCompare'
import {
  ScorecardReferenceResultType,
  ScorecardJsonResponseType,
  ScorecardResultsType,
} from '@/types/ScorecardJsonResponseType'

interface ScorecardResultsProps {
  dialogState: boolean
  handleCloseDialog: () => void
  isTryMeDemo: boolean
  json: ScorecardJsonResponseType | undefined
  results: ScorecardResultsType | undefined
  igResults: ScorecardReferenceResultType
  vocabResults: ScorecardReferenceResultType
}

export default function ScorecardResults({
  dialogState,
  handleCloseDialog,
  isTryMeDemo,
  json,
  results,
  igResults,
  vocabResults,
}: ScorecardResultsProps) {
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
        title="Scorecard Results"
        menuContent={
          <List>
            <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Base Check</MenuItem>
            <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Best Practice</MenuItem>
            <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Compare</MenuItem>
            <Box sx={{ fontWeight: 'bold' }}>
              <Accordion disableGutters elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Next Steps</AccordionSummary>
                <AccordionDetails>
                  <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Allergies (5)</MenuItem>
                  <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Patient (10)</MenuItem>
                  <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Procedures (7)</MenuItem>
                  <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Social History (3)</MenuItem>
                  <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Vital Signs (12)</MenuItem>
                  <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Immunizations (4)</MenuItem>
                  <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Medications (6)</MenuItem>
                  <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Problems (8)</MenuItem>
                </AccordionDetails>
              </Accordion>
            </Box>
          </List>
        }
        resultsContent={
          <Box display={'flex'} flexDirection={'column'} gap={4} mt={2} px={4} pb={4} sx={{ overflowY: 'none' }}>
            <Box id="baseCheck">
              <ScorecardBaseCheck json={json} igResults={igResults} vocabResults={vocabResults} />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id="bestPractice">
              <ScorecardBestPractice results={results} />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id="compare">
              <ScorecardCompare />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id="nextSteps">
              <ScorecardNextSteps />
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
                <Button onClick={handleDownloadSampleDocument} color="primary" variant="contained">
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
