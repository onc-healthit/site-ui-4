'use client'
import {
  FireplaceOutlined,
  HandymanOutlined,
  HealingOutlined,
  ImportantDevicesOutlined,
  WhatshotOutlined,
} from '@mui/icons-material'
import { useState } from 'react'

/* Custom Imports */
import { NavListItemType } from '@/types/NavListItemType'
import NavListHeadItem from '../NavListHeadItem'
import NavListSubItems from '../NavListSubItems'

export default function SiteNavGeneralTools() {
  const [openGeneralTestingList, setOpenGeneralTestingList] = useState(false)

  const handleClickGeneralTestingList = () => {
    setOpenGeneralTestingList(!openGeneralTestingList)
  }

  const items: NavListItemType[] = [
    {
      text: 'CPOE Evaluation Tool',
      isExternalLink: true,
      href: 'https://www.leapfroggroup.org/survey-materials/prepare-cpoe-tool',
      icon: <ImportantDevicesOutlined fontSize="small" aria-label="CPOE Evaluation Tool" />,
    },
    {
      text: 'IHE Testing Tools',
      isExternalLink: true,
      href: 'https://www.ihe.net/testing/testing_tools/',
      icon: <HealingOutlined fontSize="small" aria-label="Go to IHE Testing Tool" />,
    },
    {
      text: 'Lantern Project',
      isExternalLink: true,
      href: 'https://lantern.healthit.gov/?tab=dashboard_tab',
      icon: <FireplaceOutlined fontSize="small" aria-label="Go to Lantern Project" />,
    },
    {
      text: 'Inferno HL7 FHIR Validator',
      isExternalLink: true,
      href: 'https://inferno.healthit.gov/validator/',
      icon: <WhatshotOutlined fontSize="small" aria-label="Go to Inferno HL7 FHIR Validator" />,
    },
  ]

  return (
    <div id="site-nav-general-tools">
      <NavListHeadItem
        text="General Testing Tools"
        handleClickCategoryList={handleClickGeneralTestingList}
        icon={<HandymanOutlined aria-label="Open general testing tools" />}
        openCategoryList={openGeneralTestingList}
      />
      <NavListSubItems items={items} openCategoryList={openGeneralTestingList} />
    </div>
  )
}
