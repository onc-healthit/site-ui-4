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
import DragandDropFile from './DragandDropFile'
import HelpIcon from '@mui/icons-material/Help'
import React from 'react'
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

const certificateDropdown = [
  { value: 'GOOD_CERT', label: 'GOOD_CERT' },
  { value: 'INVALID_CERT', label: 'INVALID_CERT' },
  { value: 'EXPIRED_CERT', label: 'EXPIRED_CERT' },
  { value: 'DIFFERENT_TRUST_ANCHOR', label: 'DIFFERENT_TRUST_ANCHOR' },
  { value: 'BAD_AIA', label: 'BAD_AIA' },
  { value: 'WILD_CARD_DOMAIN_CERT', label: 'WILD_CARD_DOMAIN_CERT' },
  { value: 'CERT_WITH_EMAIL_ADDRESS', label: 'CERT_WITH_EMAIL_ADDRESS' },
  { value: 'CERT_LESS_THAN_2048_BITS', label: 'CERT_LESS_THAN_2048_BITS' },
  { value: 'CERT_WITH_NO_CRL', label: 'CERT_WITH_NO_CRL' },
  { value: 'CERT_WITH_NO_NOTBEFORE_ATTR', label: 'CERT_WITH_NO_NOTBEFORE_ATTR' },
  { value: 'CERT_WITH_NO_NOTAFTER_ATT', label: 'CERT_WITH_NO_NOTAFTER_ATT' },
  { value: 'CERT_WITH_3072_BITS', label: 'CERT_WITH_3072_BITS' },
  { value: 'CERT_WITH_4096_BITS', label: 'CERT_WITH_4096_BITS' },
]
const algorithmDropdown = [
  { value: 'SHA-256', label: 'SHA-256' },
  { value: 'SHA-384', label: 'SHA-384' },
  { value: 'SHA-512', label: 'SHA-512' },
  {
    value: 'Optimal Asymmetric Encryption Padding (OAEP) for RSA encryption and decryption',
    label: 'Optimal Asymmetric Encryption Padding (OAEP) for RSA encryption and decryption',
  },
  { value: 'ECDSA with P-256', label: 'ECDSA with P-256' },
  { value: 'ECDSA with SHA-256', label: 'ECDSA with SHA-256' },
  { value: 'ECDSA with P-384', label: 'ECDSA with P-384' },
  { value: 'ECDSA with SHA-384', label: 'ECDSA with SHA-384' },
  { value: 'AES with CBC', label: 'AES with CBC' },
  { value: 'AES with GCM', label: 'AES with GCM' },
]

const Version13 = () => {
  return (
    <Container>
      <Box pb={8} component="form" width={'100%'}>
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
            label="From Email Address"
            helperText="The Direct From Address from where the message will be sent"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <strong>@ett.healthit.gov</strong>
                </InputAdornment>
              ),
            }}
            required
          />
          <TextField
            fullWidth
            id="to-email"
            label="To Email Address"
            helperText="The Direct To Address where the message will be sent. Must be an email"
            required
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
            <FormControlLabel control={<Switch color="secondary" defaultChecked />} label="Wrapped" />
          </FormGroup>
        </Box>
        <TextField
          sx={{ pb: 4 }}
          fullWidth
          id="subject"
          label="Subject"
          helperText="Message Subject or Test Session Name. This field is optional."
        />
        <TextField
          id="outlined-multiline-static"
          label="Message"
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
              <FormControlLabel control={<Switch color="secondary" />} label="Invalid Digest" />
            </FormGroup>
          </Box>
        </Box>
        <TextField
          sx={{ pb: 2 }}
          fullWidth
          id="select-algorithm"
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
        <Button variant="contained" color="primary" size="large">
          SEND
        </Button>
      </Box>
    </Container>
  )
}

export default Version13
