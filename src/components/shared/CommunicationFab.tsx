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
import LinkButton from './LinkButton'

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
          <LinkButton
            label="Access Forum"
            url="https://groups.google.com/g/edge-test-tool"
            icon={<ExitToAppIcon fontSize="small" htmlColor={palette.primaryDark} />}
          />
          <LinkButton
            label="Health Data Standards"
            url="https://www.healthit.gov/topic/interoperability/standards-and-technology"
            icon={<SecurityIcon fontSize="small" htmlColor={palette.primaryDark} />}
          />
          <LinkButton
            label="Questions or Inquiries"
            url="mailto:edge-test-tool@googlegroups.com"
            icon={<MoreVertIcon fontSize="small" htmlColor={palette.primaryDark} />}
          />
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
