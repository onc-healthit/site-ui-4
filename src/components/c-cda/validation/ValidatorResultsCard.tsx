import React, { FC, useRef } from 'react'
import {
  Backdrop,
  Card,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ResultsStatusCard from './ResultsStatusCard'
import ValidationStatusIndicator from './ValidationStatusIndicator'

interface ValidatorResultsCardProps {
  open: boolean
  handleClose: () => void
}

const ValidatorResultsCard: FC<ValidatorResultsCardProps> = ({ open, handleClose }) => {
  const handleBackToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0
    }
  }

  const mainContentRef = useRef<HTMLDivElement>(null)
  const errors = ['1 Error in C-CDA MDHT Conformance']
  const warnings = ['1 Warning']
  const infos = ['1 Info', '1 Info', '1 Info']

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
      <Card
        sx={{
          position: 'absolute',
          width: '85%',
          height: '80%',
          minWidth: 300,
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Validation Results</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          <Box sx={{ width: '20%', borderRight: 1, borderColor: 'divider' }}>
            <Typography sx={{ p: 2, fontWeight: 'bold' }}>Summary & Results</Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold' }}>S&CC Vocabulary Validation Conformance</Typography>
              </AccordionSummary>
              <AccordionDetails>{/* future accordion options */}</AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold' }}>S&CC Reference C-CDA Validation</Typography>
              </AccordionSummary>
              <AccordionDetails>{/* future accordion options */}</AccordionDetails>
            </Accordion>

            <Typography sx={{ p: 2, fontWeight: 'bold' }}>Original C-CDA</Typography>
          </Box>

          <Box ref={mainContentRef} sx={{ width: '80%', overflow: 'auto', p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Summary
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Thank you for using our CCDA (Consolidated Clinical Document Architecture) Validator. We have processed
              your CCDA file and here is a summary of the validation results:
            </Typography>
            <ValidationStatusIndicator status="error" />
            <ValidationStatusIndicator status="warning" />
            <ValidationStatusIndicator status="pass" />

            <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Detailed Report:</Typography>
            <Typography sx={{ mt: 2 }}>
              Pass: Your CCDA document has successfully passed our validation process. Congratulations! It complies with
              the CCDA standards, ensuring its interoperability and correctness.
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Warning: Your CCDA document has passed the basic validation, but there are some issues that need your
              attention. Please review the warnings below and take necessary actions to enhance the quality of your
              document.
            </Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>
              Fail: Unfortunately, your CCDA document did not pass the validation. It indicates significant issues that
              must be resolved. Please review the errors below for detailed information on what needs to be corrected.
            </Typography>

            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              Results Total
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '0 1 auto' }}>
                <ResultsStatusCard type="error" count={1} messages={errors} />
              </Box>
              <Box sx={{ flex: '0 1 auto' }}>
                <ResultsStatusCard type="warning" count={1} messages={warnings} />
              </Box>
              <Box sx={{ flex: '0 1 auto' }}>
                <ResultsStatusCard type="info" count={3} messages={infos} />
              </Box>
            </Box>

            <Typography sx={{ mt: 4, fontWeight: 'bold' }}>C-CDA MDHT Conformance</Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Button variant="contained" color="primary">
            Save Results
          </Button>
          <Button variant="text" startIcon={<KeyboardArrowUpIcon />} onClick={handleBackToTop}>
            Back to Top
          </Button>
        </Box>
      </Card>
    </Backdrop>
  )
}

export default ValidatorResultsCard
