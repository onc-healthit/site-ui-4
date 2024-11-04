import React, { ChangeEvent, useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Box, Typography, Button } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import { SelectChangeEvent } from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import { fetchCCDADocuments } from '../test-by-criteria/ServerActions'
import InputLabel from '@mui/material/InputLabel'
import axios from 'axios'
import XDR from './XDRTab'

interface DocumentSelectorProps {
  onConfirm: (selectedData: { directory: string; fileName: string; fileLink: string }) => void
  onClose: () => void
  receive: boolean
}

export interface FileDetail {
  svap: boolean
  cures: boolean
  name: string
  link: string
  uscdiv3: boolean
}

export interface Directory {
  name: string
  dirs: Directory[]
  files: FileDetail[]
}

const DocumentSelector = ({ onConfirm, onClose, receive: receive }: DocumentSelectorProps) => {
  const [open, setOpen] = useState(true)
  const [documents, setDocuments] = useState<Documents>({})
  const [selectedType, setSelectedType] = useState('cures')
  const [selectedDirectory, setSelectedDirectory] = useState('')
  const [selectedFile, setSelectedFile] = useState<string>('')

  useEffect(() => {
    if (selectedType) {
      fetchCCDADocuments(receive).then(setDocuments).catch(console.error)
    }
  }, [selectedType, receive])

  interface FileDetail {
    svap: boolean
    cures: boolean
    name: string
    link: string
    uscdiv3: boolean
  }

  interface Directory {
    name: string
    dirs: Directory[]
    files: FileDetail[]
  }

  interface Documents {
    [key: string]: {
      dirs: Directory[]
      files: FileDetail[]
    }
  }

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value as string)
    setSelectedDirectory('')
    setSelectedFile('')
  }

  const handleDirectoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedDirectory(event.target.value as string)
    setSelectedFile('')
  }

  const handleFileChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedFile(event.target.value as string)
  }

  const handleConfirm = () => {
    const file = files.find((file) => file.link === selectedFile)
    if (file) {
      onConfirm({
        directory: selectedDirectory,
        fileName: file.name,
        fileLink: file.link,
      })
    }
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const documentType = receive
    ? selectedType === 'cures'
      ? 'Receiver SUT Test Data'
      : 'Cures Update Svap Uscdiv3 Receiver SUT Test Data'
    : selectedType === 'cures'
      ? 'Cures Update Sender SUT Test Data'
      : 'Cures Update Svap Uscdiv3 Sender SUT Test Data'
  const directories = documents[documentType]?.dirs || []
  const files = directories.find((dir) => dir.name === selectedDirectory)?.files || []

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '1.5rem' }}>Select A C-CDA Document Type</DialogTitle>
      <Divider sx={{ my: 0 }} />
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          First select a message format. It can be one or both formats.
        </Typography>
        <RadioGroup row value={selectedType} onChange={handleTypeChange}>
          <FormControlLabel value="cures" control={<Radio />} label="Cures" />
          <FormControlLabel value="svap" control={<Radio />} label="SVAP" />
        </RadioGroup>
        <Typography variant="body1" sx={{ mb: 2, mt: 1 }} gutterBottom>
          Then select a document. You can search within the field below to find your file.
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={2}>
          <>
            <Select
              fullWidth
              id="validation-group"
              value={selectedDirectory}
              onChange={handleDirectoryChange}
              required
              displayEmpty
              inputProps={{ 'aria-label': 'Select directory' }}
            >
              <MenuItem disabled value="">
                <em>Select validation objective</em>
              </MenuItem>
              {directories.map((dir) => (
                <MenuItem key={dir.name} value={dir.name}>
                  {dir.name}
                </MenuItem>
              ))}
            </Select>
          </>
          <>
            <TextField fullWidth select label="Reference Filename" value={selectedFile} onChange={handleFileChange}>
              <MenuItem disabled value="">
                <em>Need to select a validation objective</em>
              </MenuItem>
              {files.map((file) => (
                <MenuItem key={file.name} value={file.link}>
                  {file.name}
                </MenuItem>
              ))}
            </TextField>
          </>
        </Box>
      </DialogContent>
      <Divider sx={{ my: 0 }} />
      <DialogActions sx={{ p: '16px 24px' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DocumentSelector
