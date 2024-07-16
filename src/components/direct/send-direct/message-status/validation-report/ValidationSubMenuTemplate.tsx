import React from 'react'
import { List, ListItem, ListItemIcon, ListItemButton, Typography, Card, CardContent, Divider } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

const items = [
  { text: 'Part: multipart/signed', paddingLeft: 0 },
  { text: '-Part: multipart/signed', paddingLeft: 1 },
  { text: '-Part: application/pkc7-signature', paddingLeft: 2.5 },
  { text: '-Part: application/pkc7-signature', paddingLeft: 3.5 },
  { text: '-Part: application/pkc7-signature', paddingLeft: 4.5 },
  { text: '-Part: application/pkc7-signature', paddingLeft: 5.5 },
  { text: '-Part: application/pkc7-signature', paddingLeft: 6.5 },
  { text: '-Part: application/pkc7-signature', paddingLeft: 1 },
]

const ValidationSubMenuTemplate = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ pb: 1 }}>
          Summary
        </Typography>
        <Typography variant="caption" sx={{ mb: 2 }}>
          Click on the menu item to view the selected parts & table.
        </Typography>
        <Divider />
        <List sx={{ p: 0, width: '450px' }} component="nav" aria-label="Tree menu">
          {items.map((item, index) => (
            <ListItem
              key={index}
              sx={{ pl: item.paddingLeft, display: 'flex', gap: 1, justifyContent: 'space-between' }}
            >
              <ListItemButton sx={{ pl: 0, py: 0.1 }}>
                <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '.9em', py: 0.5, px: 1 }}>
                  {item.text}
                </Typography>
              </ListItemButton>
              <ListItemIcon sx={{ minWidth: '0px' }}>
                <CheckCircle color="success" />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default ValidationSubMenuTemplate
