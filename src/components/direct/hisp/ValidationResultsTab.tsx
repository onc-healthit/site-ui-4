import * as React from 'react'
import { Box, Typography, Container } from '@mui/material'
import ProfilesCard from './ProfilesCard'
import { useSession } from 'next-auth/react'
import PageAlertBox from '@/components/shared/PageAlertBox'
import { useEffect } from 'react'
import { fetchUserProfiles } from './actions'

const ValidationResults = () => {
  const { data: session, status } = useSession()
  const [profiles, setProfiles] = React.useState([])

  useEffect(() => {
    if (status === 'authenticated') {
      //const response = await fetchUserProfiles()
      console.log(`DEBUG - Fetching profiles for user: ${session.user.email}`)
    }
  }, [status])

  return (
    <>
      {status !== 'authenticated' ? (
        <Container sx={{ pt: 4 }}>
          <PageAlertBox message="You must be logged in to see your profiles." />
        </Container>
      ) : (
        <Container>
          <Box
            sx={{
              padding: '32px',
              minHeight: 'auto',
            }}
          >
            <Typography variant="h4" sx={{ mb: 4 }}>
              Below are the different profiles you are aligned to. Select one to see the validation results.
            </Typography>

            <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
              <ProfilesCard header=".gov" smtpAddress="direct.ett.health.gov" emailAddress="direct.ett.health.gov" />
              <ProfilesCard
                header="HIT2.nist.gov"
                smtpAddress="direct.ett.health.gov"
                emailAddress="direct.ett.health.gov"
              />
              <ProfilesCard
                header=".Default Profile 3"
                smtpAddress="direct.ett.health.gov"
                emailAddress="direct.ett.health.gov"
              />
              <ProfilesCard
                header="test.gov"
                smtpAddress="direct.ett.health.gov"
                emailAddress="direct.ett.health.gov"
              />
              <ProfilesCard
                header="HIT1.nist.gov"
                smtpAddress="direct.ett.health.gov"
                emailAddress="direct.ett.health.gov"
              />
            </Box>
          </Box>
        </Container>
      )}
    </>
  )
}

export default ValidationResults
