import {
  Biotech,
  CloudOutlined,
  FolderSpecialOutlined,
  MenuBookOutlined,
  MonitorHeartOutlined,
} from '@mui/icons-material'
import { useState } from 'react'

/* Custom Imports */
import { GENERIC_LINK_TO_REPLACE } from '@/constants/navConstants'
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
      href: GENERIC_LINK_TO_REPLACE,
      icon: <MonitorHeartOutlined />,
    },
    {
      text: 'Reference Data',
      isExternalLink: true,
      href: GENERIC_LINK_TO_REPLACE,
      icon: <FolderSpecialOutlined />,
    },
    {
      text: 'Implementation Guide Authoring Tools',
      isExternalLink: true,
      href: GENERIC_LINK_TO_REPLACE,
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
    <>
      <NavListHeadItem
        text="Industry Testing Resources"
        handleClickCategoryList={handleClickIndustryTestingList}
        icon={<CloudOutlined />}
        openCategoryList={openIndustryTestingList}
      />
      <NavListSubItems items={items} openCategoryList={openIndustryTestingList} />
    </>
  )
}
