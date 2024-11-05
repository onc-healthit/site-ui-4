import BannerBox from '@/components/shared/BannerBox'
import styles from '@shared/styles.module.css'
import Link from 'next/link'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import V3FullTab from './V3FullTab'
import V3IGOnlyTab from './V3IGOnlyTab'

export default function USCDIV3Validator() {
  const uscdiV3Tabs: TabInputs[] = [
    { tabName: 'VALIDATE YOUR C-CDA DOCUMENT', tabIndex: 0, tabPanel: <V3FullTab /> },
    { tabName: 'VALIDATE WITH THE C-CDA IMPLEMENTATION GUIDE ONLY', tabIndex: 1, tabPanel: <V3IGOnlyTab /> },
  ]
  return (
    <>
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/c-cda" key="1" className={styles.link}>
            C-CDA
          </Link>,
          <Link color="inherit" href="/c-cda/uscdi-v3" key="2" className={styles.link}>
            USCDI V3 Validator
          </Link>,
        ]}
        heading={'C-CDA USCDI V3 Validator'}
        description={
          <>
            The C-CDA USCDI v3 Validator is a tool used to check if electronic health documents comply with the Clinical
            Document Architecture (C-CDA) standard&apos;s R2.1 version.
            <br />
            USCDI v3 contains data classes and elements from USCDI v2 and new data classes and elements submitted
            through the ONDEC system.
          </>
        }
      />
      <TabsComponent selectedTab={''} tabs={uscdiV3Tabs} />
    </>
  )
}
