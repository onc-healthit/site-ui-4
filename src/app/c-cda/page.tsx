import CCDAHomeComponent from '@/components/c-cda/CCDAHome'
import CommunicationFab from '@/components/shared/CommunicationFab'
import CommunicationsFabCard from '@/components/shared/server/CommunicationsFabCard'
const CCDAHome = () => {
  return (
    <>
      <CCDAHomeComponent />
      <CommunicationFab>
        <CommunicationsFabCard />
      </CommunicationFab>
    </>
  )
}

export default CCDAHome
