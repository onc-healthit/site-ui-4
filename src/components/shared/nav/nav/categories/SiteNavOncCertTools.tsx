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
import palette from '@/styles/palette'

export default function SiteNavOncCertTools() {
  const [openCertList, setOpenCertList] = useState(true)

  const handleClickCertList = () => {
    setOpenCertList(!openCertList)
  }

  return (
    <>
      <ListItemButton onClick={handleClickCertList}>
        <ListItemIcon>
          <CheckCircleOutline sx={{ strokeWidth: 0.5, stroke: `${palette.primary}` }} color="primary" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ color: palette.primary, fontWeight: 500 }}
          primary="ONC Certification Tools"
        />
        {openCertList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openCertList} timeout="auto" unmountOnExit>
        {[
          {
            text: 'FHIR Inferno Framework',
            isExternalLink: true,
            href: 'https://inferno.healthit.gov/',
            icon: <LocalFireDepartmentOutlined color="primary" />,
          },
          {
            text: 'C-CDA Testing',
            isExternalLink: false,
            href: '/c-cda',
            icon: <PublishedWithChanges color="primary" />,
          },
          {
            text: 'Direct Project Tooling',
            isExternalLink: false,
            href: '/direct',
            icon: <CompareArrows color="primary" />,
          },
          {
            text: 'CQM QRDA Testing',
            isExternalLink: false,
            href: '/cqm-qrda',
            icon: <AddchartOutlined color="primary" />,
          },
          {
            text: 'Electronic Prescribing (eRX) Tool',
            isExternalLink: true,
            href: GENERIC_LINK_TO_REPLACE,
            icon: <MedicationOutlined color="primary" />,
          },
          {
            text: 'Public Health Reporting',
            isExternalLink: true,
            href: GENERIC_LINK_TO_REPLACE,
            icon: <GroupsOutlined color="primary" />,
          },
          {
            text: 'Alternative Test Methods',
            isExternalLink: true,
            href: GENERIC_LINK_TO_REPLACE,
            icon: <AltRouteOutlined color="primary" />,
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
                <ListItemText primaryTypographyProps={{ color: palette.primary }} primary={item.text} />
              </ListItemButton>
            </Link>
          </List>
        ))}
      </Collapse>
    </>
  )
}
