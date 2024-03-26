import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import DragandDropFile from '@components/shared/DragandDropFile'
import HelpIcon from '@mui/icons-material/Help'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'

const documentDropdown = [
  {
    value: 'CCDA_Ambulatory.xml',
    label: 'CCDA_Ambulatory.xml',
  },
  {
    value: 'CCDA_AMB.ZIP',
    label: 'CCDA_AMB.ZIP',
  },
  {
    value: 'CCDA_Inpatient.xml',
    label: 'CCDA_Inpatient.xml',
  },
  {
    value: 'CCDA_INPATIENT_IN_XDM.ZIP',
    label: 'CCDA_INPATIENT_IN_XDM.ZIP',
  },
  {
    value: 'TOC_XDM_FULL_METADATA.ZIP',
    label: 'TOC_XDM_FULL_METADATA.ZIP',
  },
  {
    value: 'TOC_XDM_LIMITED_METADATA.ZIP',
    label: 'TOC_XDM_LIMITED_METADATA.ZIP',
  },
]

export type certProps = { value: string; label: string }
export type algorithmProps = { label: string; value: string }
export interface DirectFormProps {
  version: string
  certificateDropdown: certProps[]
  algorithmDropdown: algorithmProps[]
}

const DirectForm = ({ version, certificateDropdown, algorithmDropdown }: DirectFormProps) => {
  const [formErrors, setFormErrors] = useState({})
  const [formValues, setFormValues] = useState({})
  const [disableSendButton, setDisableSendButton] = React.useState(true)
  /* TO-DO: Form submission, this would change when we work on functionality */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.currentTarget
    setFormValues({
      ...formValues,
      [name]: value,
    })
    console.log(formValues)
  }

  /* Validation*/
  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    let errors = {}
    const { name, value } = e.target

    if (value === '') {
      errors = { ...errors, [name]: 'Email Address is required' }
    }
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(value)) {
      errors = { ...errors, [name]: 'Please enter a valid email' }
    }
    setFormValues({
      ...formValues,
      [name]: value,
    })
    setFormErrors(errors)
  }

  useEffect(() => {
    if (_.has(formValues, 'fromEmail') && _.has(formValues, 'toEmail') && _.isEmpty(formErrors)) {
      setDisableSendButton(false)
    }
  }, [disableSendButton, formErrors, formValues])

  return (
    <Container>
      <Box pb={8} component="form" width={'100%'} noValidate onSubmit={handleSubmit}>
        <Typography gutterBottom variant="caption" component={'h1'} sx={{ pt: 4, pb: 0, pl: 0 }}>
          Step 1
        </Typography>
        <Typography variant="h3" component={'h1'} sx={{ pl: 0, pt: 0, pb: 4 }}>
          Enter the fields below to send your direct message
        </Typography>

        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pb={4} gap={4}>
          <TextField
            fullWidth
            id="from-email"
            name="fromEmail"
            label="From Email Address"
            error={_.has(formErrors, 'fromEmail')}
            helperText={
              _.has(formErrors, 'fromEmail')
                ? _.get(formErrors, 'fromEmail', null)
                : 'The Direct From Address from where the message will be sent'
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <strong>@ett.healthit.gov</strong>
                </InputAdornment>
              ),
              type: 'email',
            }}
            required
            onChange={handleValidation}
          />
          <TextField
            fullWidth
            id="to-email"
            name="toEmail"
            label="To Email Address"
            error={_.has(formErrors, 'toEmail')}
            helperText={
              _.has(formErrors, 'toEmail')
                ? _.get(formErrors, 'toEmail', null)
                : 'The Direct To Address where the message will be sent. Must be an email'
            }
            required
            InputProps={{ type: 'email' }}
            onChange={handleValidation}
          />
        </Box>
        <Box
          display={'flex'}
          alignItems={'baseline'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          pb={4}
          gap={4}
        >
          <TextField
            sx={{ width: '50%' }}
            id="select-document"
            name="document"
            select
            label="Choose document to be sent as the message content"
            helperText="The CDA sample which will be attached to the message"
            defaultValue=""
          >
            {documentDropdown.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormGroup sx={{ width: '50%' }}>
            {version === 'v12' && (
              <FormControlLabel
                control={<Switch color="secondary" defaultChecked />}
                label="Message Format: Wrapped"
                name="wrapped"
              />
            )}
            {version === 'v13' && (
              <FormControlLabel
                control={<Switch color="secondary" disabled defaultChecked />}
                label="Message Format: Wrapped"
                name="wrapped"
              />
            )}
          </FormGroup>
        </Box>
        <TextField
          sx={{ pb: 4 }}
          fullWidth
          id="subject"
          name="subject"
          label="Subject"
          helperText="Message Subject or Test Session Name. This field is optional."
        />
        <TextField
          id="outlined-multiline-static"
          label="Message"
          name="message"
          multiline
          rows={4}
          helperText="Text attachment of the Direct message"
          sx={{ width: '100%', pb: 4 }}
        />
        <Box width={'48%'} pb={4}>
          <Stack direction="row" alignItems="flex-start" gap={1}>
            <Typography gutterBottom variant="body1">
              Upload your own C-CDA file
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

        <Divider sx={{ borderBottomWidth: 2 }} />
        <Typography gutterBottom variant="caption" component={'h1'} sx={{ pt: 4, pb: 0, pl: 0 }}>
          Step 2
        </Typography>
        <Typography variant="h3" component={'h1'} sx={{ pl: 0, pt: 0, pb: 4 }}>
          Signing
        </Typography>

        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pb={2} gap={4}>
          <TextField
            sx={{ width: '50%', pb: 2 }}
            id="select-certificate"
            select
            name="signingCertificate"
            label="Signing certificate"
            helperText="The private certificate which will be used to sign the message"
            defaultValue=""
          >
            {certificateDropdown.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} alignContent={'flex-start'} width={'50%'}>
            <Typography variant="body2">
              <strong>or select message with invalid digest (message which had been altered)</strong>
            </Typography>
            <FormGroup>
              <FormControlLabel
                value=""
                control={<Switch color="secondary" />}
                label="Invalid Digest"
                name="invalidDigest"
              />
            </FormGroup>
          </Box>
        </Box>
        <TextField
          sx={{ pb: 2 }}
          fullWidth
          id="select-algorithm"
          name="signingAlgorithm"
          select
          label="Signing Algorithm"
          helperText="This is the algorithm used to sign the message"
          defaultValue=""
        >
          {algorithmDropdown.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box width={'48%'} pb={4}>
          <Stack direction="row" alignItems="flex-start" gap={1}>
            <Typography gutterBottom variant="body1">
              Encryption Certificate
            </Typography>
            <Tooltip
              title="Encryption certificate (optional) if not provided by DNS or LDAP lookup"
              arrow
              placement="right"
            >
              <HelpIcon color="primary" fontSize="small" />
            </Tooltip>
          </Stack>

          <DragandDropFile />
        </Box>
        <Button variant="contained" color="primary" size="large" disabled={disableSendButton} type="submit">
          SEND
        </Button>
      </Box>
    </Container>
  )
}

export default DirectForm
