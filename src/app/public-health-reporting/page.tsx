import PHRComponent from '@/components/public-health-reporting/PHRHome'
import CommunicationFab from '@/components/shared/CommunicationFab'
import CommunicationsFabCard from '@/components/shared/server/CommunicationsFabCard'
const PHRHome = () => {
  return (
    <>
      <PHRComponent />
      <CommunicationFab>
        <CommunicationsFabCard />
      </CommunicationFab>
    </>
  )
}

export default PHRHome
