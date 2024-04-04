import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea } from '@mui/material'
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

const CardHome = ({
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
    <Box
      sx={{
        transition: 'transform 0.15s ease-in-out',
        '&:hover': {
          transform: 'scale3d(1.05, 1.05, 1)',
          boxShadow: '0px 0px 16px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardActionArea aria-label="button">
        <Card
          sx={{
            maxWidth: maxWidth,
            minHeight: '350px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Link
            href={pathname}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <Box>
              <CardMedia title={title}>
                <Image style={{ width: imageWidth, height: 'auto' }} src={cardImage} alt={title} />
              </CardMedia>
              <Box minHeight={'150px'} sx={{ paddingX: 2, pt: 2 }}>
                <Typography variant="h4" component="h2" color="default">
                  <strong>{cardHeader}</strong>
                </Typography>
                <Typography variant="body2" color="default">
                  {cardSubheader}
                </Typography>
                <Typography variant="body1" color="default" sx={{ paddingTop: 2 }}>
                  {description}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingX: 2, paddingY: 2 }}>
              <Typography sx={{ marginRight: 1 }} color="secondary">
                {defaultButtonTitle}
              </Typography>
              <ArrowForwardIcon fontSize="small" color="secondary" />
            </Box>
          </Link>
        </Card>
      </CardActionArea>
    </Box>
  )
}

export default CardHome
