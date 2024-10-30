'use client'
import PageAlertBox from '@/components/shared/PageAlertBox'
import { Box, Card, Container, Divider, LinearProgress, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { fetchAccountInfo } from './actions'
import Profile from '../direct/shared/Profile'
import BannerBox from '../shared/BannerBox'
import { AccountCircleOutlined, EmailOutlined } from '@mui/icons-material'

const InfoHome = () => {
  const { data: session, status } = useSession()
  const [directList, setDirectList] = useState<string[]>([])
  const [smtpProfiles, setSmtpProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUsersAccountInfo() {
      const usersAccountInfo = await fetchAccountInfo()
      if (usersAccountInfo && typeof usersAccountInfo !== 'string') {
        setDirectList(usersAccountInfo.directList || [])
        setSmtpProfiles(usersAccountInfo.smtpProfiles || [])
      }
    }
    if (status === 'authenticated') {
      setIsLoading(true)
      fetchLoggedInUsersAccountInfo().then(() => setIsLoading(false))
    }
  }, [session, status])

  return status !== 'authenticated' ? (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <PageAlertBox message="You must be logged in to view your account information." />
    </Container>
  ) : (
    <>
      <BannerBox
        heading={'Account Info'}
        description={
          <>
            Welcome to your Account Information page! Here, you can view your direct email address and SMTP account
            details. Ensure these settings are correct for optimal email delivery. Please review this information
            regularly to keep your account functioning smoothly. If you have any questions, feel free to reach out to
            our support team.
          </>
        }
      />
      <Container maxWidth="lg">
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Box mt={4}>
            <Typography sx={{ flex: 1, fontWeight: '600' }} variant="h4" component="h2">
              My Account Info
            </Typography>
            <Box display={'flex'} flexDirection={'row'} mt={2} gap={4}>
              <Card sx={{ width: '30%' }}>
                <Box>
                  <Typography sx={{ flex: 1, p: 2, display: 'flex', gap: 2 }} variant="body1" component="h3">
                    <EmailOutlined fontSize="small" color="primary" />
                    My Direct Email Addresses
                  </Typography>
                  <Divider />
                  <List sx={{ px: 2 }}>
                    {directList.map((directEmail, index) => {
                      return (
                        <ListItem
                          disablePadding
                          sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}
                          key={index}
                        >
                          <ListItemText primaryTypographyProps={{ fontSize: '.8em' }} primary={directEmail} />
                        </ListItem>
                      )
                    })}
                  </List>
                </Box>
              </Card>
              <Card sx={{ flexGrow: 1 }}>
                <Typography sx={{ flex: 1, p: 2, display: 'flex', gap: 2 }} variant="body1" component="h3">
                  <AccountCircleOutlined fontSize="small" color="primary" />
                  My SMTP Profiles
                </Typography>
                <Divider />
                <List sx={{ px: 2 }}>
                  {smtpProfiles.map((profile, index) => {
                    return (
                      <ListItem disablePadding sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }} key={index}>
                        <ListItemText
                          primaryTypographyProps={{ fontSize: '.8em' }}
                          primary={profile.profileName}
                          secondary={profile.sutSMTPAddress}
                          secondaryTypographyProps={{ fontSize: '.7em' }}
                        />
                      </ListItem>
                    )
                  })}
                </List>
              </Card>
            </Box>
          </Box>
        )}
      </Container>
    </>
  )
}

export default InfoHome
