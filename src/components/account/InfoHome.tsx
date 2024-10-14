'use client'
import PageAlertBox from '@/components/shared/PageAlertBox'
import { Box, Container, Divider, LinearProgress, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { fetchAccountInfo } from './actions'
import Profile from '../direct/shared/Profile'

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
    <Container sx={{ pt: 4 }}>
      <PageAlertBox message="You must be logged in to view your account information." />
    </Container>
  ) : (
    <Container sx={{ pt: 4 }}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Typography sx={{ flex: 1 }} variant="h1" component="h1">
            Account Info
          </Typography>
          <Divider />
          <Box display={'flex'} flexDirection={'column'} pt={3}>
            <Box>
              <Typography sx={{ flex: 1 }} variant="h4" component="h2">
                Direct Email Addresses
              </Typography>
              <List>
                {directList.map((directEmail, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemText primary={directEmail} />
                    </ListItem>
                  )
                })}
              </List>
            </Box>
            <Box>
              <Typography sx={{ flex: 1 }} variant="h4" component="h3">
                SMTP Profiles
              </Typography>
              <List>
                {smtpProfiles.map((profile, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemText primary={profile.profileName} secondary={profile.sutSMTPAddress} />
                    </ListItem>
                  )
                })}
              </List>
            </Box>
          </Box>
        </>
      )}
    </Container>
  )
}

export default InfoHome
