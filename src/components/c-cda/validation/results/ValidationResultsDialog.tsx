import React, { useRef } from 'react'
import { Typography, Button, DialogActions, IconButton, Tooltip } from '@mui/material'
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

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  })
  const handleButtonClick = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Save Results', {
        event_category: 'Button',
        event_label: 'Print/Save Validator Results',
      })
    }

    handlePrint()
  }
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
          <Tooltip
            placement="right"
            arrow
            title={
              <span>
                <span style={{ color: palette.error }}>*</span>
                Saving is limited to expanded sections.
              </span>
            }
          >
            <Button variant="contained" color="primary" onClickCapture={handleButtonClick} onClick={handlePrint}>
              Save Results
            </Button>
          </Tooltip>
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
            href="#summary"
            variant="outlined"
          >
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
