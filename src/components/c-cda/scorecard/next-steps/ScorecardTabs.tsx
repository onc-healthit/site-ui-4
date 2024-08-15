import palette from '@/styles/palette'
import { Button, Container, List, ListItem, ListItemText } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Link from 'next/link'
import * as React from 'react'
import { ScorecardCategoryRubric, ScorecardIssueXMLInstance } from '../types/ScorecardJsonResponseType'

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

interface ScorecardTabsProps {
  rubric: ScorecardCategoryRubric
}

export default function ScorecardTabs({ rubric }: ScorecardTabsProps) {
  const [value, setValue] = React.useState(0)
  const [isShowIssueXml, setIsShowIssueXml] = React.useState(Array(rubric.issuesList.length).fill(false))

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleShowIssueXml = (index: number) => {
    setIsShowIssueXml((prevStates) => {
      const newStatesWithFlippedStateAtIndex = [...prevStates]
      newStatesWithFlippedStateAtIndex[index] = !prevStates[index]
      return newStatesWithFlippedStateAtIndex
    })
  }

  const issueXmlStyle = {
    width: '100%',
    overflow: 'auto',
    backgroundColor: palette.white,
    padding: 2,
    borderRadius: 0,
  }
  const bestPracticeLinkStyle = issueXmlStyle

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
            <Tab label={`ISSUE INSTANCES (${rubric.numberOfIssues})`} {...a11yProps(0)} />
            <Tab label="BEST PRACTICE" {...a11yProps(1)} />
          </Tabs>
        </Container>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <List sx={{ listStyle: 'decimal', pl: 2 }}>
          {rubric.issuesList.map((issue: ScorecardIssueXMLInstance, index) => (
            <ListItem sx={{ display: 'list-item' }} key={`${issue.lineNumber}-${index}`}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <ListItemText
                  primary={`XML at Line Number ${issue.lineNumber}`}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                <Button variant="outlined" onClick={() => handleShowIssueXml(index)}>
                  {isShowIssueXml[index] ? 'HIDE XML' : 'SHOW XML'}
                </Button>
              </Box>
              {isShowIssueXml[index] && (
                <Box sx={issueXmlStyle}>
                  {/* TODO: Make this pretty-printed with a library, with syntax highlighting if possible
                  This is a bit more complex than expected as the xmlString in the JSON has tab and new line delimiters
                  which likely have to be removed for the library to parse it */}
                  <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word', fontFamily: 'monospace' }}>
                    {issue.xmlString}
                  </pre>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <List sx={{ listStyle: 'decimal', pl: 2 }}>
          {rubric.exampleTaskForceLinks.map((tfLink, index) => (
            <ListItem sx={{ display: 'list-item' }} key={index}>
              <ListItemText
                primary="Related HL7 C-CDA Task Force example"
                primaryTypographyProps={{ fontWeight: 'bold' }}
                sx={{ pb: 3 }}
              />
              <Box sx={bestPracticeLinkStyle}>
                <Link href={tfLink} target="_blank" rel="noreferrer noopener">
                  {tfLink}
                </Link>
              </Box>
            </ListItem>
          ))}
        </List>
      </CustomTabPanel>
    </>
  )
}
