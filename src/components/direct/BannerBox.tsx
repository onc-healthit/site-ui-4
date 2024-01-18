
import { Box, Breadcrumbs, Typography } from "@mui/material"
import Link from '@mui/material/Link'

export interface BannerProps {
    title: string
    href: string
    heading: string
    description: any
  }
const BannerBox = ({title,href,heading,description}: BannerProps) => {
  return (
    <Box sx={{width:'100%', boxShadow: 'inset 0px 14px 16px 16px rgb(0 0 0 / 8%)', p:4}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={href}>
          {title}
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" component={'h1'}>{heading}</Typography>
      <Typography variant="body1" >{description}</Typography>
    </Box>
  )
}

export default BannerBox