import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material'
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
        <Typography variant="body1">{cardContent}</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Box>
          <Typography>
            CCDA Document Type <InfoIcon fontSize="small" />
          </Typography>

          <Button variant="text" color="primary">
            SELECT A DOCUMENT
          </Button>
        </Box>
        <Box>
          {' '}
          <Button variant="text" color="primary">
            RUN
          </Button>
          <Button variant="text" color="primary">
            MORE INFO
          </Button>
          <Button variant="text" color="primary">
            LOGS
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}
export default TestCard
