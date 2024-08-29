import { Typography, List, ListItem } from '@mui/material'
import bulletedList from '../shared/BulletList'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import PrecannedContentTab from './PrecannedContentTab'
import OwnContentTab from './OwnContentTab'
interface ReceiveMessageSITEProps {
  sampleCCDAFiles: string[]
}
const ReceiveMessageSITE = ({ sampleCCDAFiles }: ReceiveMessageSITEProps) => {
  const contentTabs: TabInputs[] = [
    { tabName: 'PRECANNED CONTENT', tabIndex: 0, tabPanel: <PrecannedContentTab sampleCCDAFiles={sampleCCDAFiles} /> },
    { tabName: 'CHOOSE YOUR OWN CONTENT', tabIndex: 1, tabPanel: <OwnContentTab /> },
  ]

  return (
    <>
      <Typography variant="body1">
        <strong>Send messages from the Sandbox to your system</strong>
      </Typography>
      <List sx={bulletedList('number')}>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            <strong>Choose your own content:</strong> Developers can use their own files as the payload of the Direct
            message sent from the Sandbox. This provides the ability to verify the file they chosen and that the
            contents were decrypted appropriately.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            <strong>Choose pre-canned content:</strong> Provides a list of files that you can choose from as the payload
            of the Direct message.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            <strong>Enter your end point name:</strong> The name of the Direct address where you would like to receive
            the message. Ensure that the Trust Anchor corresponding to the end point has already been uploaded.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            Once the above fields are populated, hit the send message button. You will receive a message from
            provider1@direct.site.healthit.gov to your system with the content you have uploaded.
          </Typography>
        </ListItem>
      </List>
      <TabsComponent selectedTab={'PRECANNED CONTENT'} tabs={contentTabs} />
    </>
  )
}

export default ReceiveMessageSITE
