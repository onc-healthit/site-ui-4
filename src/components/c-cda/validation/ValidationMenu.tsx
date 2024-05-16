import React from 'react'
import { Typography, Accordion, AccordionSummary, AccordionDetails, MenuItem, List, Avatar } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// Assuming palette is imported correctly from '@/styles/palette'
import palette from '@/styles/palette'

const ValidatorMenu = () => {
  return (
    <>
      <List>
        <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Summary & Results</MenuItem>
        <Accordion
          sx={{
            py: 1,
            '&:before': {
              display: 'none',
            },
          }}
          disableGutters
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold' }}>C-CDA MDHT Conformance </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Errors{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.error }}>
                  <Typography variant="caption">1</Typography>
                </Avatar>
              </MenuItem>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Warnings{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.warning }}>
                  <Typography variant="caption">2</Typography>
                </Avatar>
              </MenuItem>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Info{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.primary }}>
                  <Typography variant="caption">3</Typography>
                </Avatar>
              </MenuItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            '&:before': {
              display: 'none',
            },
          }}
          disableGutters
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold' }}>S&CC Vocabulary Validation Conformance</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Errors{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.error }}>
                  <Typography variant="caption">1</Typography>
                </Avatar>
              </MenuItem>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Warnings{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.warning }}>
                  <Typography variant="caption">2</Typography>
                </Avatar>
              </MenuItem>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Info{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.primary }}>
                  <Typography variant="caption">3</Typography>
                </Avatar>
              </MenuItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            '&:before': {
              display: 'none',
            },
          }}
          disableGutters
          elevation={0}
        >
          <AccordionSummary disabled expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold' }}>S&CC Reference C-CDA Validation</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Errors{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.error }}>
                  <Typography variant="caption">1</Typography>
                </Avatar>
              </MenuItem>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Warnings{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.warning }}>
                  <Typography variant="caption">2</Typography>
                </Avatar>
              </MenuItem>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Info{' '}
                <Avatar variant="circular" sx={{ width: 20, height: 20, bgcolor: palette.primary }}>
                  <Typography variant="caption">3</Typography>
                </Avatar>
              </MenuItem>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Repeat the same structure for other Accordion components */}

        <MenuItem sx={{ fontWeight: 'bold' }}>Original C-CDA</MenuItem>
      </List>
    </>
  )
}

export default ValidatorMenu
