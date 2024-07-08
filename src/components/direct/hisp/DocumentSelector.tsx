import React, { ChangeEvent, useState, useEffect } from 'react'
import axios from 'axios'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import { SelectChangeEvent } from '@mui/material/Select'

const DocumentSelector = () => {
  const [open, setOpen] = useState(true)
  const [documents, setDocuments] = useState<Documents>({})
  const [selectedType, setSelectedType] = useState('cures')
  const [selectedObjective, setSelectedObjective] = useState('')

  const [selectedDirectory, setSelectedDirectory] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  useEffect(() => {
    axios
      .get('https://ett.healthit.gov/ett/api/ccdadocuments?testCaseType=')
      .then((response) => {
        console.log('API Response:', response.data)
        setDocuments(response.data)
      })
      .catch((error) => console.error('Error fetching documents:', error))
  }, [])

  interface FileDetail {
    svap: boolean
    cures: boolean
    name: string
    link: string
    uscdiv3: boolean
  }

  interface Directory {
    name: string
    dirs: Directory[] // Recursive type for nested directories
    files: FileDetail[]
  }

  interface Documents {
    [key: string]: {
      dirs: Directory[]
      files: FileDetail[]
    }
  }

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value)
  }

  const handleObjectiveChange = (event: SelectChangeEvent<string>) => {
    setSelectedObjective(event.target.value)
    setSelectedFile('') // Reset selected file on objective change
  }

  const handleDirectoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedDirectory(event.target.value)
    setSelectedFile('') // Reset file selection when directory changes
  }

  const handleFileChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectedFile(event.target.value)
  }

  const handleConfirm = () => {
    console.log('Confirmed with:', selectedFile)
    // placeholder for sending API call
  }

  const handleClose = () => {
    setOpen(false)
  }

  interface DocumentFiles {
    dirs: Array<{ name: string; dirs: Directory[]; files: FileDetail[] }>
    files: Array<{ svap: boolean; cures: boolean; name: string; link: string; uscdiv3: boolean }>
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select A C-CDA Document Type</DialogTitle>
      <DialogContent>
        <RadioGroup row value={selectedType} onChange={handleTypeChange}>
          <FormControlLabel value="cures" control={<Radio />} label="Cures" />
          <FormControlLabel value="svap" control={<Radio />} label="SVAP" />
        </RadioGroup>
        <Select
          fullWidth
          value={selectedDirectory}
          onChange={handleDirectoryChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select directory' }}
        >
          {Object.entries(documents).flatMap(([key, value]) =>
            value.dirs.map((dir) => (
              <MenuItem key={dir.name} value={dir.name}>
                {dir.name}
              </MenuItem>
            ))
          )}
        </Select>
        <TextField fullWidth select label="Reference Filename" value={selectedFile} onChange={handleFileChange}>
          {selectedDirectory &&
            documents[selectedDirectory]?.files.map((file) => (
              <MenuItem key={file.name} value={file.link}>
                {file.name}
              </MenuItem>
            ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DocumentSelector
