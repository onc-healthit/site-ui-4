import { Box, Breadcrumbs, Button, Container, Typography } from '@mui/material'
export interface BannerProps {
  breadcrumbs?: React.ReactNode
  heading: string
  subHeading?: string
  isTourButton?: boolean
  description: React.ReactNode
}
const BannerBox = ({ breadcrumbs, heading, subHeading, description, isTourButton }: BannerProps) => {
  const paddingTopForHeading: number = 7
  const paddingTopForSubHeadingAndButtonBox: number = 3
  const paddingTopForDescription: number = 9

  const subHeadingAndTourButtonBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    pt: `${paddingTopForSubHeadingAndButtonBox}px`,
  }

  return (
    <Box sx={{ width: '100%', boxShadow: 'inset 0px 14px 16px 16px rgb(0 0 0 / 8%)', pt: 4, pb: 4 }}>
      <Container>
        {breadcrumbs && <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>}
        <Typography variant="h3" component={'h1'} sx={{ pt: `${paddingTopForHeading}px` }}>
          <strong>{heading}</strong>
        </Typography>
        {subHeading && (
          <Box sx={subHeadingAndTourButtonBoxStyle}>
            <Typography variant="h4" component={'h2'}>
              {subHeading}
            </Typography>
            {isTourButton && (
              // @Matt: If we only want this specific button text white, use the below line to override this one only.
              // Otherwise, leave my theme override in lightThemeOptions, and delete this line
              // <Button variant="contained" color="secondary" size="small" sx={{ color: palette.white }}>
              <Button variant="contained" color="secondary" size="small">
                TAKE A TOUR
              </Button>
            )}
          </Box>
        )}
        <Typography variant="body1" sx={{ pt: `${paddingTopForDescription}px` }}>
          {description}
        </Typography>
      </Container>
    </Box>
  )
}

export default BannerBox
