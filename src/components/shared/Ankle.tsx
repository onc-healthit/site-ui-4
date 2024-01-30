import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'

export default function Ankle() {
  return (
    <Box bgcolor="#122953" pt={4} pb={4}>
      <Container disableGutters>
        <Typography variant="h5" color="#fff" component={'h2'}>
          <strong>Cant find what your looking for?</strong>
        </Typography>
        <Typography variant="body1" color="#fff">
          Please checkout our{' '}
          <Link color="secondary" href={''}>
            Archives
          </Link>{' '}
          or{' '}
          <Link color="secondary" href={''}>
            Resources
          </Link>{' '}
          for more details.
        </Typography>
      </Container>
    </Box>
  )
}
