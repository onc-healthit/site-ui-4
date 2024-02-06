import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Image from 'next/image'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

export interface CriteriaCardProps {
  title: string
  cardImage: string
  cardHeader: string
  cardSubheader?: string
  description: string
  pathname: string
  maxWidth: number
  imageWidth: string
  buttonTitle?: string // optional as has default
}

const CriteriaCard = ({
  title,
  cardImage,
  cardHeader,
  cardSubheader,
  description,
  pathname,
  maxWidth,
  imageWidth,
  buttonTitle,
}: CriteriaCardProps) => {
  const isExternalLink: boolean = pathname.startsWith('http')
  const defaultButtonTitle: string = buttonTitle ?? 'Go'

  return (
    <Card
      sx={{ maxWidth: maxWidth, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      id="criteria"
    >
      <CardActionArea>
        <CardMedia title={title}>
          <Image style={{ width: imageWidth, height: 'auto' }} src={cardImage} alt={title} />
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
      </CardActionArea>
      <CardActions>
        <Link
          href={pathname}
          target={isExternalLink ? '_blank' : undefined}
          rel={isExternalLink ? 'noopener noreferrer' : undefined}
        >
          <Button size="small" variant="text" color="secondary" endIcon={<ArrowForwardIcon />}>
            {defaultButtonTitle}
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default CriteriaCard
