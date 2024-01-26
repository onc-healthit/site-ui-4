import { Collapse } from '@mui/material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { useState } from 'react'

import {
  Biotech,
  CloudOutlined,
  ExpandLess,
  ExpandMore,
  FolderSpecialOutlined,
  MenuBookOutlined,
  MonitorHeartOutlined,
} from '@mui/icons-material'

/* Custom Imports */
import { GENERIC_LINK_TO_REPLACE, NAV_PADDING_LEFT } from '@/constants/navConstants'
import palette from '@/styles/palette'

export default function SiteNavIndustryTools() {
  const [openIndustryTestingList, setOpenIndustryTestingList] = useState(false)

  const handleClickIndustryTestingList = () => {
    setOpenIndustryTestingList(!openIndustryTestingList)
  }

  return (
    <>
      <ListItemButton onClick={handleClickIndustryTestingList}>
        <ListItemIcon>
          <CloudOutlined color="primary" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ color: palette.primary }} primary="Industry Testing Resources" />
        {openIndustryTestingList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openIndustryTestingList} timeout="auto" unmountOnExit>
        {[
          {
            text: 'HL7 Tools',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <MonitorHeartOutlined color="primary" />,
          },
          {
            text: 'Reference Data',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <FolderSpecialOutlined color="primary" />,
          },
          {
            text: 'Implementation Guide Authoring Tools',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <MenuBookOutlined color="primary" />,
          },
          {
            text: 'MITRE Github',
            href: 'https://github.com/orgs/mitre',
            icon: <Biotech color="primary" />,
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
