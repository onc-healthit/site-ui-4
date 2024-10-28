import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'
import Image from 'next/image'
import ArrowForwardIcon from '@mui/icons-material/ArrowDownward'
import eventTrack from '@/services/analytics'
export interface CertificateCardProps {
  title: string
  cardImage: string
  cardHeader: string
  description: string
  href: string
}

const CertificateCard = ({ title, cardImage, cardHeader, description, href }: CertificateCardProps) => {
  const trackDownload = () => {
    eventTrack('Download Certification', 'Direct', title)
  }
  return (
    <Card
      sx={{ maxWidth: 250, display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}
      id="certificateDownload"
    >
      <CardMedia title={title} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Image style={{ width: '250px', height: 'auto' }} src={cardImage} alt={title} />
      </CardMedia>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 auto',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h6" component="h3" color="default">
          {cardHeader}
        </Typography>
        <Typography variant="body2" color="default">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Button
          onClick={trackDownload}
          size="small"
          variant="text"
          color="secondary"
          endIcon={<ArrowForwardIcon />}
          href={href}
        >
          DOWNLOAD
        </Button>
      </CardActions>
    </Card>
  )
}

export default CertificateCard
