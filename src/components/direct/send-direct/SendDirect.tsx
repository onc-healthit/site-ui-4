'use client'

import { useEffect, useState } from 'react'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import Version13 from './Version13Tab'
import Version12 from './Version12Tab'
import MessageStatus from './message-status/MessageStatus'

const SendDirect = () => {
  const [selectedTab, setSelectedTab] = useState('VERSION V1.3')

  const sendDirectTabs: TabInputs[] = [
    { tabName: 'VERSION V1.3', tabIndex: 0, tabPanel: <Version13 /> },
    { tabName: 'VERSION V1.2', tabIndex: 1, tabPanel: <Version12 /> },
    { tabName: 'Message Status', tabIndex: 2, tabPanel: <MessageStatus /> },
  ]

  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.replace('#', '').replace(/-/g, ' ').toLowerCase()
      const tab = sendDirectTabs.find((t) => t.tabName.toLowerCase() === hash)
      setSelectedTab(tab ? tab.tabName : 'VERSION V1.3')
    }

    handleRouteChange()
    window.addEventListener('hashchange', handleRouteChange)

    return () => {
      window.removeEventListener('hashchange', handleRouteChange)
    }
  }, [])

  return (
    <>
      <BannerBox
        breadcrumbs={[
          <Link href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link href="/direct/senddirect" key="2" className={styles.link}>
            Direct Message
          </Link>,
        ]}
        heading={'Send Direct Message'}
        description="Send a Direct message from this tool to a HISP of your choosing. Need more text here"
      />
      <TabsComponent selectedTab={selectedTab} tabs={sendDirectTabs} />
    </>
  )
}

export default SendDirect
