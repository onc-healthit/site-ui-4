'use client'
import React, { useEffect, useState } from 'react'
import { Box, Drawer, Fab, Tooltip, Typography, IconButton, Snackbar, Alert, Divider, CardHeader } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import NotificationImportant from '@mui/icons-material/NotificationImportant'

import { fetchSanitizedMarkdownData } from '@/services/markdownToHTMLService'
import palette from '@/styles/palette'

interface Announcement {
  id: string
  content: string
}

const AnnouncementsFab: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<Set<string>>(new Set())
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Fetch announcement data from your markdown source
  const fetchAnnouncements = async () => {
    try {
      // Example announcement content with unique IDs
      const fetchedAnnouncements: Announcement[] = [
        {
          id: '1',
          content: `The SITE tools do not retain your submitted files. However, we strongly suggest that you do not include any Protected Health Information (PHI) or Personally Identifiable Information (PII) in your file submissions within our tools. <a href="https://www.example.com">Click here for more information</a> on how to de-identify PHI.`,
        },
        {
          id: '2',
          content: `The SITE tools do not retain your submitted files. However, we strongly suggest that you do not include any Protected Health Information (PHI) or Personally Identifiable Information (PII) in your file submissions within our tools. <a href="https://www.example.com">Click here for more information</a> on how to de-identify PHI.`,
        },
        {
          id: '3',
          content: `The SITE tools do not retain your submitted files. However, we strongly suggest that you do not include any Protected Health Information (PHI) or Personally Identifiable Information (PII) in your file submissions within our tools. <a href="https://www.example.com">Click here for more information</a> on how to de-identify PHI.`,
        },
      ]

      setAnnouncements(fetchedAnnouncements)

      // Show snackbar if there are any announcements
      if (fetchedAnnouncements.length > 0) {
        setSnackbarOpen(true)
      }
    } catch (error) {
      console.error('Failed to fetch announcements:', error)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

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

  const handleDismissAnnouncement = (id: string) => {
    setDismissedAnnouncements((prevDismissed) => {
      const updatedDismissed = new Set(prevDismissed)
      updatedDismissed.add(id)
      return updatedDismissed
    })
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const undismissedAnnouncements = announcements.filter((announcement) => !dismissedAnnouncements.has(announcement.id))

  // Automatically close the drawer if all announcements are dismissed
  useEffect(() => {
    if (undismissedAnnouncements.length === 0 && drawerOpen) {
      handleDrawerClose()
    }
  }, [undismissedAnnouncements.length, drawerOpen])

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        PaperProps={{
          style: {
            width: '500px',
            zIndex: 1400,
          },
        }}
      >
        <Box p={2}>
          <CardHeader
            title="Announcements Panel"
            subheader={`You have ${undismissedAnnouncements.length} new notifications`}
          />
          <Divider />
          <Box>
            {undismissedAnnouncements.map((announcement) => (
              <Box
                key={announcement.id}
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                p={4}
                gap={4}
                bgcolor={'#F2D0A764'}
                mb={2}
                border={1}
                borderColor="divider"
                borderRadius={1}
                boxShadow={0}
              >
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: announcement.content }} />
                <IconButton edge="end" aria-label="dismiss" onClick={() => handleDismissAnnouncement(announcement.id)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
        <Tooltip arrow placement="left" title="Close Announcements Panel">
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

      {undismissedAnnouncements.length > 0 && (
        <Tooltip arrow placement="left" title="Open Announcements Panel">
          <Fab
            aria-label="Open Announcements"
            size="small"
            style={{ position: 'fixed', bottom: '80px', right: '20px' }}
            onClick={handleDrawerOpen}
          >
            <NotificationImportant id="announcements-Fab" fontSize="small" htmlColor={palette.primaryLight} />
          </Fab>
        </Tooltip>
      )}

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        style={{
          position: 'fixed',
          bottom: '75px',
          right: '75px',
          zIndex: '1300',
        }}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          You have new announcements!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AnnouncementsFab
