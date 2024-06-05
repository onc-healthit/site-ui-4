import { Container, Divider } from '@mui/material'
import ScorecardNextSteps from './next-steps/ScorecardNextSteps'
import ScorecardBaseCheck from './summary/ScorecardBaseCheck'
import ScorecardBestPractice from './summary/ScorecardBestPractice'
import ScorecardCompare from './summary/ScorecardCompare'

export default function ScorecardResults() {
  const dividerPaddingStyle = {
    paddingTop: 2,
  }

  return (
    <Container>
      <ScorecardBaseCheck></ScorecardBaseCheck>
      <Divider sx={dividerPaddingStyle} />
      <ScorecardBestPractice></ScorecardBestPractice>
      <Divider sx={dividerPaddingStyle} />
      <ScorecardCompare></ScorecardCompare>
      <Divider sx={dividerPaddingStyle} />
      <ScorecardNextSteps></ScorecardNextSteps>
    </Container>
  )
}
