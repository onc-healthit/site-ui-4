import { useEffect, useState } from 'react'
import SubTabsComponent, { TabInputs } from '../shared/SubTabs'
import Template from './send/TemplateTab'
import Content from './send/ContentTab'
import bulletedList from '../shared/BulletList'
import { Container, Typography, List, ListItem } from '@mui/material'

interface SendTabProps {
  sampleCCDAFiles: string[]
}
const SendTab = ({ sampleCCDAFiles }: SendTabProps) => {
  const [selectedTab, setSelectedTab] = useState('Choose template')

  const sendTabs: TabInputs[] = [
    { tabName: 'Choose template', tabIndex: 0, tabPanel: <Template sampleCCDAFiles={sampleCCDAFiles} /> },
    { tabName: 'Choose own content', tabIndex: 1, tabPanel: <Content /> },
  ]

  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.replace('#', '').replace(/-/g, ' ').toLowerCase()
      const tab = sendTabs.find((t) => t.tabName.toLowerCase() === hash)
      setSelectedTab(tab ? tab.tabName : 'Choose template')
    }

    handleRouteChange()
    window.addEventListener('hashchange', handleRouteChange)

    return () => {
      window.removeEventListener('hashchange', handleRouteChange)
    }
  })
  return (
    <>
      <Container>
        <Typography variant="h3" component={'h1'} sx={{ pl: 0, pt: 4, pb: 4 }}>
          Send XDR messages from the Sandbox to your System.
        </Typography>
        <List sx={bulletedList('disc')} dense>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography variant="body2">
              Send messages from SITE XDR Test Tool to your system by entering your endpoint below.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography variant="body2">
              Choose a CCDA document that you would like to attach as part of the payload.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography variant="body2">
              To add additional properties, toggle the &apos;Show Optional XDR Message Properties&apos; switch.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography variant="body2">Send the XDR message.</Typography>
          </ListItem>
        </List>
        <SubTabsComponent selectedTab={selectedTab} tabs={sendTabs} />
      </Container>
    </>
  )
}

export default SendTab
