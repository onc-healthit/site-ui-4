import DragDropFileUpload from '@/components/shared/DragandDropFile'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import ValidationComponent from '../ValidatorLoadingCard'

// TODO: Create a generic version of this to Support unique functionality
// (API calls, select data, etc.) of different C-CDA validators without duplication
export default function V3FullTab() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [systemOption, setSystemOption] = useState('')

  const handleSystemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleSystemChange(e), event: ', e)
    const systemSelected = e.target.value
    console.log(`Selected ${systemSelected}`)
    setSystemOption(e.target.value)
  }

  const [criteriaOption, setCriteriaOption] = useState('')

  const handleCriteriaChange = (e: SelectChangeEvent) => {
    console.log('handleCriteriaChange(e), event: ', e)
    const criteriaSelected = e.target.value
    console.log(`Selected ${criteriaSelected}`)
    setCriteriaOption(e.target.value)
  }

  const criteriaOptions = [
    {
      value: '170.315_b1_ToC_Amb',
      label: '170.315_b1_ToC_Amb',
    },
    {
      value: 'etc. ...',
      label: 'etc. ...',
    },
  ]

  const [scenarioOption, setScenarioOption] = useState('')

  const handleScenarioChange = (e: SelectChangeEvent) => {
    console.log('handleScenarioChange(e), event: ', e)
    const scenarioSelected = e.target.value
    console.log(`Selected ${scenarioSelected}`)
    setScenarioOption(e.target.value)
  }

  const scenarioOptions = [
    {
      value: 'pdf1',
      label: 'pdf1',
    },
    {
      value: 'pdf2',
      label: 'pdf2',
    },
    {
      value: 'etc. ... this is fetched data',
      label: 'etc. ... this is fetched data',
    },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmit(e), event: ', e)
  }

  return (
    <Container>
      {/* Header */}
      <Box pb={8} component="form" width="100%" noValidate onSubmit={handleSubmit}>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', pt: 4 }}>
          To validate your C-CDA document for USCDI V3:
        </Typography>

        {/* Sender or Receiver Selection */}
        <Box sx={{ pt: 3 }}>
          <FormControl fullWidth>
            <FormLabel id="select-system-group-label">Select your system of C-CDA documents</FormLabel>
            <RadioGroup
              onChange={handleSystemChange}
              row
              aria-labelledby="select-system-group-label"
              name="select-system-radio-group"
            >
              <FormControlLabel value="Sender" control={<Radio />} label="Sender" />
              <Typography sx={{ pt: 1.2, pr: 2.5 }}>or</Typography>
              <FormControlLabel value="Receiver" control={<Radio />} label="Receiver" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Criteria Selection */}
        <Box sx={{ pt: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="uscdi-v3-full-criteria-input-label">Select validation criteria</InputLabel>
            <Select
              id="uscdi-v3-full-criteria-select"
              label="Select validation criteria"
              labelId="uscdi-v3-full-criteria-input-label"
              value={criteriaOption}
              onChange={handleCriteriaChange}
            >
              {criteriaOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Scenario Selection */}
        <Box sx={{ pt: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="uscdi-v3-full-criteria-input-label">Select scenario file</InputLabel>
            <Select
              id="uscdi-v3-full-scenario-select"
              label="Select scenario file"
              labelId="uscdi-v3-full-scenario-input-label"
              value={scenarioOption}
              onChange={handleScenarioChange}
            >
              {scenarioOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ pt: 4 }} />

        {/* Upload */}
        <Box sx={{ pt: 3 }}>
          <FormControl fullWidth>
            <FormLabel sx={{ pb: 1 }}>Upload your generated C-CDA file and submit for validation</FormLabel>
            <DragDropFileUpload />
          </FormControl>
        </Box>

        {/* Buttons */}
        <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ pt: 4 }}>
          <ValidationComponent></ValidationComponent>
          <Box>
            <Button variant="outlined">DOWNLOAD SELECTED SCENARIO FILE</Button>
            <Button sx={{ ml: 2 }} variant="outlined">
              DOWNLOAD ALL SCENARIO FILES
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
