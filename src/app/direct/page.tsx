import DirectHomeComponent from '@/components/direct/DirectHome'
import CommunicationFab from '@/components/shared/CommunicationFab'
import CommunicationsFabCard from '@/components/shared/server/CommunicationsFabCard'
const DirectHome = () => {
  return (
    <>
      <DirectHomeComponent />
      <CommunicationFab>
        <CommunicationsFabCard />
      </CommunicationFab>
    </>
  )
}

export default DirectHome
