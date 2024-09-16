/* 'use client'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import DirectMessage from './DirectMessage'
import XDM from './XDMValidator'

const ValidatorHome = () => {
  const validatorTabs: TabInputs[] = [
    { tabName: 'XDM VALIDATOR', tabIndex: 0, tabPanel: <XDM /> },
    { tabName: 'DIRECT MESSAGE', tabIndex: 1, tabPanel: <DirectMessage /> },
  ]
  return (
    <>
      
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/validators" key="2" className={styles.link}>
            Message Validators
          </Link>,
        ]}
        heading={'Message Validators '}
        description={<></>}
      />
      
      <TabsComponent selectedTab={''} tabs={validatorTabs} />
    </>
  )
}

export default ValidatorHome
 */
