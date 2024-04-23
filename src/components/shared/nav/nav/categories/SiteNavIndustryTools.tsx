import {
  Biotech,
  CloudOutlined,
  FolderSpecialOutlined,
  MenuBookOutlined,
  MonitorHeartOutlined,
} from '@mui/icons-material'
import { useState } from 'react'

/* Custom Imports */
import { NavListItemType } from '@/types/NavListItemType'
import NavListHeadItem from '../NavListHeadItem'
import NavListSubItems from '../NavListSubItems'

export default function SiteNavIndustryTools() {
  const [openIndustryTestingList, setOpenIndustryTestingList] = useState(false)

  const handleClickIndustryTestingList = () => {
    setOpenIndustryTestingList(!openIndustryTestingList)
  }

  const items: NavListItemType[] = [
    {
      text: 'HL7 Tools',
      isExternalLink: true,
      href: 'https://confluence.hl7.org/display/FHIR/FHIR+Tooling+Ecosystem',
      icon: <MonitorHeartOutlined />,
    },
    {
      text: 'Reference Data',
      isExternalLink: false,
      href: '/reference-data',
      icon: <FolderSpecialOutlined />,
    },
    {
      text: 'Implementation Guide Authoring Tools',
      isExternalLink: false,
      href: 'https://confluence.hl7.org/display/FHIR/Authoring+FHIR+Implementation+Guides+-+Introduction',
      icon: <MenuBookOutlined />,
    },
    {
      text: 'MITRE Github',
      isExternalLink: true,
      href: 'https://github.com/orgs/mitre',
      icon: <Biotech />,
    },
  ]

  return (
    <div id="site-nav-industry-testing">
      <NavListHeadItem
        text="Industry Testing Resources"
        handleClickCategoryList={handleClickIndustryTestingList}
        icon={<CloudOutlined />}
        openCategoryList={openIndustryTestingList}
      />
      <NavListSubItems items={items} openCategoryList={openIndustryTestingList} />
    </div>
  )
}
