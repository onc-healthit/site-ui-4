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
import { GENERIC_LINK_TO_REPLACE } from '@/constants/navConstants'
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
  ]

  return (
    <>
      <NavListHeadItem
        text="ONC Certification Tools"
        handleClickCategoryList={handleClickCertList}
        icon={<CheckCircleOutline />}
        openCategoryList={openCertList}
      />
      <NavListSubItems items={items} openCategoryList={openCertList} />
    </>
  )
}
