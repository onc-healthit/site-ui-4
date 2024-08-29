import { Box, TextField, MenuItem } from '@mui/material'

import { useEffect, useState } from 'react'
import { handleSendMessageWithAttachmentFilepath } from './actions'
import { useFormState } from 'react-dom'
import PrecannedContentResults from './ReceiveMessageSITEResults'
interface PrecannedContentTabProps {
  sampleCCDAFiles: string[]
}
const PrecannedContentTab = ({ sampleCCDAFiles }: PrecannedContentTabProps) => {
  const [ccdaFiles, setCcdaFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState(' ')
  const [endpointName, setEndpointName] = useState('')
  const [data, handleSubmit] = useFormState(handleSendMessageWithAttachmentFilepath, { response: {} })
  useEffect(() => {
    setCcdaFiles(sampleCCDAFiles)
  }, [sampleCCDAFiles])
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.value)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEndpointName(value)
  }
  return (
    <form action={handleSubmit}>
      <Box p={2}>
        <TextField
          fullWidth
          id="toAddress"
          name="toAddress"
          label="Enter Your Endpoint Name"
          helperText="Recipient Direct email address"
          sx={{ pb: 4 }}
          value={endpointName}
          onChange={handleChange}
          type="email"
        />

        <TextField
          fullWidth
          id="attachmentFilePath"
          name="attachmentFilePath"
          select
          label="Select a Precanned Sample C-CDA File to Send"
          helperText=""
          sx={{ pb: 4 }}
          value={selectedFile}
          onChange={handleFileSelect}
        >
          <MenuItem value=" ">-- select one --</MenuItem>
          {ccdaFiles.map((option: string) => (
            <MenuItem key={option} value={option}>
              {option.substring(option.lastIndexOf('/') + 1)}
            </MenuItem>
          ))}
        </TextField>
        <PrecannedContentResults response={data?.response} buttonTitle={'SEND MESSAGE'} />
      </Box>
    </form>
  )
}

export default PrecannedContentTab
