import BannerBox from '@/components/shared/BannerBox'
import styles from '@shared/styles.module.css'
import Link from 'next/link'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import V1FullTab from './V1FullTab'
import V1IGOnlyTab from './V1IGOnlyTab'

export default function USCDIV1Validator() {
  const uscdiV1Tabs: TabInputs[] = [
    { tabName: 'VALIDATE YOUR C-CDA DOCUMENT', tabIndex: 0, tabPanel: <V1FullTab /> },
    { tabName: 'VALIDATE WITH THE C-CDA IMPLEMENTATION GUIDE ONLY', tabIndex: 1, tabPanel: <V1IGOnlyTab /> },
  ]
  return (
    <>
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/c-cda" key="1" className={styles.link}>
            C-CDA
          </Link>,
          <Link color="inherit" href="/c-cda/uscdi-v1" key="2" className={styles.link}>
            USCDI V1 Validator
          </Link>,
        ]}
        heading={'C-CDA USCDI V1 Validator'}
        description={
          <>
            The C-CDA USCDI v1 Validator is a tool used to check if electronic health documents comply with the Clinical
            Document Architecture (C-CDA) standard&apos;s R2.1 version.
            <br />
            The first version of the United States Core Data for Interoperability (USCDI v1) is adopted as a standard in
            the ONC Cures Act Final Rule. The USCDI sets a foundation for broader sharing of electronic health
            information to support patient care.
          </>
        }
      />
      <TabsComponent selectedTab={''} tabs={uscdiV1Tabs} />
    </>
  )
}
