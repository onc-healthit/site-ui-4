import { Container } from '@mui/material'
import V1ValidatorForm from '../ValidatorForm'
import { postToValidatorV1 } from '../actions'

const getCriteriaOptions = async (githubUrl: string) => {
  const res = await fetch(githubUrl, { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function V1FullTab() {
  const senderGitHubUrl = process.env.NEXT_PUBLIC_CCDA_VALIDATOR_CURES_V1_SENDER_URL || ''
  const receiverGitHubUrl = process.env.NEXT_PUBLIC_CCDA_VALIDATOR_CURES_V1_RECEIVER_URL || ''
  const senderCriteriaOptions = await getCriteriaOptions(senderGitHubUrl)
  const receiverCriteriaOptions = await getCriteriaOptions(receiverGitHubUrl)
  const downloadAllScenariosUrl = process.env.NEXT_PUBLIC_CCDA_VALIDATOR_TEST_DATA_DOWNLOAD || ''
  const validatorVersion = 'V1'
  return (
    <Container>
      <V1ValidatorForm
        senderCriteriaOptions={senderCriteriaOptions}
        receiverCriteriaOptions={receiverCriteriaOptions}
        downloadAllScenariosUrl={downloadAllScenariosUrl}
        formAction={postToValidatorV1}
        version={validatorVersion}
      />
    </Container>
  )
}
