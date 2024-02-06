'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import BannerBox from '@shared/BannerBox'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Container } from '@mui/material'
import B1Component from './B1Tab'
import H1Component from './H1Tab'
import H2Component from './H2Tab'
import palette from '@/styles/palette'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
export interface criteriaProps {
  selectedTab: string
}

const TestByCriteria = ({ selectedTab }: criteriaProps) => {
  const [value, setValue] = React.useState(0)
  const criteriaTabs = React.useMemo(() => {
    return [
      { criteria: 'B1', tabIndex: 0 },
      { criteria: 'H1', tabIndex: 1 },
      { criteria: 'H2', tabIndex: 2 },
    ]
  }, [])

  useEffect(() => {
    if (selectedTab !== '') {
      const criteriaTabIndex = criteriaTabs.filter((c) => c.criteria === selectedTab)
      setValue(criteriaTabIndex[0].tabIndex)
    }
  }, [selectedTab, criteriaTabs])

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

    return <div>{value === index && <>{children}</>}</div>
  }

  return (
    <div>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/testbycriteria" key="2" className={styles.link}>
            Test By Criteria
          </Link>,
        ]}
        heading={'Test By Criteria'}
        description={<>New Helper Text</>}
      />

      <Box sx={{ width: '100%', backgroundColor: palette.primary }}>
        <Container>
          <Tabs
            variant="fullWidth"
            scrollButtons="auto"
            value={value}
            onChange={handleTabChange}
            indicatorColor="secondary"
          >
            {criteriaTabs.map((tab) => (
              <Tab label={tab.criteria} key={tab.tabIndex} />
            ))}
          </Tabs>
        </Container>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <B1Component />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <H1Component />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <H2Component />
      </CustomTabPanel>
    </div>
  )
}

export default TestByCriteria
