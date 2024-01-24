import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export interface CriteriaCardProps {
  cardHeader: string
  description: string
}
const ArchiveCard = ({ cardHeader, description }: CriteriaCardProps) => {
  return (
    <Card sx={{ width: '244.75px', height: '245px', margin: '16px', borderTop: '16px solid #E8E8E8' }} id="category">
      <CardContent sx={{ pt: 2, pb: 3, pl: 3, pr: 3 }}>
        <Typography variant="h6" component="h3" color="default">
          <strong>{cardHeader}</strong>
        </Typography>
        <Typography variant="caption" color="default" sx={{ mt: 1, mb: 1 }}>
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

export default ArchiveCard
