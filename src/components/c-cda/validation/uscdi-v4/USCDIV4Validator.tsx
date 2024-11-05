import BannerBox from '@/components/shared/BannerBox'
import styles from '@shared/styles.module.css'
import Link from 'next/link'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import V4FullTab from './V4FullTab'
import V4IGOnlyTab from './V4IGOnlyTab'

export default function USCDIV4Validator() {
  const uscdiV4Tabs: TabInputs[] = [
    { tabName: 'VALIDATE YOUR C-CDA DOCUMENT', tabIndex: 0, tabPanel: <V4FullTab /> },
    { tabName: 'VALIDATE WITH THE C-CDA IMPLEMENTATION GUIDE ONLY', tabIndex: 1, tabPanel: <V4IGOnlyTab /> },
  ]
  return (
    <>
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/c-cda" key="1" className={styles.link}>
            C-CDA
          </Link>,
          <Link color="inherit" href="/c-cda/uscdi-v4" key="2" className={styles.link}>
            USCDI V4 Validator
          </Link>,
        ]}
        heading={'C-CDA USCDI V4 Validator'}
        description={
          <>
            The C-CDA USCDI v4 Validator is a tool used to check if electronic health documents comply with the Clinical
            Document Architecture (C-CDA) standard&apos;s R2.1 version.
            <br />
            USCDI v4 adds 20 data elements and one data class to USCDI v3.
          </>
        }
      />
      <TabsComponent selectedTab={''} tabs={uscdiV4Tabs} />
    </>
  )
}
