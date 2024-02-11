import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

interface QAItem {
  question: string
  answer: string
}

interface FAQProps {
  header: string
  items: QAItem[]
}

const Overview: React.FC<FAQProps> = ({ header, items }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1075,
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: '4px',
        border: 1,
        borderColor: 'grey.300',
        margin: '8px',
      }}
    >
      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
        {header}
      </Typography>
      <Divider sx={{}} />
      <List>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start" sx={{ py: 0, px: 0 }}>
              <ListItemText
                primary={`${index + 1}. ${item.question}`}
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                      {item.answer}
                    </Typography>
                  </React.Fragment>
                }
                secondaryTypographyProps={{ component: 'div' }}
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default Overview

const faqItems: QAItem[] = []

;<Overview header="Overview" items={faqItems} />
