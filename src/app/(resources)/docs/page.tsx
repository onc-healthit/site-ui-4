import DocsHomeComponent from '@/components/resources/DocsHome'
import CommunicationFab from '@/components/shared/CommunicationFab'
import CommunicationsFabCard from '@/components/shared/server/CommunicationsFabCard'
const DocsHome = () => {
  return (
    <>
      <DocsHomeComponent />
      <CommunicationFab>
        <CommunicationsFabCard />
      </CommunicationFab>
    </>
  )
}

export default DocsHome
