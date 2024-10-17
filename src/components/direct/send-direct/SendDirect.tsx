import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'

import SendDirectTabs from './SendDirectTabs'
function getDomainName(url: string) {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.hostname
  } catch (error) {
    console.error('Invalid URL:', error)
    return null
  }
}
const SendDirect = () => {
  const apiUrl = process.env.SEND_DIRECT_API || 'https://ett.healthit.gov/ett/api'
  const domainName = getDomainName(apiUrl)

  return (
    <>
      <BannerBox
        breadcrumbs={[
          <Link href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link href="/direct/senddirect" key="2" className={styles.link}>
            Send Direct
          </Link>,
        ]}
        heading={'Send Direct Message'}
        description="Send a Direct message from this tool to a HISP of your choosing."
      />
      <SendDirectTabs domainName={domainName || ''} />
    </>
  )
}

export default SendDirect
