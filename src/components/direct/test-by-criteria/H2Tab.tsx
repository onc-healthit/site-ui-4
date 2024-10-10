import {
  Box,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import Profile from '../shared/Profile'
import SMTPTestCard from '../shared/SMTPTestCard'
import palette from '@/styles/palette'
import * as React from 'react'
import { useEffect } from 'react'
import criteria from '@/assets/Criteria'
import _ from 'lodash'
import DownloadXDRCert from '../shared/DownloadXDRCert'

const H2Component = () => {
  const h2CriteriaList = criteria.filter((c) => c.testList === "['h2']")
  const [firstDropdownSelectedOption, setFirstDropdownSelectedOption] = React.useState('All')
  const [criteriaOptions, setCriteriaOptions] = React.useState(h2CriteriaList)
  const [selectedCriteria, setSelectedCriteria] = React.useState('')
  const [showTestCard, setShowTestCard] = React.useState(false)
  const [isXDR, setIsXDR] = React.useState(false)

  const h2FirstDropdown = [
    { name: 'All', testList: ['h2', 'sc2'], selectOption: 'ALL' },
    { name: 'Setup', testList: ['h2', 'sc2'], selectOption: 'A' },
    { name: 'Send', testList: ['h2', 'sc2'], selectOption: 'B' },
    { name: 'Send - Delivery Notification for Direct', testList: ['h2', 'sc2'], selectOption: '9' },
    { name: 'Send using Direct+XDM', testList: ['h2', 'sc2'], selectOption: '2' },
    { name: 'Send conversion XDR', testList: ['h2', 'sc2'], selectOption: '3' },
    { name: 'Send using Edge Protocol', testList: ['h2', 'sc2'], selectOption: '4' },
    { name: 'Receive', testList: ['h2', 'sc2'], selectOption: '5' },
    { name: 'Receive - Delivery Notification in Direct', testList: ['h2', 'sc2'], selectOption: '10' },
    { name: 'Receive using Direct+XDM', testList: ['h2', 'sc2'], selectOption: '6' },
    { name: 'Receive conversion XDR', testList: ['h2', 'sc2'], selectOption: '7' },
    { name: 'Receive using Edge Protocol', testList: ['h2', 'sc2'], selectOption: '8' },
  ]

  const handleFirstDropdownChange = (event: SelectChangeEvent) => {
    setFirstDropdownSelectedOption(event.target.value as string)
    const selectedOption = h2FirstDropdown.filter((o) => _.isEqual(o.name, event.target.value))
    const criteriaList = h2CriteriaList.filter((c) => c.selectOption?.includes(selectedOption[0].selectOption))
    setCriteriaOptions(criteriaList)
    setSelectedCriteria('')
    if (event.target.value === 'Send conversion XDR' || event.target.value === 'Receive conversion XDR') {
      setIsXDR(true)
    } else {
      setIsXDR(false)
    }
  }

  const handleCriteriaChange = (event: SelectChangeEvent) => {
    setSelectedCriteria(event.target.value as string)
  }
  return (
    <Container>
      <Box sx={{ display: 'flex', width: '100%', pt: 4, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: '40%' }}>
          <Card>
            <CardContent>
              <Box component="form" sx={{ backgroundColor: palette.white }}>
                <Typography variant="body2" gutterBottom>
                  Use the menu to select what sub criteria you want to test for.
                </Typography>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="h2-select-a-label">Choose a sub category</InputLabel>
                    <Select
                      labelId="h2-select-a-label"
                      id="h2-a-select"
                      value={firstDropdownSelectedOption}
                      label="Choose a sub category"
                      onChange={handleFirstDropdownChange}
                    >
                      {h2FirstDropdown.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box component="form" sx={{ backgroundColor: palette.white }}>
                <Typography variant="body2" gutterBottom>
                  Use the menu to select what sub criteria you want to test for.
                </Typography>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="h2-select-b-label">Choose a sub category</InputLabel>
                    <Select
                      labelId="h2-select-b-label"
                      id="h2-b-select"
                      value={selectedCriteria}
                      label="Choose a sub category"
                      onChange={handleCriteriaChange}
                    >
                      {criteriaOptions.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </Card>
          {isXDR && <DownloadXDRCert />}
          {!isXDR && (
            <Card>
              <Profile />
            </Card>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {showTestCard && (
            <SMTPTestCard
              cardHeader={'SMTP Test 8,14 (Send)'}
              cardContent={
                'Verifies the ability of the sending system to send an email to ETT using the SMTP protocol with STARTTLS. The SUT will send an email to edge-receiver@james.healthit.gov. Hitting "Run" will cause ETT to search for an email sent to edge-receiver@james.healthit.gov from the email address entered in Profile window. Note that the C-CDA Document Type selected will not affect the test result.'
              }
            />
          )}
        </Box>
      </Box>
    </Container>
  )
}
export default H2Component
