'use client'
import palette from '@/styles/palette'
import { Box, Container, Tabs, Tab } from '@mui/material'
import * as React from 'react'
export type TabsProps = {
  value: number
  tabs: Array<string>
}

const TabsComponent = (props: TabsProps) => {
  const [value, setValue] = React.useState(props.value)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', backgroundColor: palette.primary }}>
      <Container disableGutters maxWidth="xl">
        <Tabs
          variant="fullWidth"
          scrollButtons="auto"
          value={value}
          onChange={handleTabChange}
          indicatorColor="secondary"
        >
          {props.tabs.map((tab, index) => (
            <Tab label={tab} key={index} />
          ))}
        </Tabs>
      </Container>
    </Box>
  )
}
export default TabsComponent
