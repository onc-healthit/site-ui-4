import { useState } from 'react'
import { Collapse } from '@mui/material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

import {
  AddchartOutlined,
  AltRouteOutlined,
  CheckCircleOutline,
  CompareArrows,
  ExpandLess,
  ExpandMore,
  GroupsOutlined,
  LocalFireDepartmentOutlined,
  MedicationOutlined,
  PublishedWithChanges,
} from '@mui/icons-material'

/* Custom Imports */
import { GENERIC_LINK_TO_REPLACE, NAV_PADDING_LEFT } from '@/constants/navConstants'

export default function SiteNavOncCertTools() {
  const [openCertList, setOpenCertList] = useState(true)

  const handleClickCertList = () => {
    setOpenCertList(!openCertList)
  }

  return (
    <>
      <ListItemButton onClick={handleClickCertList}>
        <ListItemIcon>
          <CheckCircleOutline />
        </ListItemIcon>
        <ListItemText primary="ONC Certification Tools" />
        {openCertList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openCertList} timeout="auto" unmountOnExit>
        {[
          {
            text: 'FHIR Inferno Framework',
            isExternalLink: true,
            href: 'https://inferno.healthit.gov/',
            icon: <LocalFireDepartmentOutlined />,
          },
          {
            text: 'C-CDA Testing',
            isExternalLink: false,
            href: '/c-cda',
            icon: <PublishedWithChanges />,
          },
          {
            text: 'Direct Project Tooling',
            isExternalLink: false,
            href: '/direct',
            icon: <CompareArrows />,
          },
          {
            text: 'CQM QRDA Testing',
            isExternalLink: false,
            href: '/cqm-qrda',
            icon: <AddchartOutlined />,
          },
          {
            text: 'Electronic Prescribing (eRX) Tool',
            isExternalLink: true,
            href: GENERIC_LINK_TO_REPLACE,
            icon: <MedicationOutlined />,
          },
          {
            text: 'Public Health Reporting',
            isExternalLink: true,
            href: GENERIC_LINK_TO_REPLACE,
            icon: <GroupsOutlined />,
          },
          {
            text: 'Alternative Test Methods',
            isExternalLink: true,
            href: GENERIC_LINK_TO_REPLACE,
            icon: <AltRouteOutlined />,
          },
        ].map((item) => (
          <List key={item.text} component="div" disablePadding>
            <Link
              href={item.href}
              target={item.isExternalLink ? '_blank' : undefined}
              rel={item.isExternalLink ? 'noopener noreferrer' : undefined}
            >
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
