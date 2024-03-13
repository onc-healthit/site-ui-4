import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material'

import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'

export interface TestCardProps {
  cardHeader: string
  cardContent: string
  cardInput: string
  links?: { label: string; href: string }[] | null
  helperText: string
  directFromInput: string | null
  endpointInput: string | null
  timeoutInput: string | null
  outgoingInput: string | null
}
const handleClick = (link: string) => {
  navigator.clipboard
    .writeText(link)
    .then(() => {
      alert('Link copied to clipboard: ' + link)
    })
    .catch((err) => {
      console.error('Failed to copy link: ', err)
      alert('Failed to copy link. Please try again.')
    })
}

const TestCard = ({
  cardHeader,
  cardContent,
  directFromInput,
  endpointInput,
  timeoutInput,
  outgoingInput,
  links,
  helperText,
}: TestCardProps) => {
  return (
    <Card>
      <CardHeader title={cardHeader}></CardHeader>
      <Divider />
      <CardContent>
        <Typography variant="body2">{cardContent}</Typography>
        {directFromInput !== null && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              pt: 2,
            }}
          >
            <FormControl fullWidth>
              <TextField fullWidth id="card-input" label={directFromInput} variant="outlined" />
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
          </Box>
        )}
        {endpointInput !== null && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              pt: 2,
            }}
          >
            <FormControl fullWidth>
              <TextField fullWidth id="card-input" label={endpointInput} variant="outlined" />
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
          </Box>
        )}
        {timeoutInput !== null && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              pt: 2,
            }}
          >
            <FormControl fullWidth>
              <TextField fullWidth id="card-input" label={timeoutInput} variant="outlined" />
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
          </Box>
        )}
        {outgoingInput !== null && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              pt: 2,
            }}
          >
            <FormControl fullWidth>
              <TextField fullWidth id="card-input" label={outgoingInput} variant="outlined" />
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
          </Box>
        )}
      </CardContent>
      <Divider />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          paddingY: 2,
          pr: 2,
        }}
      >
        <Box width={'50%'}>
          {links && links.length > 0 && (
            <Box>
              {links.map((link, index) => (
                <Button
                  sx={{ ml: 2 }}
                  key={index}
                  color="secondary"
                  endIcon={<ContentPasteGoIcon color="secondary" />}
                  onClick={() => handleClick(link.href)}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1 }}>
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
