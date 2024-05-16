import React from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import palette from '@/styles/palette'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function ValidationResultsSCCReferenceCCDAValidation() {
  return (
    <>
      <Accordion
        sx={{
          py: 0,
          '&:before': {
            display: 'none',
          },
          borderLeft: `4px solid ${palette.error}`,
        }}
        disableGutters
        elevation={1}
      >
        <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', border: `` }}>Errors</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          <Box sx={{ marginBottom: 1 }} p={2} bgcolor={palette.errorLight}>
            <Typography>Result Description:</Typography>
            <Typography>XPath:</Typography>
            <Typography>Line Number:</Typography>
          </Box>
          <Box sx={{ marginBottom: 1 }} p={2} bgcolor={palette.errorLight}>
            <Typography>Result Description:</Typography>
            <Typography>XPath:</Typography>
            <Typography>Line Number:</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          py: 0,
          '&:before': {
            display: 'none',
          },
          borderLeft: `4px solid ${palette.warning}`,
        }}
        disableGutters
        elevation={1}
      >
        <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', border: `` }}>Warnings</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          <Box sx={{ marginBottom: 1 }} p={2} bgcolor={palette.warningLight}>
            <Typography>Result Description:</Typography>
            <Typography>XPath:</Typography>
            <Typography>Line Number:</Typography>
          </Box>
          <Box sx={{ marginBottom: 1 }} p={2} bgcolor={palette.warningLight}>
            <Typography>Result Description:</Typography>
            <Typography>XPath:</Typography>
            <Typography>Line Number:</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Info Template Accordion */}
      <Accordion
        sx={{
          py: 0,
          '&:before': {
            display: 'none',
          },
          borderLeft: `4px solid ${palette.primary}`,
        }}
        disableGutters
        elevation={1}
      >
        <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', border: `` }}>Info</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          <Box sx={{ marginBottom: 1 }} p={2} bgcolor={palette.secondaryLight}>
            <Typography>Result Description:</Typography>
            <Typography>XPath:</Typography>
            <Typography>Line Number:</Typography>
          </Box>
          <Box sx={{ marginBottom: 1 }} p={2} bgcolor={palette.secondaryLight}>
            <Typography>Result Description:</Typography>
            <Typography>XPath:</Typography>
            <Typography>Line Number:</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
