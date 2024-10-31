'use server'
import { Button, Card, CardActions, CardHeader, CardMedia, Typography } from '@mui/material'
import Image from 'next/image'
import websiteLaunch from '@public/shared/SITE_Website_Launch.svg'

const CommunicationsFabCard = () => {
  return (
    <Card>
      <CardMedia sx={{ width: 'auto' }}>
        <Image style={{ width: '330px', height: 'auto' }} src={websiteLaunch} alt="Placeholder" />
      </CardMedia>
      <CardHeader
        sx={{ px: 1, pt: 1, pb: 0 }}
        titleTypographyProps={{ variant: 'body1', fontSize: '.85em', fontWeight: 'bold' }}
        title={process.env.ASTP_RELEASE_CONTENT_HEADER ?? ''}
      ></CardHeader>
      <Typography sx={{ px: 1, fontSize: '.75em' }} variant="body2">
        {process.env.ASTP_RELEASE_CONTENT ?? ''}
      </Typography>
      <CardActions>
        <Button
          href={process.env.ASTP_RELEASE_BLOG_URL ?? '/'}
          size="small"
          variant="text"
          color="secondary"
          target="_blank"
        >
          Read More...
        </Button>
      </CardActions>
    </Card>
  )
}

export default CommunicationsFabCard
