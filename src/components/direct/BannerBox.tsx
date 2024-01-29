import { Box, Breadcrumbs, Container, Typography } from '@mui/material'
import Link from '@mui/material/Link'

export interface BannerProps {
  title: string
  href: string
  heading: string
  description: React.ReactNode
}
const BannerBox = ({ title, href, heading, description }: BannerProps) => {
  return (
    <Box sx={{ width: '100%', boxShadow: 'inset 0px 14px 16px 16px rgb(0 0 0 / 8%)', pt: 4, pb: 4 }}>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href={href}>
            {title}
          </Link>
        </Breadcrumbs>
        <Typography variant="h3" component={'h1'}>
          <strong>{heading}</strong>
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Container>
    </Box>
  )
}

export default BannerBox
