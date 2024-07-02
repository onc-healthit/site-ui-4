'use client'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Drawer,
  Fab,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import InfoIcon from '@mui/icons-material/Info'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SecurityIcon from '@mui/icons-material/Security'
import LinkButton from './LinkButton'

import { fetchSanitizedMarkdownData } from '@/services/markdownToHTMLService'
import palette from '@/styles/palette'
import placeholder from '@public/shared/PlaceHolderImageSITE.png'
import Image from 'next/image'

const drawerWidth = 300

const CommunicationFab: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Open Info FAB', {
        event_category: 'Button',
        event_label: 'Communication Panel',
      })
    }
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Close Info FAB', {
        event_category: 'Button',
        event_label: 'Communication Panel',
      })
    }
  }

  const [releaseVersionHTML, setReleaseVersionHTML] = useState<string | undefined>()
  const [releaseDateHTML, setReleaseDateHTML] = useState<string | undefined>()

  const releaseVersionURL = 'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/version.md'
  const releaseDateURL = 'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/release-date.md'

  useEffect(() => {
    ;(async () => {
      try {
        setReleaseVersionHTML(await fetchSanitizedMarkdownData(releaseVersionURL))
        setReleaseDateHTML(await fetchSanitizedMarkdownData(releaseDateURL))
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

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
            <CardMedia sx={{ width: 'auto' }}>
              <Image style={{ width: 'auto', height: 'auto' }} src={placeholder} alt="Placeholder" />
            </CardMedia>
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
        <Tooltip arrow placement="left" title="Close Information Panel">
          <Fab
            onClick={handleDrawerClose}
            size="small"
            color="inherit"
            aria-label="Close Info"
            style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          >
            <CloseIcon fontSize="small" htmlColor={palette.error} />
          </Fab>
        </Tooltip>
        <Typography
          sx={{ position: 'fixed', bottom: '12px', padding: '0 16px 8px 16px', fontSize: '12px' }}
          variant="caption"
          color={palette.greyDark}
        >
          {releaseVersionHTML && <div dangerouslySetInnerHTML={{ __html: releaseVersionHTML }} />}
          {releaseDateHTML && <div dangerouslySetInnerHTML={{ __html: releaseDateHTML }} />}
        </Typography>
      </Drawer>
      <Tooltip arrow placement="left" title="Open Information Panel">
        <Fab
          color="secondary"
          aria-label="Open Info"
          size="small"
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          onClick={handleDrawerOpen}
        >
          <InfoIcon id="communication-Fab" fontSize="small" htmlColor={palette.white} />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default CommunicationFab
