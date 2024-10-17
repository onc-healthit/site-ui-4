import { Container } from '@mui/material'
import IGValidatorForm from '../IGValidatorForm'
import { postToValidatorV4 } from '../actions'

export default function V4IGOnlyTab() {
  const validatorVersion = 'v4IG'
  return (
    <Container>
      <IGValidatorForm version={validatorVersion} formAction={postToValidatorV4} />
    </Container>
  )
}
