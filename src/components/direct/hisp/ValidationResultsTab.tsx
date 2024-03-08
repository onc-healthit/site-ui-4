import * as React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import ProfilesCard from './ProfilesCard'

const ValidationResults = () => {
  return (
    <Box
      sx={{
        padding: '32px',
        width: '100%',
        minHeight: 'auto',
        pl: '200px',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Below are the different profiles you are aligned to. Select one to see the validation results.
      </Typography>

      <Grid container spacing={4} sx={{ justifyContent: 'flex-start' }}>
        <Grid item sx={{ minWidth: 419 }}>
          <ProfilesCard header=".gov" smtpAddress="direct.ett.health.gov" emailAddress="direct.ett.health.gov" />
        </Grid>
        <Grid item sx={{ minWidth: 419 }}>
          <ProfilesCard
            header="HIT2.nist.gov"
            smtpAddress="direct.ett.health.gov"
            emailAddress="direct.ett.health.gov"
          />
        </Grid>
        <Grid item sx={{ minWidth: 419 }}>
          <ProfilesCard
            header=".Default Profile 3"
            smtpAddress="direct.ett.health.gov"
            emailAddress="direct.ett.health.gov"
          />
        </Grid>
        <Grid item sx={{ minWidth: 419 }}>
          <ProfilesCard header="test.gov" smtpAddress="direct.ett.health.gov" emailAddress="direct.ett.health.gov" />
        </Grid>
        <Grid item sx={{ minWidth: 419 }}>
          <ProfilesCard
            header="HIT1.nist.gov"
            smtpAddress="direct.ett.health.gov"
            emailAddress="direct.ett.health.gov"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ValidationResults
