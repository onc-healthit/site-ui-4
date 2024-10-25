'use client'
import palette from '@/styles/palette'
import { Box, Container, Tabs, Tab, styled } from '@mui/material'
import * as React from 'react'
import { useEffect } from 'react'

export type TabInputs = {
  tabName: string
  tabIndex: number
  tabPanel: React.ReactNode
}

export interface TabsProps {
  selectedTab: string
  tabs: TabInputs[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const SubTabsComponent = ({ selectedTab, tabs }: TabsProps) => {
  const [value, setValue] = React.useState(0)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (selectedTab !== '') {
      const selectedTabIndex = tabs.filter((c) => c.tabName === selectedTab)
      setValue(selectedTabIndex[0].tabIndex)
    }
  }, [selectedTab, tabs])

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props

    return <div>{value === index && <>{children}</>}</div>
  }

  const StyledTab = styled(Tab)(() => ({
    backgroundColor: palette.white,
    color: palette.primary,
    '&.Mui-selected, &:hover': {
      backgroundColor: palette.white,
      color: palette.primary,
    },
  }))

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs
          variant="fullWidth"
          scrollButtons="auto"
          value={value}
          onChange={handleTabChange}
          indicatorColor="secondary"
          TabIndicatorProps={{
            sx: {
              bgcolor: palette.primary,
              height: '8px',
            },
          }}
        >
          {tabs.map((tab) => (
            <StyledTab label={tab.tabName} key={tab.tabIndex} />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab) => (
        <CustomTabPanel value={value} key={tab.tabIndex} index={tab.tabIndex}>
          {tab.tabPanel}
        </CustomTabPanel>
      ))}
    </>
  )
}
export default SubTabsComponent
