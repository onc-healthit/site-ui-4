import { Container } from '@mui/material'
import IGValidatorForm from '../IGValidatorForm'
import { postToValidatorV3 } from '../actions'

export default function V3IGOnlyTab() {
  const validatorVersion = 'v3IG'
  return (
    <Container>
      <IGValidatorForm version={validatorVersion} formAction={postToValidatorV3} />
    </Container>
  )
}
