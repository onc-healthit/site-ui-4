import {
  Box,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import DragandDropFile from '@components/shared/DragandDropFile'
import HelpIcon from '@mui/icons-material/Help'
import React, { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import SwitchWithLabel from '@components/shared/SwitchWithLabel'
import { handleSendMessage } from '../actions'
import SendResults from './SendResult'

const messageType = [
  { value: 'Minimal', label: 'Minimal' },
  { value: 'Full', label: 'Full' },
]

export interface SendFormProps {
  version: string
  sampleCCDAFiles: string[]
}

const SendForm = ({ version, sampleCCDAFiles }: SendFormProps) => {
  //const [formValues, setFormValues] = useState({})
  const [showOptional, setShowOptional] = React.useState(false)
  const [ccdaFiles, setCcdaFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState(' ')
  const [data, handleSubmit] = useFormState(handleSendMessage, { response: {} })

  useEffect(() => {
    setCcdaFiles(sampleCCDAFiles)
  }, [sampleCCDAFiles])
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.value)
  }

  const handleOptionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOptional(e.target.checked)
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <form action={handleSubmit}>
            <Box pb={4} width={'100%'}>
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
                    name="attachmentFilePath"
                    select
                    label="Select a Template Sample C-CDA File to Send:"
                    helperText=""
                    defaultValue=" "
                    value={selectedFile}
                    onChange={handleFileSelect}
                  >
                    <MenuItem key=" " value=" " />
                    {ccdaFiles.map((option: string) => (
                      <MenuItem key={option} value={option}>
                        {option.substring(option.lastIndexOf('/') + 1)}
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
                    <DragandDropFile name="attachment" />
                  </Box>
                )}
              </Box>

              <Divider sx={{ borderBottomWidth: 2 }} />
              <Box pt={2} pl={1} pb={2}>
                <SwitchWithLabel
                  isChecked={showOptional}
                  handleToggleSwitch={handleOptionalChange}
                  labelText="Show Fields"
                  labelOnRight
                />
              </Box>

              {showOptional && (
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pb={4} gap={4} pt={0}>
                  <TextField
                    sx={{ width: '50%', pb: 2 }}
                    hidden={showOptional}
                    id="directFromAddress"
                    name="directFromAddress"
                    label="Enter Your From Direct Address"
                    helperText="Direct messages will be accepted for validation only when the Direct (From) address is registered here."
                  />
                  <TextField
                    sx={{ width: '50%', pb: 2 }}
                    id="directToAddress"
                    name="directToAddress"
                    label="Enter Your To Direct Address"
                    helperText="Direct messages will be accepted for validation only when the Direct (From) address is registered here."
                  />
                </Box>
              )}
              <SendResults response={data?.response} buttonTitle={'SEND MESSAGE'} />
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default SendForm
