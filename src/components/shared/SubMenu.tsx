'use client'
import React from 'react'
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles'
import palette from '@/styles/palette'

export type menuProps = {
  heading: string
  href: string
  icon?: JSX.Element
}

export interface SubMenuProps {
  menuItems: menuProps[]
  onClick: (heading: string) => void
}
const SubMenu = ({ menuItems, onClick }: SubMenuProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        minWidth: '200px',
        borderRadius: '4px',
        height: 'fit-content',
        border: '1px solid #E8E8E8',
        backgroundColor: '#FFFFFF',
        boxShadow: '8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
        [theme.breakpoints.down('md')]: {
          minWidth: '100px',
        },
      }}
    >
      <List sx={{}} component="nav">
        {menuItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            passHref
            style={{ textDecoration: 'none' }}
            onClick={() => onClick(item.heading)}
          >
            <ListItemButton
              sx={{
                justifyContent: 'flex-start',
                height: 'auto',
                minHeight: '36px',
                padding: '8px 16px',
                '&:focus': {
                  color: 'transparent',
                },
              }}
            >
              <ListItemText primaryTypographyProps={{ color: palette.primary }} primary={item.heading} />
              {item.icon && <ListItemIcon sx={{ marginLeft: '4px' }}> {item.icon}</ListItemIcon>}
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  )
}

export default SubMenu
