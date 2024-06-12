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
        // TODO: Get a unique description from the ONC for USCDI V1
        description={
          <>
            The C-CDA R2.1 Validator is a tool used to check if electronic health documents comply with the Clinical
            Document Architecture (C-CDA) standard&apos;s R2.1 version. C-CDA is a standardized format for sharing
            clinical information, and the validator ensures that documents follow the correct format and content rules
            before being exchanged between healthcare systems.
          </>
        }
      />
      <TabsComponent selectedTab={''} tabs={uscdiV1Tabs} />
    </>
  )
}
