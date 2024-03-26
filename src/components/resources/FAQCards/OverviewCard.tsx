import * as React from 'react'
import { Box, Card, CardHeader, Typography, Divider, ListItemText, ListItem, List, CardContent } from '@mui/material'

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
    <Card
      sx={{
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <CardHeader titleTypographyProps={{ fontWeight: 700 }} title={header} />
      <Divider />
      <CardContent>
        <List disablePadding>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ pb: 1, px: 0 }}>
                <ListItemText>
                  <Box display={'flex'} gap={1} flexDirection={'row'}>
                    <Typography fontWeight={'600'} variant="h6" gutterBottom>
                      Q:
                    </Typography>
                    <Typography fontWeight={'600'} variant="h6" gutterBottom>
                      {item.question}
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={1} flexDirection={'row'}>
                    <Typography variant="body2" gutterBottom>
                      A:
                    </Typography>
                    <Typography variant="body2">{item.answer}</Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

const FAQ: React.FC = () => {
  const overview: QAItem[] = [
    {
      question: 'What is SITE?',
      answer: 'Discover the core concept and purpose behind SITE, and how it can benefit you or your organization.',
    },
    {
      question: 'How do I get started with SITE?',
      answer:
        "Step-by-step guidance on creating an account, setting up your profile, and navigating through SITE's user-friendly interface.",
    },
    {
      question: 'What are the key features of SITE?',
      answer: 'Explore the various tools, functions, and capabilities that SITE offers to help you achieve your goals.',
    },
    {
      question: 'How can I connect with other users on SITE?',
      answer: 'Learn how to build connections, join communities, and engage with fellow SITE users.',
    },
    {
      question: 'Is SITE compatible with mobile devices?',
      answer:
        'Find out if SITE is accessible on smartphones and tablets, and how to make the most of the mobile experience.',
    },
    {
      question: 'How can I report issues or seek assistance on SITE?',
      answer: 'Get information on how to report bugs, seek technical support, or contact our customer service team.',
    },
  ]

  return <Overview header="SITE Overview" items={overview} />
}

export default FAQ
