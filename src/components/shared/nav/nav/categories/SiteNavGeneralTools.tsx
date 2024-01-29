import { Collapse } from '@mui/material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { useState } from 'react'

import {
  ExpandLess,
  ExpandMore,
  FireplaceOutlined,
  HandymanOutlined,
  HealingOutlined,
  ImportantDevicesOutlined,
  SquareFootOutlined,
} from '@mui/icons-material'

/* Custom Imports */
import { GENERIC_LINK_TO_REPLACE, NAV_PADDING_LEFT } from '@/constants/navConstants'
import palette from '@/styles/palette'

export default function SiteNavGeneralTools() {
  const [openGeneralTestingList, setOpenGeneralTestingList] = useState(false)

  const handleClickGeneralTestingList = () => {
    setOpenGeneralTestingList(!openGeneralTestingList)
  }

  return (
    <>
      <ListItemButton onClick={handleClickGeneralTestingList}>
        <ListItemIcon>
          {/* <SpaceDashboardOutlined /> */}
          <HandymanOutlined sx={{ strokeWidth: 0.5, stroke: `${palette.primary}` }} color="primary" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ color: palette.primary, fontWeight: 500 }}
          primary="General Testing Tools"
        />
        {openGeneralTestingList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openGeneralTestingList} timeout="auto" unmountOnExit>
        {[
          {
            text: 'CPOE Evaluation Tool',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <ImportantDevicesOutlined color="primary" />,
          },
          {
            text: 'IHE Testing Tools',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <HealingOutlined color="primary" />,
          },
          {
            text: 'Lantern Project',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <FireplaceOutlined color="primary" />,
          },
          {
            text: 'NIST Conformance Test',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <SquareFootOutlined color="primary" />,
          },
        ].map((item) => (
          <List key={item.text} component="div" disablePadding>
            <Link href={item.href} target="_blank" rel="noopener noreferrer">
              <ListItemButton sx={{ pl: NAV_PADDING_LEFT }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: palette.primary }} primary={item.text} />
              </ListItemButton>
            </Link>
          </List>
        ))}
      </Collapse>
    </>
  )
}
