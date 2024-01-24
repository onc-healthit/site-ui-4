import { Box, Breadcrumbs, Container, Typography } from '@mui/material'

export interface WelcomeHeaderProps {
  heading: string
  description: React.ReactNode
}
const WelcomeHeader = ({ heading, description }: WelcomeHeaderProps) => {
  return (
    <Box
      sx={{
        width: '1441px',
        height: '231px',
        position: 'absolute',
        top: '67px',
        left: '287px',
        boxShadow: 'inset 0px 14px 16px 16px rgb(0 0 0 / 8%)',
        p: 2,
      }}
    >
      <Container disableGutters>
        <Breadcrumbs aria-label="breadcrumb"></Breadcrumbs>
        <Typography variant="h2" component={'h1'} sx={{ mb: 6, mt: 2 }}>
          <strong>{heading}</strong>
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '0.75rem' }}>
          {description}
        </Typography>
      </Container>
    </Box>
  )
}

export default WelcomeHeader
