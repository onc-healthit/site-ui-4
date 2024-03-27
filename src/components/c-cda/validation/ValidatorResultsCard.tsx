import React, { FC } from 'react'
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
import ValidationComponent from './ValidatorLoadingCard'

interface ValidatorResultsCardProps {
  open: boolean
  handleClose: () => void
}

const ValidatorResultsCard: FC<ValidatorResultsCardProps> = ({ open, handleClose }) => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
      <Card
        sx={{ position: 'absolute', width: '60%', height: '80%', minWidth: 300, overflow: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Validation Results</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', height: 'calc(100% - 104px)' }}>
          <Box sx={{ width: '30%', borderRight: 1, borderColor: 'divider' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Summary & Results</Typography>
              </AccordionSummary>
              <AccordionDetails>{/* Content here */}</AccordionDetails>
            </Accordion>
            {/* Accordion items */}
          </Box>
          <Box sx={{ width: '70%', p: 2 }}>{/* Main results content, i'll fill in later */}</Box>
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
