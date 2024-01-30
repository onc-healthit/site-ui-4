import { Box, Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
export interface TestCardProps {
  cardHeader: string
  cardContent: string
}

const TestCard = ({ cardHeader, cardContent }: TestCardProps) => {
  return (
    <Card>
      <CardHeader title={cardHeader}></CardHeader>
      <Divider />
      <CardContent>
        <Typography variant="body2">{cardContent}</Typography>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'end',
          width: '100%',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography>
            CCDA Document Type <InfoIcon color="primary" fontSize="small" />
          </Typography>
          <Button variant="outlined" color="primary">
            SELECT A DOCUMENT
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button variant="contained" color="primary" disabled>
            RUN
          </Button>
          <Button variant="contained" color="inherit">
            MORE INFO
          </Button>
          <Button variant="contained" color="inherit">
            LOGS
          </Button>
        </Box>
      </Box>
    </Card>
  )
}
export default TestCard
