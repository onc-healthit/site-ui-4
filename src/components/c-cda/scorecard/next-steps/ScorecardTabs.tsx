import React from 'react'
import palette from '@/styles/palette'
import { Button, CardContent, List, ListItem, ListItemText } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import xmlFormatter from 'xml-formatter'
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
      {value === index && <Box>{children}</Box>}
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
    borderRadius: 0,
  }
  const bestPracticeLinkStyle = issueXmlStyle

  return (
    <>
      <Box sx={{ width: '100%', backgroundColor: palette.white }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          textColor="primary"
          TabIndicatorProps={{
            sx: {
              height: '4px',
              backgroundColor: palette.greyDark,
            },
          }}
          sx={{
            borderRadius: '4px',
            '& .MuiTab-root': {
              color: '#000',
              backgroundColor: '#fff',
              border: `1px solid ${palette.greyLight}`,
            },
            '& .MuiTab-root.Mui-selected': {
              color: '#000 !important',
              fontWeight: '600',
              backgroundColor: '#fff',
            },
          }}
        >
          <Tab label={`ISSUE INSTANCES (${rubric.numberOfIssues})`} {...a11yProps(0)} />
          <Tab label="BEST PRACTICE" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <CardContent sx={{ border: `1px solid ${palette.greyLight}`, borderRadius: '4px' }}>
          <List>
            {rubric.issuesList.map((issue: ScorecardIssueXMLInstance, index) => (
              <ListItem sx={{ display: 'list-item' }} key={`${issue.lineNumber}-${index}`}>
                <Box
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${palette.greyLight}`,
                    pb: 1.3,
                  }}
                >
                  <ListItemText
                    primary={`XML at Line Number ${issue.lineNumber}`}
                    primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
                  />
                  <Button size="small" variant="outlined" onClick={() => handleShowIssueXml(index)}>
                    {isShowIssueXml[index] ? 'HIDE XML' : 'SHOW XML'}
                  </Button>
                </Box>
                {isShowIssueXml[index] && (
                  <Box sx={issueXmlStyle}>
                    <SyntaxHighlighter language="xml" style={prism} wrapLongLines={true}>
                      {xmlFormatter(issue.xmlString, {
                        indentation: '  ',
                        collapseContent: true,
                        lineSeparator: '\n',
                      })}
                    </SyntaxHighlighter>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CardContent sx={{ border: `1px solid ${palette.greyLight}`, borderRadius: '4px' }}>
          <List>
            {rubric.exampleTaskForceLinks.map((tfLink, index) => (
              <ListItem sx={{ display: 'list-item' }} key={index}>
                <ListItemText
                  primary="Related HL7® C-CDA Task Force example"
                  primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
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
        </CardContent>
      </CustomTabPanel>
    </>
  )
}
