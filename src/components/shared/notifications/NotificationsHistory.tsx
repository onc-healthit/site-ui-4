'use client'
import { useEffect, useState } from 'react'
import BannerBox from '../BannerBox'
import { Box, Container, Typography, CircularProgress } from '@mui/material'
import Link from 'next/link'
import palette from '@/styles/palette'
import SectionHeader from '../SectionHeader'
import Timeline from './Timeline'
import { Announcement, fetchNotifications } from '@/assets/NotificationService'
import { fetchReleaseDate } from '@/assets/ReleaseService'

export default function NotificationHistory() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [releaseDateHTML, setReleaseDateHTML] = useState<string | undefined>()
  useEffect(() => {
    ;(async () => {
      try {
        const releaseDateHTML = await fetchReleaseDate()
        setReleaseDateHTML(releaseDateHTML)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  const [notifications, setNotifications] = useState<Announcement[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications()
        setNotifications(data)
      } catch (err) {
        setError('Failed to load notifications')
      } finally {
        setLoading(false)
      }
    }
    loadNotifications()
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href="/">
            Back to Home
          </Link>
        }
        heading="Notification History"
        description="Welcome to the Notification History, you can view a comprehensive record of all notifications issued by SITE or ONC Teams. This page is designed to help you stay informed about important updates, changes, and announcements relevant to your projects."
      />
      {/* Main Content */}
      <Container>
        {/* Resources Header */}
        <SectionHeader
          header="Explore a chronological timeline of notifications, offering a clear and continuous flow of updates as they were released."
          subHeader="For any questions or assistance with the Notification History Page, please contact our support team or refer to the help section for further guidance."
        />
        {/* Timeline View */}
        {/* // Note: We reverse the order so that the latest notifications appear first */}
        <Timeline
          items={notifications.toReversed().map((notification) => ({
            title: notification.title,
            // static
            date: notification.date ?? 'Unknown Date',
            // dynamic
            // date: releaseDateHTML ?? 'Unknown Date',
            description: notification.content,
          }))}
        />
      </Container>
    </Box>
  )
}
