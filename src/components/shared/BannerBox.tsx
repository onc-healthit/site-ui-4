'use client'
import TourButton from '@components/shared/tour/TourButton'
import { Box, Breadcrumbs, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export interface BannerProps {
  breadcrumbs?: React.ReactNode
  heading: React.ReactNode
  subHeading?: string
  isTourButton?: boolean
  description: React.ReactNode
  description2?: React.ReactNode
}
const BannerBox = ({ breadcrumbs, heading, subHeading, isTourButton, description, description2 }: BannerProps) => {
  const theme = useTheme()

  const subHeadingAndTourButtonBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingRight: '32px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '8px',
    },
  }

  return (
    <Box sx={{ width: '100%', boxShadow: 'inset 0px 14px 16px 16px rgb(0 0 0 / 8%)', pt: 4, pb: 4 }}>
      <Container>
        {breadcrumbs && <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>}
        <Box sx={subHeadingAndTourButtonBoxStyle}>
          <Box>
            <Typography variant="h3" component={'h1'} sx={{ pt: 1 }}>
              <strong>{heading}</strong>
            </Typography>
            {subHeading && (
              <Typography gutterBottom variant="h4" component={'h2'}>
                {subHeading}
              </Typography>
            )}
          </Box>
          {isTourButton && <TourButton />}
        </Box>
        <Typography variant="body1" sx={{ pt: 1 }}>
          {description}
        </Typography>
        <Typography variant="body1" sx={{ pt: 1 }}>
          {description2}
        </Typography>
      </Container>
    </Box>
  )
}

export default BannerBox
