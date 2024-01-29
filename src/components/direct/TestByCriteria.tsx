'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import BannerBox from './BannerBox'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Container, Link, Typography } from '@mui/material'
import B1Component from './B1Component'
import H1Component from './H1Component'
import H2Component from './H2Component'
import palette from '@/styles/palette'
import TabsComponent from './TabsComponent'
import { useEffect } from 'react'
export interface criteriaProps {
  selectedTab: string
}

const TestByCriteria = ({ selectedTab }: criteriaProps) => {
  const [value, setValue] = React.useState(0)
  const criteriaTabs = [
    { criteria: 'B1', index: 0 },
    { criteria: 'H1', index: 1 },
    { criteria: 'H2', index: 2 },
  ]

  useEffect(() => {
    if (selectedTab !== '') {
      const criteriaTabIndex = criteriaTabs.filter((c) => c.criteria === selectedTab)
      setValue(criteriaTabIndex[0].index)
    }
  }, [selectedTab])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props

    return <div>{value === index && <Box sx={{ p: 10, width: '100%' }}>{children}</Box>}</div>
  }

  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link underline="hover" color="inherit" href="/direct" key="1">
            Direct
          </Link>,
          <Link underline="hover" color="inherit" href="/direct/testbycriteria" key="2">
            Test By Criteria
          </Link>,
        ]}
        heading={'Test By Criteria'}
        description={<>New Helper Text</>}
      />

      <Box sx={{ width: '100%', backgroundColor: palette.primary }}>
        <Container disableGutters maxWidth="xl">
          <Tabs
            variant="fullWidth"
            scrollButtons="auto"
            value={value}
            onChange={handleTabChange}
            indicatorColor="secondary"
          >
            {criteriaTabs.map((tab, index) => (
              <Tab label={tab.criteria} key={index} />
            ))}
          </Tabs>
        </Container>
      </Box>
      {/* <TabsComponent value={tabIndex} tabs={createTabs} /> */}
      <CustomTabPanel value={value} index={0}>
        <B1Component />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <H1Component />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <H2Component />
      </CustomTabPanel>
    </Box>
  )
}

export default TestByCriteria
