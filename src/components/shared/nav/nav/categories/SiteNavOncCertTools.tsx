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
      icon: <LocalFireDepartmentOutlined fontSize="small" />,
    },
    {
      text: 'C-CDA Testing',
      isExternalLink: false,
      href: '/c-cda',
      icon: <PublishedWithChanges fontSize="small" />,
    },
    {
      text: 'Direct Project Tooling',
      isExternalLink: false,
      href: '/direct',
      icon: <CompareArrows fontSize="small" />,
    },
    {
      text: 'Clinical Quality Measure Testing',
      isExternalLink: false,
      href: '/cqmt',
      icon: <AddchartOutlined fontSize="small" />,
    },
    {
      text: 'Electronic Prescribing (eRX) Tool',
      isExternalLink: true,
      href: 'https://tools.ncpdp.org/erx/#/home',
      icon: <MedicationOutlined fontSize="small" />,
    },
    {
      text: 'Public Health Reporting',
      isExternalLink: false,
      href: '/public-health-reporting',
      icon: <GroupsOutlined fontSize="small" />,
    },
    {
      text: 'Alternative Test Methods',
      isExternalLink: true,
      href: 'https://hl7v2-iz-cdc-testing.nist.gov/iztool/#/home',
      icon: <AltRouteOutlined fontSize="small" />,
    },
  ]

  return (
    <div id="site-nav-onc-cert-tools">
      <NavListHeadItem
        text="ONC Certification Tools"
        handleClickCategoryList={handleClickCertList}
        icon={<CheckCircleOutline />}
        openCategoryList={openCertList}
      />
      <NavListSubItems items={items} openCategoryList={openCertList} />
    </div>
  )
}
