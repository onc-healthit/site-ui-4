import { Box, BoxProps, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Profile from './Profile'
import SMTPTestCard from './SMTPTestCard'
import palette from '@/styles/palette'
import * as React from 'react'

const B1Component = () => {
  const [option, setOption] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string)
  }

  function Item(props: BoxProps) {
    const { sx, ...other } = props
    return (
      <Box
        sx={{
          ...sx,
        }}
        {...other}
      />
    )
  }
  const dropdown = [
    {
      value: 'A',
      label: 'A',
    },
    {
      value: 'B',
      label: 'B',
    },
    {
      value: 'C',
      label: 'C',
    },
    {
      value: 'D',
      label: 'D',
    },
  ]
  return (
    <div>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Item sx={{ width: '40%' }}>
          <Item component="form" sx={{ backgroundColor: palette.white, p: 2 }}>
            <Typography variant="body2">Use the menu to select what sub criteria you want to test for.</Typography>

            <div>
              <FormControl fullWidth>
                <InputLabel id="b1-select-label">Choose a sub category</InputLabel>
                <Select
                  labelId="b1-select-label"
                  id="b1-select"
                  value={option}
                  label="Choose a sub category"
                  onChange={handleChange}
                >
                  {dropdown.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Item>
          <Item sx={{ paddingTop: 4 }}>
            <Profile />
          </Item>
        </Item>
        <Item sx={{ flexGrow: 1 }}>
          <SMTPTestCard
            cardHeader={'SMTP Test 8,14 (Send)'}
            cardContent={
              'Verifies the ability of the sending system to send an email to ETT using the SMTP protocol with STARTTLS. The SUT will send an email to edge-receiver@james.healthit.gov. Hitting "Run" will cause ETT to search for an email sent to edge-receiver@james.healthit.gov from the email address entered in Profile window. Note that the C-CDA Document Type selected will not affect the test result.'
            }
          />
        </Item>
      </Box>
    </div>
  )
}
export default B1Component
