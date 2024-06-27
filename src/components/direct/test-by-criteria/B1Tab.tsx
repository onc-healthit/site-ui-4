import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import Profile from '../shared/Profile'
import SMTPTestCard from '../shared/SMTPTestCard'
import palette from '@/styles/palette'
import * as React from 'react'
import { useEffect } from 'react'
import _ from 'lodash'
import criteria from '@/assets/Criteria'

const B1Component = () => {
  const [option, setOption] = React.useState('')
  const [showTestCard, setShowTestCard] = React.useState(false)
  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string)
  }
  const b1CriteriaList = criteria.filter((c) => c.testList === "['b1']")
  /*   useEffect(() => {
    if (option !== '') {
      setShowTestCard(true)
    }
  }, [option]) */

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
                    <InputLabel id="b1-select-label">Choose a sub category</InputLabel>
                    <Select
                      labelId="b1-select-label"
                      id="b1-select"
                      value={option}
                      label="Choose a sub category"
                      onChange={handleChange}
                    >
                      {b1CriteriaList.map((option) => (
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
            <Profile />
          </Card>
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
export default B1Component
