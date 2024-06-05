import React, { useEffect, useRef } from 'react'
import { Box, Typography, Button, DialogActions, IconButton } from '@mui/material'
import palette from '@/styles/palette'
import DialogTemplate from '../../../shared/dialog/DialogTemplate'
import ValidatorResultsSummary from './ValidationResultsSummary'
import ValidatorMenu from './ValidationMenu'
import CloseIcon from '@mui/icons-material/Close'
import { useReactToPrint } from 'react-to-print'

// Define props interface for ScrollableDialog
interface ScrollableDialogProps {
  open: boolean
  handleClose: () => void
  results: object
  fileName: string
}

// Define ScrollableDialog component
const ScrollableDialog: React.FC<ScrollableDialogProps> = ({ open, handleClose, results, fileName }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const mdhtErrorRef = useRef<HTMLDivElement>(null)
  const mdhtWarningRef = useRef<HTMLDivElement>(null)
  const mdhtInfoRef = useRef<HTMLDivElement>(null)
  const vocabularyErrorRef = useRef<HTMLDivElement>(null)
  const vocabularyWarningRef = useRef<HTMLDivElement>(null)
  const vocabularyInfoRef = useRef<HTMLDivElement>(null)
  const referenceErrorRef = useRef<HTMLDivElement>(null)
  const referenceWarningRef = useRef<HTMLDivElement>(null)
  const referenceInfoRef = useRef<HTMLDivElement>(null)
  const originalCCDARef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  })
  return (
    <DialogTemplate
      open={open}
      handleClose={handleClose}
      title={
        <>
          <Typography sx={{ fontWeight: '600' }}>
            {'Validation Results for '}
            {fileName}
          </Typography>
          <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </>
      }
      menuContent={
        <ValidatorMenu
          results={results}
          summaryRef={summaryRef}
          mdhtErrorRef={mdhtErrorRef}
          mdhtWarningRef={mdhtWarningRef}
          mdhtInfoRef={mdhtInfoRef}
          vocabularyErrorRef={vocabularyErrorRef}
          vocabularyWarningRef={vocabularyWarningRef}
          vocabularyInfoRef={vocabularyInfoRef}
          referenceErrorRef={referenceErrorRef}
          referenceWarningRef={referenceWarningRef}
          referenceInfoRef={referenceInfoRef}
          originalCCDARef={originalCCDARef}
        />
      }
      resultsContent={
        <ValidatorResultsSummary
          results={results}
          scrollRef={contentRef}
          summaryRef={summaryRef}
          mdhtErrorRef={mdhtErrorRef}
          mdhtWarningRef={mdhtWarningRef}
          mdhtInfoRef={mdhtInfoRef}
          vocabularyErrorRef={vocabularyErrorRef}
          vocabularyWarningRef={vocabularyWarningRef}
          vocabularyInfoRef={vocabularyInfoRef}
          referenceErrorRef={referenceErrorRef}
          referenceWarningRef={referenceWarningRef}
          referenceInfoRef={referenceInfoRef}
          originalCCDARef={originalCCDARef}
        />
      } // Pass ref to ValidatorResultsSummary
      actionsContent={
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderTop: `1px solid ${palette.divider}`,
          }}
        >
          <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={'center'}>
            <Button variant="contained" color="primary" onClick={handlePrint}>
              Save Results
            </Button>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <Typography color={palette.error}>*</Typography>
              <Typography variant="subtitle1">Saving is limited to expanded sections.</Typography>
            </Box>
          </Box>
          <Button variant="outlined" onClick={scrollToTop}>
            Back to Top
          </Button>
        </DialogActions>
      }
    />
  )
}

// Define props interface for ValidatorResultsCard
interface ValidatorResultsCardProps {
  open: boolean
  handleClose: () => void
  results: object
  fileName: string
}

// Define ValidatorResultsCard component
const ValidatorResultsCard: React.FC<ValidatorResultsCardProps> = ({ open, handleClose, results, fileName }) => {
  return <ScrollableDialog open={open} handleClose={handleClose} results={results} fileName={fileName} />
}

export default ValidatorResultsCard
