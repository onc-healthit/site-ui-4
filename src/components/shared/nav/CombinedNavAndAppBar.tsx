'use client' // required since using useState
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'

/* Custom Component Imports */
import SiteAppBar from '@/components/shared/nav/app-bar/SiteAppBar'
import Nav from '@/components/shared/nav/nav/Nav'

export default function CombinedNavAndAppBar() {
  const handleAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setAuth(event.target.checked)
  }

  // TODO: default to false based on DEV_MODE env var
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SiteAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Nav open={open} handleDrawerClose={handleDrawerClose} handleAuthChange={handleAuthChange} />
    </Box>
  )
}
