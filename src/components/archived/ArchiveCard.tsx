import * as React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { CardHeader, CardContent, List, ListItem, ListItemText, Box } from '@mui/material'
export interface QAItem {
  question: string
  answer: string
}

interface FAQCardProps {
  header: string
  items: QAItem[]
}

const ArchiveCard = ({ header, items }: FAQCardProps) => {
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
                    <Typography variant="body2">
                      {item.answer.split('\n').map((i, key) => {
                        return (
                          <span key={key}>
                            {i}
                            <br />
                          </span>
                        )
                      })}
                    </Typography>
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

export default ArchiveCard
