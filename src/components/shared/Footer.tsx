import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'

export default function Footer() {
  return (
    <Box width="100%" sx={{ backgroundColor: '#000000', padding: 1 }} component={'footer'}>
      <Container disableGutters>
        <Box pt={1} display="flex" flexDirection="row" justifyContent="space-between">
          <Box display="flex" flexDirection="row" gap={2}>
            <Link color="secondary" href={''}>
              Disclaimer
            </Link>
            <Link color="secondary" href={''}>
              Privacy Policy
            </Link>
          </Box>
          <Typography color="white">
            Owned by The Office of the National Coordinator for Health Information Technology
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
