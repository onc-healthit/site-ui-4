import * as React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

interface FAQCardProps {
  header: string
  content: React.ReactNode
}

const FAQCard: React.FC<FAQCardProps> = ({ header, content }) => {
  return (
    <Card
      sx={{
        maxWidth: '1075px',
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: '4px',
        border: 1,
        borderColor: 'grey.300',
        boxShadow: '-8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
        overflow: 'auto',
        margin: '8px',
        marginLeft: 'auto',
      }}
    >
      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
        {header}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {content}
    </Card>
  )
}

export default FAQCard
