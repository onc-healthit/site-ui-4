'use client'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import SMTP from './SMTPTab'
import MessageTracking from './MessageTrackingTab'
import IMAP from './IMAPTab'
import POP3 from './POP3Tab'
import XDR from './XDRTab'
import ValidationResults from './ValidationResultsTab'
import ProfileProvider from './provider'

const HISPPortal = () => {
  const hispTabs: TabInputs[] = [
    { tabName: 'SMTP', tabIndex: 0, tabPanel: <SMTP /> },
    { tabName: 'MESSAGE TRACKING', tabIndex: 1, tabPanel: <MessageTracking /> },
    { tabName: 'IMAP', tabIndex: 2, tabPanel: <IMAP /> },
    { tabName: 'POP3', tabIndex: 3, tabPanel: <POP3 /> },
    { tabName: 'XDR', tabIndex: 4, tabPanel: <XDR /> },
    { tabName: 'VALIDATION RESULTS', tabIndex: 5, tabPanel: <ValidationResults /> },
  ]
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/hisp" key="2" className={styles.link}>
            HISP Testing Tools
          </Link>,
        ]}
        heading={'HISP Testing Tools '}
        description={
          <>
            {
              'Software designed to evaluate and ensure the interoperability and security of health information exchange(HIE) systems. These tools are essential for testing the capabilities of HISPs, which are responsible for securely transmitting health information between different entities in the healthcare ecosystem, such as healthcare providers, laboratories, and public health agencies.'
            }
          </>
        }
      />
      {/* Main Content */}
      <ProfileProvider>
        <TabsComponent selectedTab={''} tabs={hispTabs} />
      </ProfileProvider>
    </>
  )
}

export default HISPPortal
