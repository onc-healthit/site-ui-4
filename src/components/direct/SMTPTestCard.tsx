import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography, Stack } from '@mui/material'
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Stack direction="column">
            <Typography>
              CCDA Document Type <InfoIcon fontSize="small" />
            </Typography>

            <Button variant="outlined" color="primary">
              SELECT A DOCUMENT
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="primary" disabled>
              RUN
            </Button>
            <Button variant="outlined" color="primary">
              MORE INFO
            </Button>
            <Button variant="outlined" color="primary">
              LOGS
            </Button>
          </Stack>
        </Box>
      </CardActions>
    </Card>
  )
}
export default TestCard
