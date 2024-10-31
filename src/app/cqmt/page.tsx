import CqmComponent from '@/components/cqmt/CqmHome'
import CommunicationFab from '@/components/shared/CommunicationFab'
import CommunicationsFabCard from '@/components/shared/server/CommunicationsFabCard'
const CqmHome = () => {
  return (
    <>
      <CqmComponent />
      <CommunicationFab>
        <CommunicationsFabCard />
      </CommunicationFab>
    </>
  )
}

export default CqmHome
