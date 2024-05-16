import React, { useRef } from 'react'
import { Typography, Button, DialogActions, IconButton } from '@mui/material'
import palette from '@/styles/palette'
import DialogTemplate from '../../../shared/dialog/DialogTemplate'
import ValidatorResultsSummary from './ValidationResultsSummary'
import ValidatorMenu from '../ValidationMenu'
import CloseIcon from '@mui/icons-material/Close'

// Define props interface for ScrollableDialog
interface ScrollableDialogProps {
  open: boolean
  handleClose: () => void
}

// Define ScrollableDialog component
const ScrollableDialog: React.FC<ScrollableDialogProps> = ({ open, handleClose }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  return (
    <DialogTemplate
      open={open}
      handleClose={handleClose}
      title={
        <>
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            Validation Results
          </Typography>
          <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </>
      }
      menuContent={<ValidatorMenu />}
      resultsContent={<ValidatorResultsSummary ref={contentRef} />} // Pass ref to ValidatorResultsSummary
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
          <Button variant="contained" color="primary">
            Save Results
          </Button>
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
}

// Define ValidatorResultsCard component
const ValidatorResultsCard: React.FC<ValidatorResultsCardProps> = ({ open, handleClose }) => {
  return <ScrollableDialog open={open} handleClose={handleClose} />
}

export default ValidatorResultsCard
