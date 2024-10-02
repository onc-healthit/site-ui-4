import {
  Box,
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
import { handleSendDirectMessage } from './actions'
import { useFormState } from 'react-dom'
import SwitchWithLabel from '@/components/shared/SwitchWithLabel'
import SendDirectResults from './SendDirectResults'

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
  domainName: string
}

const DirectForm = ({ version, certificateDropdown, algorithmDropdown, domainName }: DirectFormProps) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({})
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [disableSendButton, setDisableSendButton] = useState(true)
  const [selectedDocument, setSelectedDocument] = useState('')
  const [selectedCertificate, setSelectedCertificate] = useState('')
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('')
  const [isMessageWrapped, setIsMessageWrapped] = useState(true)
  const [isInvalidDigest, setIsInvalidDigest] = useState(false)
  const [data, handleSubmit] = useFormState(handleSendDirectMessage, { response: {} })

  //Validation
  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errors = { ...formErrors }
    const { name, value } = e.target

    if (value === '') {
      errors[name] = 'This field is required'
    } else if (name === 'toAddress') {
      if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) {
        errors[name] = 'Please enter a valid email'
      } else {
        delete errors[name]
      }
    } else {
      delete errors[name]
    }
    setFormValues({
      ...formValues,
      [name]: value,
    })
    setFormErrors(errors)
  }

  useEffect(() => {
    if (_.has(formValues, 'fromAddress') && _.has(formValues, 'toAddress') && _.isEmpty(formErrors)) {
      setDisableSendButton(false)
    }
    if (isInvalidDigest) {
      setSelectedCertificate('')
    }
  }, [formErrors, formValues, isInvalidDigest])
  const handleChangeDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSelectedDocument(value)
  }
  const handleChangeCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSelectedCertificate(value)
    setIsInvalidDigest(false)
  }
  const handleMessageWrappedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMessageWrapped(e.target.checked)
  }
  const handleInvalidDigestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInvalidDigest(e.target.checked)
  }
  return (
    <Container>
      <form action={handleSubmit} noValidate>
        <Box pb={8} width={'100%'}>
          <Typography gutterBottom variant="caption" component={'h1'} sx={{ pt: 4, pb: 0, pl: 0 }}>
            Step 1
          </Typography>
          <Typography variant="h3" component={'h1'} sx={{ pl: 0, pt: 0, pb: 4 }}>
            Enter the fields below to send your direct message
          </Typography>

          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pb={4} gap={4}>
            <TextField
              fullWidth
              id="from-address"
              name="fromAddress"
              label="From Email Address"
              error={_.has(formErrors, 'fromAddress')}
              helperText={
                _.has(formErrors, 'fromAddress')
                  ? _.get(formErrors, 'fromAddress', null)
                  : 'The Direct From Address from where the message will be sent'
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <strong>@{domainName}</strong>
                  </InputAdornment>
                ),
              }}
              required
              onChange={handleValidation}
            />
            <TextField
              fullWidth
              id="to-address"
              name="toAddress"
              label="To Email Address"
              error={_.has(formErrors, 'toAddress')}
              helperText={
                _.has(formErrors, 'toAddress')
                  ? _.get(formErrors, 'toAddress', null)
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
              name="attachmentFile"
              select
              label="Choose document to be sent as the message content"
              helperText="The CDA sample which will be attached to the message"
              value={selectedDocument}
              onChange={handleChangeDocument}
            >
              {documentDropdown.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormGroup sx={{ width: '50%' }}>
              {version === 'v12' && (
                <SwitchWithLabel
                  isChecked={isMessageWrapped}
                  handleToggleSwitch={handleMessageWrappedChange}
                  labelText="Message Format: Wrapped"
                  labelOnRight={true}
                  name="wrapped"
                />
              )}
              {version === 'v13' && (
                <FormControlLabel
                  control={<Switch color="secondary" disabled defaultChecked name="wrapped" size="small" />}
                  label="Message Format: Wrapped"
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
            name="textMessage"
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
            <DragandDropFile maxFiles={1} name="ownCcdaAttachment" />
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
              name="signingCert"
              label="Signing certificate"
              helperText="The private certificate which will be used to sign the message"
              value={selectedCertificate}
              onChange={handleChangeCertificate}
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
                <SwitchWithLabel
                  isChecked={isInvalidDigest}
                  handleToggleSwitch={handleInvalidDigestChange}
                  labelText="Invalid Digest"
                  labelOnRight={true}
                  name="wrapped"
                />
              </FormGroup>
              <input type="hidden" name="version" value={version} />
              <input type="hidden" name="domainName" value={domainName} />
            </Box>
          </Box>
          <TextField
            sx={{ pb: 2 }}
            fullWidth
            id="select-algorithm"
            name="digestAlgo"
            select
            label="Signing Algorithm"
            helperText="This is the algorithm used to sign the message"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
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

            <DragandDropFile maxFiles={1} name="encryptionCert" />
          </Box>
          <SendDirectResults response={data?.response} buttonTitle={'SEND'} disabled={disableSendButton} />
        </Box>
      </form>
    </Container>
  )
}

export default DirectForm
