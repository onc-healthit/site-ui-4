'use client'
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
      icon: <QuestionAnswerOutlined aria-label="Go to FAQs" fontSize="small" />,
    },
    {
      text: 'Documentation & Videos',
      isExternalLink: false,
      href: '/docs-and-vids',
      icon: <IntegrationInstructionsOutlined aria-label="Go to Documentation and Videos" fontSize="small" />,
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
