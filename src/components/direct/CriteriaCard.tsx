import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'
import Image from 'next/image'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export interface CriteriaCardProps {
  title: string
  cardImage: string
  cardHeader: string
  cardSubheader: string
  description: string
}

const CriteriaCard = ({ title, cardImage, cardHeader, cardSubheader, description }: CriteriaCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }} id="criteria">
      <CardMedia title={title}>
        <Image style={{ width: '350px', height: 'auto' }} src={cardImage} alt={title} />
      </CardMedia>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="h3" color="default">
          <strong>{cardHeader}</strong>
        </Typography>
        <Typography variant="body2" color="default">
          {cardSubheader}
        </Typography>
        <Typography variant="body1" color="default" sx={{ paddingTop: 2 }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="text" color="secondary" endIcon={<ArrowForwardIcon />}>
          Go
        </Button>
      </CardActions>
    </Card>
  )
}

export default CriteriaCard
