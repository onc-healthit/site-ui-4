import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import Link from 'next/link'

export interface CardWithBorderProps {
  cardHeader: string
  description: string
  buttonTitle: string
  buttonLink: string
  buttonIcon: React.ReactNode
}
const genericCardBlueBorder = {
  display: 'flex',
  width: '50%',
  borderTop: '16px solid #122953',
}

const flexibleContent = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 2,
  p: 2,
}
const CardWithBorder = ({ cardHeader, description, buttonIcon, buttonLink, buttonTitle }: CardWithBorderProps) => {
  return (
    <Card sx={{ ...genericCardBlueBorder }}>
      <CardContent sx={{ ...flexibleContent }}>
        <Typography variant="h6" component="h3" color="default">
          <strong>{cardHeader}</strong>
        </Typography>
        <Typography variant="body2" color="default">
          {description}
        </Typography>{' '}
        <Link href={buttonLink}>
          <Button size="small" variant="text" color="secondary" endIcon={buttonIcon}>
            {buttonTitle}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default CardWithBorder
