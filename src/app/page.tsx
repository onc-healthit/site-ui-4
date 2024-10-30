import SiteHome from '@/components/home/SiteHome'
import NotificationFab from '@/components/shared/Notifications'
import CommunicationFab from '@/components/shared/CommunicationFab'
import PHIBanner from '@/components/shared/PHIBanner'
import CommunicationsFabCard from '@/components/shared/server/CommunicationsFabCard'

export default function Home() {
  return (
    <>
      <SiteHome />
      <PHIBanner />
      <NotificationFab />
      <CommunicationFab>
        <CommunicationsFabCard />
      </CommunicationFab>
    </>
  )
}
