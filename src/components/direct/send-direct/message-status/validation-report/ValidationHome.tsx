'use client'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import ValidationReportHome from './ValidationReport'

const ValidationHome = () => {
  const ValidationHomeTabs: TabInputs[] = [
    { tabName: 'Validation Report', tabIndex: 0, tabPanel: <ValidationReportHome /> },
    { tabName: 'Validation Report USCDI v2', tabIndex: 1, tabPanel: <div /> },
    { tabName: 'Encrypted Message', tabIndex: 2, tabPanel: <div /> },
    { tabName: 'Decrypted Message', tabIndex: 3, tabPanel: <div /> },
    { tabName: 'Attachement-0', tabIndex: 4, tabPanel: <div /> },
    { tabName: 'Attachement-1', tabIndex: 5, tabPanel: <div /> },
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
            Send Direct Message
          </Link>,
          <Link color="inherit" href="/direct/senddirect/messagestatusreport" key="2" className={styles.link}>
            Validation Report
          </Link>,
        ]}
        heading={'Validation Report'}
        description={<>Validation Report Number</>}
      />
      {/* Main Content */}
      <TabsComponent selectedTab={''} tabs={ValidationHomeTabs} />
    </>
  )
}

export default ValidationHome
