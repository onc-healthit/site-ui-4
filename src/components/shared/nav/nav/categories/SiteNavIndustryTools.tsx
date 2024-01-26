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

export default function SiteNavIndustryTools() {
  const [openIndustryTestingList, setOpenIndustryTestingList] = useState(false)

  const handleClickIndustryTestingList = () => {
    setOpenIndustryTestingList(!openIndustryTestingList)
  }

  return (
    <>
      <ListItemButton onClick={handleClickIndustryTestingList}>
        <ListItemIcon>
          <CloudOutlined />
        </ListItemIcon>
        <ListItemText primary="Industry Testing Resources" />
        {openIndustryTestingList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openIndustryTestingList} timeout="auto" unmountOnExit>
        {[
          {
            text: 'HL7 Tools',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <MonitorHeartOutlined />,
          },
          {
            text: 'Reference Data',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <FolderSpecialOutlined />,
          },
          {
            text: 'Implementation Guide Authoring Tools',
            href: GENERIC_LINK_TO_REPLACE,
            icon: <MenuBookOutlined />,
          },
          {
            text: 'MITRE Github',
            href: 'https://github.com/orgs/mitre',
            icon: <Biotech />,
          },
        ].map((item) => (
          <List key={item.text} component="div" disablePadding>
            <Link href={item.href} target="_blank" rel="noopener noreferrer">
              <ListItemButton sx={{ pl: NAV_PADDING_LEFT }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </List>
        ))}
      </Collapse>
    </>
  )
}
