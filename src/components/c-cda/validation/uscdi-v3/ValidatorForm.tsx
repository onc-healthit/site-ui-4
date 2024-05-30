'use client'
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
import { useEffect, useState } from 'react'
import ValidationComponent from '../ValidatorLoadingCard'
import _ from 'lodash'
import { getScenarioOptions, submitForm } from './actions'
import palette from '@/styles/palette'
import Link from 'next/link'
import { useFormState } from 'react-dom'

interface V3ValidatorFormProps {
  senderCriteriaOptions: []
  receiverCriteriaOptions: []
  downloadAllScenariosUrl: string
}

type Criteria = {
  name: string
  url: string
}

type Scenario = {
  name: string
  url: string
  download_url: string
}

export default function V3ValidatorForm({
  senderCriteriaOptions,
  receiverCriteriaOptions,
  downloadAllScenariosUrl,
}: V3ValidatorFormProps) {
  const [system, setSystem] = useState('')
  const [criteriaOption, setCriteriaOption] = useState('')
  const [scenarioOption, setScenarioOption] = useState('')
  const [criteriaOptions, setCriteriaOptions] = useState<Criteria[]>([])
  const [scenarioOptions, setScenarioOptions] = useState<Scenario[]>([])
  const [downloadScenario, setDownloadScenario] = useState('')
  const [disableDownloadSceario, setDisableDownloadScenario] = useState(true)
  const [disableValidate, setDisableValidate] = useState(true)
  const [data, submitAction] = useFormState(submitForm, { response: {} })
  const [estimatedValidationTime, setEstimatedValidationTime] = useState(5)
  useEffect(() => {
    if (_.isEqual(system, 'Sender')) {
      setCriteriaOptions(senderCriteriaOptions)
    }
    if (_.isEqual(system, 'Receiver')) {
      setCriteriaOptions(receiverCriteriaOptions)
    }
    if (!_.isEmpty(system) && !_.isEmpty(criteriaOption) && !_.isEmpty(scenarioOption)) {
      setDisableValidate(false)
    }
    if (criteriaOption.includes('IG_Only')) {
      setEstimatedValidationTime(5)
    } else if (criteriaOption.includes('IG_Plus_Vocab')) {
      setEstimatedValidationTime(15)
    } else {
      setEstimatedValidationTime(60)
    }
  }, [criteriaOption, receiverCriteriaOptions, scenarioOption, senderCriteriaOptions, system])

  const handleCriteriaChange = (e: SelectChangeEvent) => {
    setCriteriaOption(e.target.value)
    const selectedCriteria = criteriaOptions.filter((c) => _.isEqual(c.name, e.target.value))
    getScenarioOptions(selectedCriteria[0].url).then((data) => {
      setScenarioOptions(data)
    })
  }

  const handleScenarioChange = (e: SelectChangeEvent) => {
    setScenarioOption(e.target.value)
    const selectedScenario = scenarioOptions.filter((c) => _.isEqual(c.name, e.target.value))
    setDownloadScenario(selectedScenario[0]?.download_url)
    setDisableDownloadScenario(false)
  }

  const handleSystemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystem(e.target.value)
    setCriteriaOption('')
    setScenarioOption('')
    setDisableValidate(true)
  }

  return (
    <Container>
      {/* Header */}
      <form action={submitAction}>
        <Box pb={8} width="100%">
          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', pt: 4 }}>
            To validate your C-CDA document for USCDI V3:
          </Typography>

          {/* Sender or Receiver Selection */}
          <Box sx={{ pt: 3 }}>
            <FormControl fullWidth required>
              <FormLabel id="select-system-group-label">Select your system of C-CDA documents</FormLabel>
              <RadioGroup
                onChange={handleSystemChange}
                row
                aria-labelledby="select-system-group-label"
                name="system"
                value={system}
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
                name="validationObjective"
              >
                {criteriaOptions.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
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
                name="referenceFileName"
                onChange={handleScenarioChange}
              >
                {scenarioOptions.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
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
              <DragDropFileUpload maxFiles={1} name="ccdaFile" />
              {/** <input type="file" name="ccdaFile" />*/}
            </FormControl>
          </Box>

          {/* Buttons */}
          <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ pt: 4 }}>
            <ValidationComponent
              response={data?.response}
              estimatedValidationTime={estimatedValidationTime}
              disabled={disableValidate}
            ></ValidationComponent>
            {/* <Button variant="contained" type="submit" disabled={pending}>
              VALIDATE
            </Button> */}
            <Box>
              <Link href={downloadScenario} passHref style={{ textDecoration: 'none' }} target="_blank">
                <Button variant="outlined" sx={{ color: palette.primary }} disabled={disableDownloadSceario}>
                  DOWNLOAD SELECTED SCENARIO FILE
                </Button>
              </Link>
              <Link href={downloadAllScenariosUrl} passHref style={{ textDecoration: 'none' }}>
                <Button variant="outlined" sx={{ color: palette.primary, ml: 2 }}>
                  DOWNLOAD ALL SCENARIO FILES
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
  )
}
