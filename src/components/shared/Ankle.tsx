import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'

export default function Ankle() {
  return (
    <Box bgcolor="#122953" boxShadow={'0px -4px 20px 20px rgb(0, 0, 0, 0.15)'} pt={4} pb={4}>
      <Container>
        <Typography variant="h5" color="#fff" component={'h2'}>
          <strong>Cant find what your looking for?</strong>
        </Typography>
        <Typography variant="body1" color="#fff">
          Please checkout our{' '}
          <Link color="secondary" href="/faqs" passHref>
            FAQs
          </Link>{', '}
          <Link color="secondary" href="/docs-and-vids" passHref>
            Documentation &amp; Videos
          </Link>{', '}
          or{' '}
          <Link color="secondary" href="/archived" passHref>
            Archived
          </Link>{' section '}
          for more details.
        </Typography>
      </Container>
    </Box>
  )
}
