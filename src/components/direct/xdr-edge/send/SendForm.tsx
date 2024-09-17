import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  Card,
  CardContent,
  FormLabel,
} from '@mui/material'
import DragandDropFile from '@components/shared/DragandDropFile'
import HelpIcon from '@mui/icons-material/Help'
import React, { useState } from 'react'

//Pull these from TTT_SAMPLE_CCDA_FILES_ENDPOINT?
const documentDropdown = [
  {
    value: 'Placeholder',
    label: 'Placeholder',
  },
]

const messageType = [
  { value: 'Minimal', label: 'Minimal' },
  { value: 'Full', label: 'Full' },
]

export interface SendFormProps {
  version: string
}

const SendForm = ({ version }: SendFormProps) => {
  const [formValues, setFormValues] = useState({})
  const [showOptional, setShowOptional] = React.useState(false)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.currentTarget
    setFormValues({
      ...formValues,
      [name]: value,
    })
    console.log(formValues)
  }

  const handleOptionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOptional(e.target.checked)
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Box pb={4} component="form" width={'100%'} noValidate onSubmit={handleSubmit}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pb={4} gap={4} pt={2}>
              <TextField
                sx={{ width: '50%', pb: 2 }}
                id="endpoint"
                name="endpoint"
                label="Enter Your Endpoint URL"
                helperText="Direct messages will be accepted for validation only when the Direct (From) address is registered here."
              />
              <TextField
                sx={{ width: '50%', pb: 2 }}
                id="message-type"
                select
                name="messageType"
                label="Select an XDR Message Type:"
                helperText=""
                defaultValue="Minimal"
              >
                {messageType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box
              display={'flex'}
              alignItems={'baseline'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              pb={4}
              gap={4}
            >
              {version === 'template' && (
                <TextField
                  fullWidth
                  id="select-document"
                  name="document"
                  select
                  label="Select a Template Sample C-CDA File to Send:"
                  helperText=""
                  defaultValue=""
                >
                  {documentDropdown.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              {version === 'content' && (
                <Box width={'100%'}>
                  <Stack direction="row" alignItems="flex-start" gap={1}>
                    <Typography gutterBottom variant="body1">
                      Select a Local C-CDA File to Send:
                    </Typography>
                    <Tooltip
                      title="Upload your own C-CDA to attach the message. Only one C-CDA document will be attached either your own or the one you selected from the tool."
                      arrow
                      placement="right"
                    >
                      <HelpIcon color="primary" fontSize={'small'} />
                    </Tooltip>
                  </Stack>
                  <DragandDropFile />
                </Box>
              )}
            </Box>

            <Divider sx={{ borderBottomWidth: 2 }} />

            <FormGroup sx={{ width: '50%', pt: 4 }}>
              <FormLabel>Add Optional Message Properties</FormLabel>
              <FormControlLabel
                control={<Switch color="secondary" checked={showOptional} onChange={handleOptionalChange} />}
                label="Show Fields"
                name="show"
              />
            </FormGroup>

            {showOptional && (
              <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pb={4} gap={4} pt={2}>
                <TextField
                  sx={{ width: '50%', pb: 2 }}
                  hidden={showOptional}
                  id="from-email"
                  name="fromEmail"
                  label="Enter Your From Direct Address"
                  helperText="Direct messages will be accepted for validation only when the Direct (From) address is registered here."
                />
                <TextField
                  sx={{ width: '50%', pb: 2 }}
                  id="to-address"
                  name="toAddress"
                  label="Enter Your To Direct Address"
                  helperText="Direct messages will be accepted for validation only when the Direct (From) address is registered here."
                />
              </Box>
            )}

            <Button variant="contained" color="primary" size="large" type="submit">
              SEND MESSAGE
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default SendForm
