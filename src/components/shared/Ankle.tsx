import { Box, Container, Typography, Link } from '@mui/material'

export default function Ankle() {
  return (
    <Box bgcolor="#122953" pt={4} pb={4}>
      <Container>
        <Typography variant="h5" color="#fff" component={'h2'}>
          <strong>Cant find what your looking for?</strong>
        </Typography>
        <Typography variant="body1" color="#fff">
          Please checkout our <Link color="secondary">Archives</Link> or <Link color="secondary">Resources</Link> for
          more details.
        </Typography>
      </Container>
    </Box>
  )
}
