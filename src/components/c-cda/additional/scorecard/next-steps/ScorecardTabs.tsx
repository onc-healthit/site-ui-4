import palette from '@/styles/palette'
import { Container, List, ListItem, ListItemText } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Link from 'next/link'
import * as React from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function ScorecardTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const tempXmlData: string =
    '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction1"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>'

  return (
    <>
      <Box sx={{ width: '100%', backgroundColor: palette.primary }}>
        <Container>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            TabScrollButtonProps={{
              sx: {
                borderRadius: 10,
              },
            }}
            TabIndicatorProps={{
              sx: {
                bgcolor: palette.secondaryLight,
                height: '8px',
              },
            }}
          >
            <Tab label="ISSUE (#)" {...a11yProps(0)} />
            <Tab label="BEST PRACTICE" {...a11yProps(1)} />
          </Tabs>
        </Container>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <List sx={{ listStyle: 'decimal', pl: 2 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="XML at Line Number X" style={{ fontStyle: 'bold' }} />
            {/* TODO: Make this pretty-printed with a library, with syntax highlighting if possible */}
            <Box sx={{ width: '100%', overflow: 'auto' }} pl={0}>
              <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word', fontFamily: 'monospace' }}>
                {tempXmlData}
              </pre>
            </Box>
          </ListItem>
        </List>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <List sx={{ listStyle: 'decimal', pl: 2 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Related HL7 C-CDA Task Force example" style={{ fontStyle: 'bold' }} />
            <Link href="https://someBestPracticeUrl.com/something/somefileOrRoute">
              https://someBestPracticeUrl.com/something/somefileOrRoute
            </Link>
          </ListItem>
        </List>
      </CustomTabPanel>
    </>
  )
}
