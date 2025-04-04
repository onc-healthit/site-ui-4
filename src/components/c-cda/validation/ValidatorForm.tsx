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
import ValidationComponent from './results/ValidationResultsComponent'
import _ from 'lodash'
import { getScenarioOptions } from './actions'
import palette from '@/styles/palette'
import Link from 'next/link'
import { useFormState } from 'react-dom'

interface ValidatorFormProps {
  senderCriteriaOptions: []
  receiverCriteriaOptions: []
  // Note: GitHub doesn't have obvious native support for a specific path within a repo to download.
  // So, for now, with the mono repo update, We get everything, making this prop end up essentially static.
  // TODO: Analyze if there is a workaround, or if GitHub does actually support a specific path?
  downloadAllScenariosUrl: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formAction: (prevState: object | undefined, formData: FormData) => Promise<{ response: any } | undefined>
  version: string
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

export default function ValidatorForm({
  senderCriteriaOptions,
  receiverCriteriaOptions,
  downloadAllScenariosUrl,
  formAction,
  version,
}: ValidatorFormProps) {
  const [system, setSystem] = useState('')
  const [criteriaOption, setCriteriaOption] = useState('')
  const [scenarioOption, setScenarioOption] = useState('')
  const [criteriaOptions, setCriteriaOptions] = useState<Criteria[]>([])
  const [scenarioOptions, setScenarioOptions] = useState<Scenario[]>([])
  const [downloadScenario, setDownloadScenario] = useState('')
  const [disableDownloadSceario, setDisableDownloadScenario] = useState(true)
  const [disableValidate, setDisableValidate] = useState(true)
  const [data, submitAction] = useFormState(formAction, { response: {} })
  const [estimatedValidationTime, setEstimatedValidationTime] = useState(5)
  const [fileName, setFileName] = useState('')
  const [hideScenario, setHideScenario] = useState(false)
  useEffect(() => {
    if (_.isEqual(system, 'Sender')) {
      setCriteriaOptions(senderCriteriaOptions)
    }
    if (_.isEqual(system, 'Receiver')) {
      setCriteriaOptions(receiverCriteriaOptions)
    }

    if (_.isEqual(criteriaOption, 'C-CDA_IG_Only') || _.isEqual(criteriaOption, 'C-CDA_IG_Plus_Vocab')) {
      setHideScenario(true)
    }

    if (!_.isEmpty(system) && !_.isEmpty(criteriaOption) && (!_.isEmpty(scenarioOption) || hideScenario)) {
      setDisableValidate(false)
    }
    if (criteriaOption.includes('IG_Only')) {
      setEstimatedValidationTime(5)
    } else if (criteriaOption.includes('IG_Plus_Vocab')) {
      setEstimatedValidationTime(15)
    } else {
      setEstimatedValidationTime(60)
    }
  }, [criteriaOption, hideScenario, receiverCriteriaOptions, scenarioOption, senderCriteriaOptions, system])

  const handleCriteriaChange = (e: SelectChangeEvent) => {
    setCriteriaOption(e.target.value)
    const selectedCriteria = criteriaOptions.filter((c) => _.isEqual(c.name, e.target.value))
    getScenarioOptions(selectedCriteria[0].url).then((data) => {
      setScenarioOptions(data)
    })
    if (!(_.isEqual(e.target.value, 'C-CDA_IG_Only') || _.isEqual(e.target.value, 'C-CDA_IG_Plus_Vocab'))) {
      setHideScenario(false)
    }
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
    setHideScenario(false)
    setDisableValidate(true)
  }
  const getFileName = (data: File[]) => {
    //console.log(data[0]?.name)
    if (data !== undefined) {
      setFileName(data[0]?.name)
    }
  }

  return (
    <Container>
      {/* Header */}
      <form action={submitAction}>
        <Box pb={8} width="100%">
          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', pt: 4 }}>
            To validate your C-CDA document for USCDI {version}:
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
              <InputLabel id="full-criteria-input-label">Select validation criteria</InputLabel>
              <Select
                id="full-criteria-select"
                label="Select validation criteria"
                labelId="full-criteria-input-label"
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
          {!hideScenario && (
            <Box sx={{ pt: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="full-criteria-input-label">Select scenario file</InputLabel>
                <Select
                  id="full-scenario-select"
                  label="Select scenario file"
                  labelId="full-scenario-input-label"
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
          )}

          <Divider sx={{ pt: 4 }} />

          {/* Upload */}
          <Box sx={{ pt: 3 }}>
            <FormControl fullWidth>
              <FormLabel sx={{ pb: 1 }}>Upload your generated C-CDA file and submit for validation</FormLabel>
              <DragDropFileUpload maxFiles={1} name="ccdaFile" fileName={getFileName} allowedSize={1048576} />
            </FormControl>
          </Box>

          {/* Buttons */}
          <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ pt: 4 }}>
            {/* ValidationComponent returns the validate button, a loading dialog, and the validation results */}
            <ValidationComponent
              response={data?.response}
              estimatedValidationTime={estimatedValidationTime}
              disabled={disableValidate}
              fileName={fileName}
              criteria={criteriaOption}
            ></ValidationComponent>
            <Box>
              <Link href={downloadScenario} passHref style={{ textDecoration: 'none' }} target="_blank">
                <Button
                  id="download-selected-scenario-file"
                  variant="outlined"
                  sx={{ color: palette.primary }}
                  disabled={disableDownloadSceario}
                >
                  DOWNLOAD SELECTED SCENARIO FILE
                </Button>
              </Link>
              <Link href={downloadAllScenariosUrl} passHref style={{ textDecoration: 'none' }}>
                <Button id="download-all-scenario-files" variant="outlined" sx={{ color: palette.primary, ml: 2 }}>
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
