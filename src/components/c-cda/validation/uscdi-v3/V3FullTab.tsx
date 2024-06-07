import { Container } from '@mui/material'
import _ from 'lodash'
import V3ValidatorForm from '../ValidatorForm'

const getCriteriaOptions = async (githubUrl: string) => {
  const res = await fetch(githubUrl, { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function V3FullTab() {
  const senderGitHubUrl = process.env.NEXT_PUBLIC_CCDA_VALIDATOR_CURES_SENDER_URL || ''
  const receiverGitHubUrl = process.env.NEXT_PUBLIC_CCDA_VALIDATOR_CURES_RECEIVER_URL || ''
  const senderCriteriaOptions = await getCriteriaOptions(senderGitHubUrl)
  const receiverCriteriaOptions = await getCriteriaOptions(receiverGitHubUrl)
  const downloadAllScenariosUrl =
    'https://codeload.github.com/onc-healthit/2015-edition-cures-update-uscdi-v3-testdata/zip/master'
  return (
    <Container>
      <V3ValidatorForm
        senderCriteriaOptions={senderCriteriaOptions}
        receiverCriteriaOptions={receiverCriteriaOptions}
        downloadAllScenariosUrl={downloadAllScenariosUrl}
      />
    </Container>
  )
}
