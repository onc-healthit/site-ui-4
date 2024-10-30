import palette from '@/styles/palette'
import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import websiteLaunch from '@public/shared/LogoBackgroundImage.png'

export default function Footer() {
  return (
    <Box width="100%" sx={{ backgroundColor: palette.primaryDark, padding: 1 }} component={'footer'}>
      <Container>
        <Box pt={1} display="flex" flexDirection="row" justifyContent="space-between">
          <Box display="flex" flexDirection="row" gap={2}>
            <Link target="_blank" style={{ color: palette.white }} href={'http://www.hhs.gov/Disclaimer.html'}>
              Disclaimer
            </Link>
            <Link target="_blank" style={{ color: palette.white }} href={'http://www.hhs.gov/Privacy.html'}>
              Privacy Policy
            </Link>
          </Box>
          <Box gap={1} display="flex" flexDirection="row" alignContent={'center'} justifyContent="space-between">
            <Link
              target="_blank"
              style={{ color: palette.white }}
              href={'https://www.healthit.gov/topic/about-astponc'}
            >
              <Image style={{ width: '20px', height: 'auto' }} src={websiteLaunch} alt="Placeholder" />
            </Link>
            <Typography sx={{ mr: 6 }} color="white">
              Owned by The Assistant Secretary for Technology Policy
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
