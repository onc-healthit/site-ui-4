'use client'
import { Box, Breadcrumbs, Container, Typography } from '@mui/material'
import TourButton from '@components/shared/tour/TourButton'
export interface BannerProps {
  breadcrumbs?: React.ReactNode
  heading: string
  subHeading?: string
  isTourButton?: boolean
  description: React.ReactNode
}
const BannerBox = ({ breadcrumbs, heading, subHeading, description, isTourButton }: BannerProps) => {
  const subHeadingAndTourButtonBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }

  return (
    <Box sx={{ width: '100%', boxShadow: 'inset 0px 14px 16px 16px rgb(0 0 0 / 8%)', pt: 4, pb: 4 }}>
      <Container>
        {breadcrumbs && <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>}
        <Box sx={subHeadingAndTourButtonBoxStyle}>
          <Typography variant="h3" component={'h1'} sx={{ pt: 1 }}>
            <strong>{heading}</strong>
          </Typography>
          {isTourButton && <TourButton />}
        </Box>
        {subHeading && (
          <Typography gutterBottom variant="h4" component={'h2'}>
            {subHeading}
          </Typography>
        )}
        <Typography variant="body1" sx={{ pt: 1 }}>
          {description}
        </Typography>
      </Container>
    </Box>
  )
}

export default BannerBox
