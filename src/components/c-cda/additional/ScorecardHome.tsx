import SectionHeader from '@shared/SectionHeader'
import { Container } from '@mui/material'
import BannerBox from '@shared/BannerBox'
import styles from '@shared/styles.module.css'
import Link from 'next/link'

export default function ScorecardHome() {
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/c-cda" key="1" className={styles.link}>
            C-CDA
          </Link>,
          <Link color="inherit" href="/c-cda/scorecard" key="2" className={styles.link}>
            Scorecard
          </Link>,
        ]}
        heading={'C-CDA Scorecard'}
        description={
          <>
            The SITE C-CDA Scorecard provides an enhanced level of interoperability for C-CDA documents by using a
            comprehensive scoring system, which allows implementers to improve the data quality and representation of
            their C-CDA documents.
          </>
        }
        description2={
          <>
            <b>PHI Note:</b> The C-CDA Scorecard does not retain your submitted C-CDA file as the file is deleted from
            the server immediately after processing. However, we strongly suggest that you do not include any Protected
            Health Information (PHI) or Personally Identifiable Information (PII) in your C-CDA file submissions to the
            Scorecard. Click{' '}
            <a
              href="http://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html"
              target="_blank"
            >
              here
            </a>{' '}
            for more information on how to de-identify PHI.
          </>
        }
      />
      {/* Main Content */}
      <Container>
        <SectionHeader header={'Run the Scorecard'} subHeader={'Upload your file or try the demo'} />
      </Container>
    </>
  )
}
