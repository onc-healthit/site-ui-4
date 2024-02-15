import React from 'react'
import { Box } from '@mui/material'
import SubMenuButton from './SubMenuButton' // Adjust the import path as necessary

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
        width: '450px',
        borderRadius: '4px',
        top: '80px',
        position: 'sticky',
        height: 'fit-content',
        border: '1px solid #E8E8E8',
        backgroundColor: '#FFFFFF',
        boxShadow: '8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
      }}
    >
      {menuItems.map((item, index) => (
        <SubMenuButton heading={item.heading} href={item.href} key={index} />
      ))}
    </Box>
  )
}

export default SubMenu
