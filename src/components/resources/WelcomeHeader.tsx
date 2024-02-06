import { Box, Breadcrumbs, Container, Typography } from '@mui/material'

export interface WelcomeHeaderProps {
  heading: string
  subheading: string
  description: React.ReactNode
}
const WelcomeHeader = ({ heading, subheading, description }: WelcomeHeaderProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '231px',
        position: 'absolute',
        top: '67px',
        boxShadow: 'inset 0px 14px 16px 16px rgb(0 0 0 / 8%)',
        p: 2,
      }}
    >
      <Container disableGutters>
        <Breadcrumbs aria-label="breadcrumb"></Breadcrumbs>
        <Typography variant="h2" component={'h1'} sx={{ mb: 2, mt: 2, fontSize: '2rem' }}>
          <strong>{heading}</strong>
        </Typography>
        <Typography variant="h2" component={'h1'} sx={{ mb: 2, mt: 2, fontSize: '2rem' }}>
          {subheading}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
          {description}
        </Typography>
      </Container>
    </Box>
  )
}

export default WelcomeHeader
