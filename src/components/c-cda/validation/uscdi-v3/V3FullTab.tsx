import { Container } from '@mui/material'
import V3ValidatorForm from '../ValidatorForm'
import { postToValidatorV3 } from '../actions'

const getCriteriaOptions = async (githubUrl: string) => {
  const res = await fetch(githubUrl, { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function V3FullTab() {
  const senderGitHubUrl = process.env.NEXT_PUBLIC_CCDA_VALIDATOR_CURES_USCDIV3_SENDER_URL || ''
  const receiverGitHubUrl = process.env.NEXT_PUBLIC_CCDA_VALIDATOR_CURES_USCDIV3_RECEIVER_URL || ''
  const senderCriteriaOptions = await getCriteriaOptions(senderGitHubUrl)
  const receiverCriteriaOptions = await getCriteriaOptions(receiverGitHubUrl)
  const downloadAllScenariosUrl = process.env.NEXT_PUBLIC_CCDA_VALIDATOR_TEST_DATA_DOWNLOAD || ''
  const validatorVersion = 'V3'
  return (
    <Container>
      <V3ValidatorForm
        senderCriteriaOptions={senderCriteriaOptions}
        receiverCriteriaOptions={receiverCriteriaOptions}
        downloadAllScenariosUrl={downloadAllScenariosUrl}
        formAction={postToValidatorV3}
        version={validatorVersion}
      />
    </Container>
  )
}
