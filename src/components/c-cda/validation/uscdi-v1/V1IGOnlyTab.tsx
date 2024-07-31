import { Container } from '@mui/material'
import IGValidatorForm from '../IGValidatorForm'
import { postToValidatorV1 } from '../actions'

export default function V1IGOnlyTab() {
  const validatorVersion = 'v1IG'
  return (
    <Container>
      <IGValidatorForm version={validatorVersion} formAction={postToValidatorV1} />
    </Container>
  )
}
