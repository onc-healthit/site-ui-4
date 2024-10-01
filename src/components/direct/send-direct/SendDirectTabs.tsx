'use client'

import { useEffect, useState } from 'react'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import Version13 from './Version13Tab'
import Version12 from './Version12Tab'
import MessageStatus from './message-status/MessageStatus'
export interface SendDirectTabsProps {
  domainName: string
}
const SendDirectTabs = ({ domainName }: SendDirectTabsProps) => {
  const [selectedTab, setSelectedTab] = useState('VERSION V1.3')

  const sendDirectTabs: TabInputs[] = [
    { tabName: 'VERSION V1.3', tabIndex: 0, tabPanel: <Version13 domainName={domainName} /> },
    { tabName: 'VERSION V1.2', tabIndex: 1, tabPanel: <Version12 domainName={domainName} /> },
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

  return <TabsComponent selectedTab={selectedTab} tabs={sendDirectTabs} />
}

export default SendDirectTabs
