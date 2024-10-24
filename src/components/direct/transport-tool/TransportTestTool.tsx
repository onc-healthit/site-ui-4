import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import TransportTestToolContent from './TransportTestToolContent'
import styles from '@/components/shared/styles.module.css'
import { getSampleCCDAFiles } from './actions'

export default async function TransportTestTool() {
  const sampleCCDAFilesEndpoint =
    process.env.TTT_SAMPLE_CCDA_FILES_ENDPOINT ||
    'https://site.healthit.gov/directtransportmessagesender/listsampleccdafiles'
  const sampleCCDAFiles: string[] = (await getSampleCCDAFiles(sampleCCDAFilesEndpoint)) || []
  const trustBundleDownloadUrl = process.env.TTT_DOWNLOAD_TRUSTANCHOR || ''

  // console.log(sampleCCDAFiles)
  // const sampleCCDAFiles: string[] = []
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/transporttool" key="2" className={styles.link}>
            Transport Test Tool
          </Link>,
        ]}
        heading={'Direct Transport Test Tool'}
        description={
          <>
            The goal of the SITE Direct Transport test tool is to provide a mechanism for Health IT developers and
            implementers to test their Direct implementation by sending and receiving messages to and from the SITE
            Direct test tools.
          </>
        }
      />
      <TransportTestToolContent sampleCCDAFiles={sampleCCDAFiles} trustBundleDownloadUrl={trustBundleDownloadUrl} />
    </>
  )
}
