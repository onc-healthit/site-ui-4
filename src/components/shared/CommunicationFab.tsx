'use client'
import React, { useState } from 'react'
import {
  Drawer,
  Fab,
  Box,
  Button,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material'

import SecurityIcon from '@mui/icons-material/Security'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

import palette from '@/styles/palette'
const drawerWidth = 300

const CommunicationFab: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const placeholder = '../shared/PlaceHolderImageSITE.png'
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        PaperProps={{
          style: {
            width: drawerWidth,
            zIndex: 1400,
          },
        }}
      >
        <Box p={2} display={'flex'} flexDirection={'column'} gap={4}>
          <Card>
            <CardMedia style={{ height: '200px' }} component="div" image={placeholder} />
            <CardHeader title="New release of UI, gets great feedback from users" />
            <CardContent>
              <Typography>
                Users love the latest UI release! Improved design, enhanced user experience, and new features are
                receiving high praise.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="text" color="secondary">
                Learn More
              </Button>
            </CardActions>
          </Card>
          <Box display={'flex'} flexDirection={'column'} gap={4}>
            <Button
              aria-label="Access Forum"
              target="_blank"
              href="https://groups.google.com/g/edge-test-tool"
              sx={{
                boxShadow:
                  '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: '4px',
                alignItems: 'center',
                textTransform: 'capitalize',
              }}
            >
              <Typography variant="body1" color="primary">
                <strong>Access Forum</strong>
              </Typography>
              <ExitToAppIcon fontSize="small" htmlColor={palette.primaryDark} />
            </Button>
            <Button
              aria-label="Health Data Standards"
              target="_blank"
              href="https://www.healthit.gov/topic/interoperability/standards-and-technology"
              sx={{
                boxShadow:
                  '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: '4px',
                alignItems: 'center',
                textTransform: 'capitalize',
              }}
            >
              <Typography color="primary">
                <strong>Health Data Standards</strong>
              </Typography>
              <SecurityIcon fontSize="small" htmlColor={palette.primaryDark} />
            </Button>
            <Button
              target="_blank"
              aria-label="Email your Question"
              href="mailto:edge-test-tool@googlegroups.com"
              sx={{
                boxShadow:
                  '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                display: 'flex',
                padding: '8px',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: '4px',
                alignItems: 'center',
                textTransform: 'capitalize',
              }}
            >
              <Typography title="Questions & Inquires" color="primary">
                <strong>Questions & Inquires</strong>
              </Typography>
              <MoreVertIcon fontSize="small" htmlColor={palette.primaryDark} />
            </Button>
          </Box>
        </Box>
        <Fab
          onClick={handleDrawerClose}
          size="small"
          color="inherit"
          aria-label="Close Info"
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          <CloseIcon fontSize="small" htmlColor={palette.error} />
        </Fab>
        <Typography
          sx={{ position: 'fixed', bottom: '12px', padding: '0 16px 8px 16px', fontSize: '10px' }}
          variant="caption"
          color={palette.greyDark}
        >
          Version 4 <br /> Release March 21,2024
        </Typography>
      </Drawer>
      <Fab
        color="secondary"
        aria-label="Open Info"
        size="small"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={handleDrawerOpen}
      >
        <InfoIcon fontSize="small" htmlColor={palette.white} />
      </Fab>
    </div>
  )
}

export default CommunicationFab
