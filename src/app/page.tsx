import SiteHome from '@/components/home/SiteHome'
import NotificationFab from '@/components/shared/Notifications'
import CommunicationFab from '@/components/shared/CommunicationFab'
import PHIBanner from '@/components/shared/PHIBanner'

export default function Home() {
  return (
    <>
      <SiteHome />
      <PHIBanner />
      <NotificationFab />
      <CommunicationFab />
    </>
  )
}
