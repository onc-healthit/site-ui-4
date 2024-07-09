import React from 'react'
import { List, ListItem, ListItemIcon, ListItemButton, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

const TreeMenu = () => {
  return (
    <List sx={{ p: 0 }} component="nav" aria-label="Tree menu">
      <ListItem sx={{ pl: 0, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <ListItemButton sx={{ pl: 0, py: 0.4 }}>
          {' '}
          <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '1em' }}>Part: mutlipart/signed</Typography>
        </ListItemButton>
        <ListItemIcon sx={{ minWidth: '0px' }}>
          <CheckCircle color="success" />
        </ListItemIcon>
      </ListItem>

      <ListItem sx={{ pl: 1, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <ListItemButton sx={{ pl: 0, py: 0.4 }}>
          {' '}
          <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '1em' }}>-Part: mutlipart/signed</Typography>
        </ListItemButton>

        <ListItemIcon sx={{ minWidth: '0px' }}>
          <CheckCircle color="success" />
        </ListItemIcon>
      </ListItem>

      <ListItem sx={{ pl: 2.5, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <ListItemButton sx={{ pl: 0, py: 0.4 }}>
          {' '}
          <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '1em' }}>
            -Part: application/pkc7-signature
          </Typography>
        </ListItemButton>

        <ListItemIcon sx={{ minWidth: '0px' }}>
          <CheckCircle color="success" />
        </ListItemIcon>
      </ListItem>
      <ListItem sx={{ pl: 3.5, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <ListItemButton sx={{ pl: 0, py: 0.4 }}>
          {' '}
          <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '1em' }}>
            -Part: application/pkc7-signature
          </Typography>
        </ListItemButton>

        <ListItemIcon sx={{ minWidth: '0px' }}>
          <CheckCircle color="success" />
        </ListItemIcon>
      </ListItem>
      <ListItem sx={{ pl: 4.5, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <ListItemButton sx={{ pl: 0, py: 0.4 }}>
          {' '}
          <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '1em' }}>
            -Part: application/pkc7-signature
          </Typography>
        </ListItemButton>

        <ListItemIcon sx={{ minWidth: '0px' }}>
          <CheckCircle color="success" />
        </ListItemIcon>
      </ListItem>
      <ListItem sx={{ pl: 5.5, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <ListItemButton sx={{ pl: 0, py: 0.4 }}>
          {' '}
          <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '1em' }}>
            -Part: application/pkc7-signature
          </Typography>
        </ListItemButton>

        <ListItemIcon sx={{ minWidth: '0px' }}>
          <CheckCircle color="success" />
        </ListItemIcon>
      </ListItem>
      <ListItem sx={{ pl: 6.5, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <ListItemButton sx={{ pl: 0, py: 0.4 }}>
          {' '}
          <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '1em' }}>
            -Part: application/pkc7-signature
          </Typography>
        </ListItemButton>

        <ListItemIcon sx={{ minWidth: '0px' }}>
          <CheckCircle color="success" />
        </ListItemIcon>
      </ListItem>
      <ListItem sx={{ pl: 1, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <ListItemButton sx={{ pl: 0, py: 0.4 }}>
          {' '}
          <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '1em' }}>
            -Part: application/pkc7-signature
          </Typography>
        </ListItemButton>

        <ListItemIcon sx={{ minWidth: '0px' }}>
          <CheckCircle color="success" />
        </ListItemIcon>
      </ListItem>
    </List>
  )
}

export default TreeMenu
