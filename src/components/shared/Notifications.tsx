'use client'
import React, { useEffect, useState } from 'react'
import { Box, Drawer, Fab, Tooltip, Typography, IconButton, Divider, CardHeader, Badge, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import NotificationImportantOutlined from '@mui/icons-material/NotificationImportantOutlined'
import { fetchNotifications, fetchMarkdownData, Announcement } from '@/assets/NotificationService'
import palette from '@/styles/palette'

const NotificationFab: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [notifications, setNotifications] = useState<Announcement[]>([]) // Use the Announcement type
  const [dismissedNotification, setDismissedNotification] = useState<Set<string>>(() => {
    const storedDismissed = localStorage.getItem('dismissedNotification')
    return storedDismissed ? new Set(JSON.parse(storedDismissed)) : new Set()
  })
  const [releaseVersionHTML, setReleaseVersionHTML] = useState<string | undefined>()
  const [releaseDateHTML, setReleaseDateHTML] = useState<string | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNotifications(await fetchNotifications())
        const { releaseVersionHTML, releaseDateHTML } = await fetchMarkdownData()
        setReleaseVersionHTML(releaseVersionHTML)
        setReleaseDateHTML(releaseDateHTML)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [])

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
    trackEvent('Open Info FAB', 'Button', 'Communication Panel')
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    trackEvent('Close Info FAB', 'Button', 'Communication Panel')
  }

  const trackEvent = (action: string, category: string, label: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      })
    }
  }

  const handleDismissAnnouncement = (id: string) => {
    setDismissedNotification((prev) => {
      const updatedSet = new Set(prev).add(id)
      localStorage.setItem('dismissedNotification', JSON.stringify(Array.from(updatedSet)))

      const remainingUndismissed = notifications.filter((a) => !updatedSet.has(a.id))
      if (remainingUndismissed.length === 0) {
        setDrawerOpen(false)
      }

      return updatedSet
    })
  }

  const undismissedNotifications = notifications.filter((a) => !dismissedNotification.has(a.id))
  const badgeContent = undismissedNotifications.length

  return (
    <div style={{ display: 'flex' }}>
      {undismissedNotifications.length > 0 && (
        <Drawer
          variant="persistent"
          anchor="right"
          open={drawerOpen}
          PaperProps={{ style: { width: 500, zIndex: 1400 } }}
        >
          <Box p={2}>
            <CardHeader
              title="Notification Panel"
              subheader={`You have ${undismissedNotifications.length} new notifications`}
            />
            <Divider />
            <Box>
              {undismissedNotifications.map(({ id, title, content }) => (
                <Box
                  key={id}
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  p={4}
                  gap={4}
                  bgcolor="#F2D0A764"
                  mb={2}
                  border={1}
                  borderColor="divider"
                  borderRadius={1}
                  boxShadow={0}
                >
                  <Box flexGrow={1} pr={2}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: palette.primary, mb: 1 }}>
                      {title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: palette.primary, lineHeight: 1.5 }}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </Box>
                  <IconButton edge="end" aria-label="dismiss" onClick={() => handleDismissAnnouncement(id)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Button variant="outlined" fullWidth size="small" onClick={() => (window.location.href = '/notifications')}>
              Go to all previous notifications
            </Button>
          </Box>
          <Tooltip arrow placement="left" title="Close Notification Panel">
            <Fab
              onClick={handleDrawerClose}
              size="small"
              color="inherit"
              aria-label="Close Info"
              style={{ position: 'fixed', bottom: 20, right: 20 }}
            >
              <CloseIcon fontSize="small" htmlColor={palette.error} />
            </Fab>
          </Tooltip>
          <Typography
            sx={{ position: 'fixed', bottom: 12, padding: '0 16px 8px 16px', fontSize: '12px' }}
            variant="caption"
            color={palette.greyDark}
          >
            {releaseVersionHTML && <div dangerouslySetInnerHTML={{ __html: releaseVersionHTML }} />}
            {releaseDateHTML && <div dangerouslySetInnerHTML={{ __html: releaseDateHTML }} />}
          </Typography>
        </Drawer>
      )}

      {undismissedNotifications.length > 0 && (
        <Tooltip arrow placement="left" title="Open Notification Panel">
          <Fab
            aria-label="Open Notification"
            size="small"
            style={{ position: 'fixed', bottom: 80, right: 20 }}
            onClick={handleDrawerOpen}
          >
            <Badge overlap="circular" badgeContent={badgeContent} color="error">
              <NotificationImportantOutlined id="Notification-Fab" fontSize="small" htmlColor={palette.primaryLight} />
            </Badge>
          </Fab>
        </Tooltip>
      )}
    </div>
  )
}

export default NotificationFab
