import { Container } from '@mui/material'
import _ from 'lodash'
import V3ValidatorForm from './ValidatorForm'

const getCriteriaOptions = async (githubUrl: string) => {
  const res = await fetch(githubUrl, { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function V3FullTab() {
  const senderGitHubUrl =
    'https://api.github.com/repos/onc-healthit/2015-certification-ccda-testdata/contents/Sender SUT Test Data'
  const receiverGitHubUrl =
    'https://api.github.com/repos/onc-healthit/2015-certification-ccda-testdata/contents/Receiver SUT Test Data'
  const senderCriteriaOptions = await getCriteriaOptions(senderGitHubUrl)
  const receiverCriteriaOptions = await getCriteriaOptions(receiverGitHubUrl)

  return (
    <Container>
      <V3ValidatorForm
        senderCriteriaOptions={senderCriteriaOptions}
        receiverCriteriaOptions={receiverCriteriaOptions}
      />
    </Container>
  )
}
