'use client'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import Version13 from './Version13Tab'
import Version12 from './Version12Tab'
import MessageStatus from './MessageStatus'

const SendDirect = () => {
  const sendDirectTabs: TabInputs[] = [
    { tabName: 'VERSION V1.3', tabIndex: 0, tabPanel: <Version13 /> },
    { tabName: 'VERSION V1.2', tabIndex: 1, tabPanel: <Version12 /> },
    { tabName: 'Message Status', tabIndex: 2, tabPanel: <MessageStatus /> },
  ]
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/senddirect" key="2" className={styles.link}>
            Direct Message
          </Link>,
        ]}
        heading={'Send Direct Message '}
        description={<>Send a Direct message from this tool to a HISP of your choosing. Need more text here</>}
      />
      {/* Main Content */}
      <TabsComponent selectedTab={''} tabs={sendDirectTabs} />
    </>
  )
}

export default SendDirect
