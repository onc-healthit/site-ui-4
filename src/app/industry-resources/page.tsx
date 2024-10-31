import IndustryResourcesComp from '@/components/industry-resources/IndustryResourcesHome'
import CommunicationFab from '@/components/shared/CommunicationFab'
import CommunicationsFabCard from '@/components/shared/server/CommunicationsFabCard'
const IndustryResourcesHome = () => {
  return (
    <>
      <IndustryResourcesComp />
      <CommunicationFab>
        <CommunicationsFabCard />
      </CommunicationFab>
    </>
  )
}

export default IndustryResourcesHome
