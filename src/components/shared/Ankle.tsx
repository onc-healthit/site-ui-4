import palette from '@/styles/palette'
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
          <Link style={{ color: palette.white }} href="/faqs" passHref>
            FAQs
          </Link>
          {', '}
          <Link style={{ color: palette.white }} href="/docs-and-vids" passHref>
            Documentation &amp; Videos
          </Link>
          {', '}
          or{' '}
          <Link style={{ color: palette.white }} href="/archived" passHref>
            Archived
          </Link>
          {' section '}
          for more details.
        </Typography>
      </Container>
    </Box>
  )
}
