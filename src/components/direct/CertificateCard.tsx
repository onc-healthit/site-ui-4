import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'
import Image from 'next/image'
import ArrowForwardIcon from '@mui/icons-material/ArrowDownward'
export interface CertificateCardProps {
    title: string
    cardImage: string
    cardHeader: string
    description: any
  }
const CertificateCard = ({title,cardImage,cardHeader,description}:CertificateCardProps) => {
  return (
   
    <Card id="certificateDownload">    
       <CardMedia
        title={title}
        ><Image src={cardImage} alt={title} /></CardMedia>
        <CardContent  sx ={{p:3}}>
            
          <Typography variant="h6" component="h3" color="default">
            {cardHeader}
          </Typography>
         
          <Typography variant="body1" color="default">{description}</Typography>
        </CardContent>
      <CardActions>
        <Button size="small" variant="text" color="secondary" endIcon={<ArrowForwardIcon/>}>
         DOWNLOAD
        </Button>
      </CardActions>
    </Card>
  )
}

export default CertificateCard