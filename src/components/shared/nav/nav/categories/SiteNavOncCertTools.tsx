import {
  AddchartOutlined,
  AltRouteOutlined,
  CheckCircleOutline,
  CompareArrows,
  GroupsOutlined,
  LocalFireDepartmentOutlined,
  MedicationOutlined,
  PublishedWithChanges,
} from '@mui/icons-material'
import { useState } from 'react'

/* Custom Imports */
import { NavListItemType } from '@/types/NavListItemType'
import NavListHeadItem from '../NavListHeadItem'
import NavListSubItems from '../NavListSubItems'

export default function SiteNavOncCertTools() {
  const [openCertList, setOpenCertList] = useState(true)

  const handleClickCertList = () => {
    setOpenCertList(!openCertList)
  }

  const items: NavListItemType[] = [
    {
      text: 'FHIR Inferno Framework',
      isExternalLink: true,
      href: 'https://inferno.healthit.gov/',
      icon: <LocalFireDepartmentOutlined aria-label=" Go to FHIR Inferno Framework" fontSize="small" />,
    },
    {
      text: 'C-CDA Testing',
      isExternalLink: false,
      href: '/c-cda',
      icon: <PublishedWithChanges aria-label="Go to C-CDA Testing" fontSize="small" />,
    },
    {
      text: 'Direct Project Tooling',
      isExternalLink: false,
      href: '/direct',
      icon: <CompareArrows aria-label="Go to Direct Project Tooling" fontSize="small" />,
    },
    {
      text: 'Clinical Quality Measure Testing',
      isExternalLink: false,
      href: '/cqmt',
      icon: <AddchartOutlined aria-label=" Go to Clinical Quality Measure Testing" fontSize="small" />,
    },
    {
      text: 'Electronic Prescribing (eRX) Tool',
      isExternalLink: true,
      href: 'https://erx.healthit.gov/erx/',
      icon: <MedicationOutlined aria-label="Go to Electronic Prescribing (eRX) Tool" fontSize="small" />,
    },
    {
      text: 'Public Health Reporting',
      isExternalLink: false,
      href: '/public-health-reporting',
      icon: <GroupsOutlined aria-label="Go to Public Health Reporting" fontSize="small" />,
    },
    {
      text: 'Alternative Test Methods',
      isExternalLink: true,
      href: 'https://hl7v2-iz-cdc-testing.nist.gov/iztool/#/home',
      icon: <AltRouteOutlined aria-label="Go to Alternative Test Methods" fontSize="small" />,
    },
  ]

  return (
    <div id="site-nav-onc-cert-tools">
      <NavListHeadItem
        text="ONC Certification Tools"
        handleClickCategoryList={handleClickCertList}
        icon={<CheckCircleOutline aria-label="Open ONC Certification Tools" />}
        openCategoryList={openCertList}
      />
      <NavListSubItems items={items} openCategoryList={openCertList} />
    </div>
  )
}
