import ArchiveHomeComponent from '@/components/archived/ArchiveHome'
import CommunicationFab from '@/components/shared/CommunicationFab'
import CommunicationsFabCard from '@/components/shared/server/CommunicationsFabCard'
const ArchiveHome = () => {
  return (
    <>
      <ArchiveHomeComponent />
      <CommunicationFab>
        <CommunicationsFabCard />
      </CommunicationFab>
    </>
  )
}

export default ArchiveHome
