import { Box, Button, Card, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import _ from 'lodash'
export type TestCaseFields = {
  name: string
  id: number
  protocol?: string
  desc?: string
  longDesc?: string
  sutRole?: string
  sutHisp?: boolean
  criteria?: string
  sutEdge?: boolean
  ccdaFileRequired?: boolean
  fields?: ExtraFields[]
}

export type ExtraFields = {
  label?: string
  name?: string
  datatype?: string
  placeholder?: string
  value?: string
  readOnly?: boolean
  display?: boolean
}

export interface TestCardProps {
  test: TestCaseFields
}

const TestCard = ({ test }: TestCardProps) => {
  return (
    <Card>
      <CardHeader title={test.name}></CardHeader>
      <Divider />
      <CardContent>
        <Typography variant="body2">{test.desc}</Typography>
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
        {test.ccdaFileRequired && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography>
              CCDA Document Type <InfoIcon color="primary" fontSize="small" />
            </Typography>
            <Button variant="outlined" color="primary">
              SELECT A DOCUMENT
            </Button>
          </Box>
        )}
        {_.has(test, 'fields') &&
          test.fields !== undefined &&
          test.fields[0]?.name === 'sutCommandTimeoutInSeconds' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField name={test.fields[0].name} label={test.fields[0].label} />
            </Box>
          )}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button variant="contained" color="primary">
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
