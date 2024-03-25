import React from 'react'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import palette from '@/styles/palette'

export type menuProps = {
  heading: string
  href: string
}

export interface SubMenuProps {
  menuItems: menuProps[]
}
const SubMenu = ({ menuItems }: SubMenuProps) => {
  return (
    <Box
      sx={{
        minWidth: '200px',
        borderRadius: '4px',
        top: '80px',
        position: 'sticky',
        height: 'fit-content',
        border: '1px solid #E8E8E8',
        backgroundColor: '#FFFFFF',
        boxShadow: '8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
      }}
    >
      <List sx={{}} component="nav">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index} passHref style={{ textDecoration: 'none' }}>
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
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  )
}

export default SubMenu
