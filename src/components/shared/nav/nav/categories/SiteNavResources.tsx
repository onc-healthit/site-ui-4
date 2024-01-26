import { Collapse } from '@mui/material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { useState } from 'react'

import {
  ContentCopy,
  ExpandLess,
  ExpandMore,
  IntegrationInstructionsOutlined,
  QuestionAnswerOutlined,
} from '@mui/icons-material'

/* Custom Imports */
import { NAV_PADDING_LEFT } from '@/constants/navConstants'

export default function SiteNavResources() {
  const [openResourcesList, setOpenResourcesList] = useState(false)

  const handleClickResourcesList = () => {
    setOpenResourcesList(!openResourcesList)
  }

  return (
    <>
      <ListItemButton onClick={handleClickResourcesList}>
        <ListItemIcon>
          <ContentCopy />
        </ListItemIcon>
        <ListItemText primary="SITE Resources" />
        {openResourcesList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openResourcesList} timeout="auto" unmountOnExit>
        {[
          {
            text: 'FAQs',
            href: '/faqs',
            icon: <QuestionAnswerOutlined />,
          },
          {
            text: 'Documentation & Videos',
            href: '/docs-and-vids',
            icon: <IntegrationInstructionsOutlined />,
          },
        ].map((item) => (
          <List key={item.text} component="div" disablePadding>
            <Link href={item.href}>
              <ListItemButton sx={{ pl: NAV_PADDING_LEFT }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </List>
        ))}
      </Collapse>
      <Divider />
    </>
  )
}
