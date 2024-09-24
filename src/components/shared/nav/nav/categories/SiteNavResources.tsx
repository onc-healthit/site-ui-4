import { ContentCopy, IntegrationInstructionsOutlined, ArchiveOutlined } from '@mui/icons-material'
import { useState } from 'react'

/* Custom Imports */
import { NavListItemType } from '@/types/NavListItemType'
import NavListHeadItem from '../NavListHeadItem'
import NavListSubItems from '../NavListSubItems'

export default function SiteNavResources() {
  const [openResourcesList, setOpenResourcesList] = useState(false)

  const handleClickResourcesList = () => {
    setOpenResourcesList(!openResourcesList)
  }

  const items: NavListItemType[] = [
    {
      text: 'Documentation',
      isExternalLink: false,
      href: '/docs',
      icon: <IntegrationInstructionsOutlined aria-label="Go to Documentation" fontSize="small" />,
    },
    {
      text: 'Archived',
      isExternalLink: false,
      href: '/archived',
      icon: <ArchiveOutlined aria-label="Go to archived page" fontSize="small" />,
    },
  ]

  return (
    <>
      <NavListHeadItem
        text="SITE Resources"
        handleClickCategoryList={handleClickResourcesList}
        icon={<ContentCopy aria-label="Open SITE Resources" />}
        openCategoryList={openResourcesList}
      />
      <NavListSubItems items={items} openCategoryList={openResourcesList} />
    </>
  )
}
