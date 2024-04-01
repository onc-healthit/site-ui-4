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
import ValidatorResultsSummary from './ValidationResultsSummary'

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
            <ValidatorResultsSummary />
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
