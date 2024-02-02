import {
  FireplaceOutlined,
  HandymanOutlined,
  HealingOutlined,
  ImportantDevicesOutlined,
  SquareFootOutlined,
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
      icon: <ImportantDevicesOutlined />,
    },
    {
      text: 'IHE Testing Tools',
      isExternalLink: true,
      href: 'https://www.ihe.net/testing/testing_tools/',
      icon: <HealingOutlined />,
    },
    {
      text: 'Lantern Project',
      isExternalLink: true,
      href: 'https://lantern.healthit.gov/?tab=dashboard_tab',
      icon: <FireplaceOutlined />,
    },
    {
      text: 'NIST Conformance Test',
      isExternalLink: false,
      href: '/nist-conformance-test',
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
