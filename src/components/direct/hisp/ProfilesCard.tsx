import React from 'react'
import { Box, Grid, Button, Divider, Typography, Toolbar, IconButton, Card } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface DocsCardProps {
  smtpAddress: string
  emailAddress: string
  header: string
}
const ProfilesCard: React.FC<DocsCardProps> = ({ smtpAddress, emailAddress, header }) => {
  return (
    <Card
      sx={{
        width: 419,
        height: 225,
        boxShadow: '-8px 0px 32px 0px rgba(0, 0, 0, 0.17)',
        mb: 4,
      }}
    >
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#001439' }}>
          {header}
        </Typography>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Box sx={{ margin: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">SUTE SMTP Address:</Typography>
            <Typography variant="body1">{smtpAddress}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">SUTE Email Address:</Typography>
            <Typography variant="body1">{emailAddress}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <Button variant="contained" color="primary">
          Show Report
        </Button>
      </Box>
    </Card>
  )
}

export default ProfilesCard
