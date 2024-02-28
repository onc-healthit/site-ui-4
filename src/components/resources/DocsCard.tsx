import * as React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

interface DocsCardProps {
  header: string
  content: React.ReactNode
}

const DocsCard: React.FC<DocsCardProps> = ({ header, content }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Card
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: '4px',
          border: 1,
          borderColor: 'grey.300',
          boxShadow: '-8px 0px 32px 0px rgba(0, 0, 0, 0.16)',
          overflow: 'auto',
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.5rem' }}>
          {header}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {content}
      </Card>
    </Box>
  )
}

export default DocsCard
