import { ContentCopy, IntegrationInstructionsOutlined, QuestionAnswerOutlined } from '@mui/icons-material'
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
      text: 'FAQs',
      isExternalLink: false,
      href: '/faqs',
      icon: <QuestionAnswerOutlined />,
    },
    {
      text: 'Documentation & Videos',
      isExternalLink: false,
      href: '/docs-and-vids',
      icon: <IntegrationInstructionsOutlined />,
    },
  ]

  return (
    <>
      <NavListHeadItem
        text="SITE Resources"
        handleClickCategoryList={handleClickResourcesList}
        icon={<ContentCopy />}
        openCategoryList={openResourcesList}
      />
      <NavListSubItems items={items} openCategoryList={openResourcesList} />
    </>
  )
}
