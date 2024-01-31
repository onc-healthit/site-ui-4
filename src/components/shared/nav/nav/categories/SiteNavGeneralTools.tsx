import {
  FireplaceOutlined,
  HandymanOutlined,
  HealingOutlined,
  ImportantDevicesOutlined,
  SquareFootOutlined,
} from '@mui/icons-material'
import { useState } from 'react'

/* Custom Imports */
import { GENERIC_LINK_TO_REPLACE } from '@/constants/navConstants'
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
      href: GENERIC_LINK_TO_REPLACE,
      icon: <ImportantDevicesOutlined />,
    },
    {
      text: 'IHE Testing Tools',
      isExternalLink: true,
      href: GENERIC_LINK_TO_REPLACE,
      icon: <HealingOutlined />,
    },
    {
      text: 'Lantern Project',
      isExternalLink: true,
      href: GENERIC_LINK_TO_REPLACE,
      icon: <FireplaceOutlined />,
    },
    {
      text: 'NIST Conformance Test',
      isExternalLink: true,
      href: GENERIC_LINK_TO_REPLACE,
      icon: <SquareFootOutlined />,
    },
  ]

  return (
    <>
      <NavListHeadItem
        text="General Testing Tools"
        handleClickCategoryList={handleClickGeneralTestingList}
        icon={<HandymanOutlined />}
        openCategoryList={openGeneralTestingList}
      />
      <NavListSubItems items={items} openCategoryList={openGeneralTestingList} />
    </>
  )
}
