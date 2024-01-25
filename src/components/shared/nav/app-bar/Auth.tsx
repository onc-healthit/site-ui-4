import { AccountCircle } from '@mui/icons-material'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'

interface AuthProps {
  auth: boolean
}
export default function Auth({ auth }: AuthProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleAuthMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleAuthClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Typography variant="h6" component="div">
        {auth ? 'LOGGED-IN-USER' : 'LOGIN'}
      </Typography>
      {auth ? (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAuthMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleAuthClose}
          >
            <MenuItem onClick={handleAuthClose}>Account Info</MenuItem>
            <MenuItem onClick={handleAuthClose}>Change Password</MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <IconButton
            size="large"
            aria-label="log in to an account"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAuthMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleAuthClose}
          >
            {/* TODO: This will have its own UI and won't be a basic menu */}
            <MenuItem onClick={handleAuthClose}>Sign In</MenuItem>
            <MenuItem onClick={handleAuthClose}>Create Account</MenuItem>
          </Menu>
        </div>
      )}
    </Box>
  )
}
